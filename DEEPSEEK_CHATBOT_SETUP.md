# DeepSeek Chatbot Setup Guide

## Overview
Your Growth Ops Hub chatbot is now powered by **DeepSeek AI** - a capable open-weight LLM that can answer questions about your data, KPIs, and documentation.

## Backend Architecture

### Files Created

1. **`backend/src/main.py`** - FastAPI application
   - HTTP health check: `GET /health`
   - Chat endpoint: `POST /api/chat`
   - Stream endpoint: `POST /api/stream-chat`
   - CORS enabled for your frontend

2. **`backend/src/services/chatbot.py`** - DeepSeek chatbot service
   - Connects to DeepSeek API via OpenAI-compatible endpoint
   - Handles query processing with brand/team filtering
   - Supports both regular and streaming responses

3. **`backend/.env.example`** - Configuration template
   - Add your DeepSeek API key

4. **`backend/src/config.py`** - Settings management
   - Pydantic configuration with environment variables
   - Added DeepSeek credentials

### Frontend Changes

5. **`platform.html`** - Updated chat interface
   - `askAI()` function now calls backend API
   - Removed local search logic
   - Maintains same UI/UX experience
   - Shows loading state while waiting for responses

---

## Setup Instructions

### Step 1: Get DeepSeek API Key

1. Go to https://platform.deepseek.com/
2. Sign up / Log in
3. Create an API key in your account settings
4. Copy the key (starts with `sk-...`)

### Step 2: Configure Backend

1. Copy environment template:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Edit `.env` and add your DeepSeek API key:
   ```env
   DEEPSEEK_API_KEY=sk-your-actual-key-here
   DEEPSEEK_BASE_URL=https://api.deepseek.com/v1
   DEEPSEEK_MODEL=deepseek-chat
   DEEPSEEK_MAX_TOKENS=2048
   ```

3. Also configure other required settings (PostgreSQL, Qdrant, etc.)

### Step 3: Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### Step 4: Run Backend Server

```bash
python -m uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
✅ DeepSeek Chatbot initialized with model: deepseek-chat
```

### Step 5: Access Frontend

- Open `platform.html` in your browser
- Click in the chat box and type a question
- The chatbot will now use DeepSeek to answer!

---

## API Endpoints

### Chat Endpoint
```bash
POST /api/chat

Request body:
{
  "query": "Bagaimana performa RATA bulan ini?",
  "brand_filter": "rata",
  "team_filter": "cs",
  "context": {
    "page": "Growth Ops Hub Dashboard",
    "timestamp": "2026-06-02T10:30:00Z"
  }
}

Response:
{
  "response": "Performa RATA bulan ini menunjukkan...",
  "sources": [],
  "brand_filter": "rata",
  "team_filter": "cs"
}
```

### Health Check
```bash
GET /health

Response:
{
  "status": "ok",
  "chatbot_ready": true
}
```

---

## Features

✅ **Real-time responses** - DeepSeek processes queries instantly
✅ **Brand/Team filtering** - Automatic detection from query
✅ **Context awareness** - Includes page context in prompts
✅ **Error handling** - Graceful fallbacks with user-friendly messages
✅ **Streaming support** - Built for real-time text streaming
✅ **CORS enabled** - Works with your frontend across origins
✅ **Indonesian language** - System prompt optimized for Indonesian

---

## Troubleshooting

### "Tidak dapat menghubungi server"
- Check if backend is running: `curl http://localhost:8000/health`
- Verify CORS origins in `.env`
- Check browser console for detailed error

### "API error: 401"
- Check your DeepSeek API key is correct
- Verify key starts with `sk-`

### "API error: 429"
- DeepSeek rate limit reached
- Wait a moment and retry
- Check your DeepSeek quota

### Response is slow
- First response can take 2-5 seconds
- Subsequent responses are faster
- Consider using streaming endpoint for better UX

---

## Next Steps

### Enhancements to Consider

1. **RAG Integration** - Add vector search to local knowledge base
   ```python
   # Query Qdrant before DeepSeek for context
   vectors = qdrant_client.search(...)
   context = format_context(vectors)
   # Include in system prompt
   ```

2. **Conversation History** - Remember chat context
   ```python
   messages = [
     {"role": "system", "content": system_prompt},
     {"role": "user", "content": "Query 1"},
     {"role": "assistant", "content": "Response 1"},
     {"role": "user", "content": "Query 2"}  # Maintains context
   ]
   ```

3. **Streaming Response** - Real-time text updates
   ```javascript
   const stream = await fetch('/api/stream-chat', {...});
   const reader = stream.body.getReader();
   while (!done) {
     const {value, done} = await reader.read();
     // Update UI as chunks arrive
   }
   ```

4. **Analytics** - Track queries and responses
   ```python
   # Log to database for insights
   db.queries.insert(query, response, latency, user_id)
   ```

---

## System Prompt

The chatbot uses this system prompt to guide responses:

> "Anda adalah AI assistant untuk Growth Ops Hub - platform dokumentasi dan analitik internal. Jawab singkat, jelas, dan praktis. Berbahasa Indonesia yang natural."

Modify in `backend/src/services/chatbot.py` if needed.

---

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review backend logs in terminal
3. Check browser console for frontend errors
4. Verify DeepSeek API status at https://platform.deepseek.com/

---

**Happy chatting! 🚀**
