"""
Production logging configuration for Growth Ops Hub chatbot
Tracks queries, responses, performance, and errors
"""
import logging
import logging.handlers
import json
from datetime import datetime
from pathlib import Path
from typing import Any, Optional

# Create logs directory
logs_dir = Path(__file__).parent.parent / "logs"
logs_dir.mkdir(exist_ok=True)

class JSONFormatter(logging.Formatter):
    """Format logs as JSON for easier parsing in production"""
    def format(self, record) -> str:
        log_data = {
            "timestamp": datetime.utcnow().isoformat(),
            "level": record.levelname,
            "module": record.module,
            "function": record.funcName,
            "message": record.getMessage(),
            "line": record.lineno,
        }
        
        # Add extra fields if present
        if hasattr(record, "query_id"):
            log_data["query_id"] = record.query_id
        if hasattr(record, "user_ip"):
            log_data["user_ip"] = record.user_ip
        if hasattr(record, "response_time_ms"):
            log_data["response_time_ms"] = record.response_time_ms
        if hasattr(record, "tokens_used"):
            log_data["tokens_used"] = record.tokens_used
        if hasattr(record, "error_code"):
            log_data["error_code"] = record.error_code
            
        return json.dumps(log_data)

def setup_logging(log_level=logging.INFO):
    """Setup production logging with rotating file handlers"""
    
    # Root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(log_level)
    
    # Remove any existing handlers
    for handler in root_logger.handlers[:]:
        root_logger.removeHandler(handler)
    
    # 1. ACCESS LOG - All chat queries and responses
    access_logger = logging.getLogger("access")
    access_handler = logging.handlers.RotatingFileHandler(
        logs_dir / "access.log",
        maxBytes=10*1024*1024,  # 10MB
        backupCount=10  # Keep 10 backups
    )
    access_handler.setFormatter(JSONFormatter())
    access_logger.addHandler(access_handler)
    access_logger.setLevel(logging.INFO)
    
    # 2. ERROR LOG - All errors and exceptions
    error_logger = logging.getLogger("error")
    error_handler = logging.handlers.RotatingFileHandler(
        logs_dir / "error.log",
        maxBytes=10*1024*1024,
        backupCount=10
    )
    error_handler.setFormatter(JSONFormatter())
    error_logger.addHandler(error_handler)
    error_logger.setLevel(logging.ERROR)
    
    # 3. PERFORMANCE LOG - Response times and metrics
    perf_logger = logging.getLogger("performance")
    perf_handler = logging.handlers.RotatingFileHandler(
        logs_dir / "performance.log",
        maxBytes=10*1024*1024,
        backupCount=10
    )
    perf_handler.setFormatter(JSONFormatter())
    perf_logger.addHandler(perf_handler)
    perf_logger.setLevel(logging.INFO)
    
    # 4. API LOG - DeepSeek API calls and responses
    api_logger = logging.getLogger("api")
    api_handler = logging.handlers.RotatingFileHandler(
        logs_dir / "api.log",
        maxBytes=10*1024*1024,
        backupCount=10
    )
    api_handler.setFormatter(JSONFormatter())
    api_logger.addHandler(api_handler)
    api_logger.setLevel(logging.INFO)
    
    # 5. STARTUP LOG - Server startup, shutdown, events
    startup_logger = logging.getLogger("startup")
    startup_handler = logging.handlers.RotatingFileHandler(
        logs_dir / "startup.log",
        maxBytes=5*1024*1024,
        backupCount=5
    )
    startup_handler.setFormatter(JSONFormatter())
    startup_logger.addHandler(startup_handler)
    startup_logger.setLevel(logging.INFO)
    
    return {
        "access": access_logger,
        "error": error_logger,
        "performance": perf_logger,
        "api": api_logger,
        "startup": startup_logger,
    }

# Initialize loggers
loggers = setup_logging()

def log_query(query: str, brand_filter: Optional[str] = None, team_filter: Optional[str] = None, 
              query_id: Optional[str] = None, user_ip: Optional[str] = None):
    """Log incoming chat query"""
    logger = loggers["access"]
    logger.info(
        f"Query: {query[:100]}... Filters: brand={brand_filter}, team={team_filter}",
        extra={
            "query_id": query_id,
            "user_ip": user_ip,
        }
    )

def log_response(response: str, response_time_ms: float, tokens_used: int = 0, 
                 query_id: Optional[str] = None):
    """Log outgoing chat response"""
    logger = loggers["access"]
    logger.info(
        f"Response: {response[:100]}... Time: {response_time_ms}ms Tokens: {tokens_used}",
        extra={
            "query_id": query_id,
            "response_time_ms": response_time_ms,
            "tokens_used": tokens_used,
        }
    )

def log_error(error: Exception, error_code: Optional[str] = None, query_id: Optional[str] = None):
    """Log errors and exceptions"""
    logger = loggers["error"]
    logger.error(
        f"Error: {str(error)}",
        exc_info=True,
        extra={
            "query_id": query_id,
            "error_code": error_code,
        }
    )

def log_api_call(method: str, endpoint: str, status_code: int, response_time_ms: float):
    """Log DeepSeek API calls"""
    logger = loggers["api"]
    logger.info(
        f"API Call: {method} {endpoint} -> {status_code} ({response_time_ms}ms)",
        extra={
            "response_time_ms": response_time_ms,
        }
    )

def log_startup_event(event: str, details: str = ""):
    """Log server startup/shutdown events"""
    logger = loggers["startup"]
    logger.info(f"Event: {event} - {details}")

def get_logger(name: str) -> logging.Logger:
    """Get a logger by name"""
    return loggers.get(name, logging.getLogger(name))
