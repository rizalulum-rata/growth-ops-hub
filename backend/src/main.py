from fastapi import FastAPI, HTTPException, BackgroundTasks, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional
from .config import settings
from .services.chatbot import DeepSeekChatbot
from .logging_config import (
    setup_logging, log_query, log_response, log_error, log_startup_event, get_logger
)
from .rate_limiter import get_rate_limiter
import logging
import time
import uuid

# Setup production logging
loggers = setup_logging()
logger = get_logger(__name__)

# Initialize rate limiter
rate_limiter = get_rate_limiter()

# Initialize FastAPI app
app = FastAPI(
    title="Growth Ops Hub API",
    description="Backend API for Growth Ops Hub Dashboard",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize chatbot service
chatbot = None

@app.on_event("startup")
async def startup_event():
    """Initialize chatbot on startup"""
    global chatbot
    try:
        chatbot = DeepSeekChatbot()
        log_startup_event("CHATBOT_INIT_SUCCESS", "DeepSeek chatbot initialized")
        logger.info("✅ DeepSeek Chatbot initialized")
    except Exception as e:
        log_error(e, error_code="CHATBOT_INIT_FAILED")
        logger.error(f"❌ Failed to initialize chatbot: {e}", exc_info=True)
        chatbot = None

# Pydantic models
class ChatRequest(BaseModel):
    query: str
    brand_filter: Optional[str] = None
    team_filter: Optional[str] = None
    context: dict = {}

class ChatResponse(BaseModel):
    response: str
    sources: list = []
    brand_filter: Optional[str] = None
    team_filter: Optional[str] = None

# Routes
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok", "chatbot_ready": chatbot is not None}

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, http_request: Request):
    """
    Chat endpoint - sends query to DeepSeek and returns response
    """
    query_id = str(uuid.uuid4())[:8]
    start_time = time.time()
    
    # Get client IP for rate limiting
    client_ip = http_request.client.host if http_request.client else "unknown"
    
    # Check rate limit
    allowed, rate_info = rate_limiter.is_allowed(client_ip)
    if not allowed:
        log_error(
            Exception(f"Rate limit exceeded for {client_ip}"),
            error_code="RATE_LIMITED",
            query_id=query_id
        )
        raise HTTPException(
            status_code=429,
            detail=f"Rate limited: {rate_info['requests_count']}/{rate_info['limit']} requests per minute. Reset in {rate_info['reset_in_seconds']}s"
        )
    
    if not chatbot:
        log_error(Exception("Chatbot not available"), error_code="SERVICE_UNAVAILABLE", query_id=query_id)
        raise HTTPException(status_code=503, detail="Chatbot service is not available")
    
    if not request.query or not request.query.strip():
        log_error(Exception("Empty query"), error_code="EMPTY_QUERY", query_id=query_id)
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    try:
        # Log incoming query
        log_query(request.query, request.brand_filter, request.team_filter, query_id=query_id)
        
        # Run sync operation in thread pool
        import asyncio
        loop = asyncio.get_event_loop()
        response = await loop.run_in_executor(
            None,
            chatbot.query,
            request.query,
            request.brand_filter,
            request.team_filter,
            request.context
        )
        
        # Calculate response time
        response_time_ms = (time.time() - start_time) * 1000
        
        # Log outgoing response
        log_response(
            response.get("answer", "")[:100],
            response_time_ms,
            tokens_used=response.get("tokens_used", 0),
            query_id=query_id
        )
        
        return ChatResponse(
            response=response.get("answer", "Maaf, tidak ada jawaban yang tersedia"),
            sources=response.get("sources", []),
            brand_filter=request.brand_filter,
            team_filter=request.team_filter
        )
    except Exception as e:
        response_time_ms = (time.time() - start_time) * 1000
        log_error(e, error_code="CHAT_ERROR", query_id=query_id)
        logger.error(f"Chat error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/stream-chat")
async def stream_chat(request: ChatRequest):
    """
    Streaming chat endpoint - returns response as a stream
    """
    if not chatbot:
        raise HTTPException(status_code=503, detail="Chatbot service is not available")
    
    if not request.query or not request.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    async def generate():
        try:
            async for chunk in chatbot.stream_query(
                query=request.query,
                brand_filter=request.brand_filter,
                team_filter=request.team_filter,
                context=request.context
            ):
                yield f"data: {chunk}\n\n"
        except Exception as e:
            logger.error(f"Stream error: {e}")
            yield f"data: {{'error': '{str(e)}'}}\n\n"
    
    return JSONResponse(
        content=generate(),
        media_type="text/event-stream"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
