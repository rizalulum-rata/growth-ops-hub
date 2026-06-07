"""
Rate limiting configuration for Growth Ops Hub API
Prevents abuse by limiting requests per IP
"""
import time
from collections import defaultdict
from typing import Dict, Optional
from datetime import datetime, timedelta

class RateLimiter:
    """Simple rate limiter to prevent API abuse"""
    
    def __init__(self, 
                 requests_per_minute: int = 60,  # Default: 60 requests/minute
                 cleanup_interval: int = 300):   # Cleanup old entries every 5min
        self.requests_per_minute = requests_per_minute
        self.cleanup_interval = cleanup_interval
        self.last_cleanup = time.time()
        
        # Track requests: {ip: [(timestamp, count), ...]}
        self.request_log: Dict[str, list] = defaultdict(list)
    
    def _cleanup_old_entries(self):
        """Remove entries older than 1 minute to save memory"""
        now = time.time()
        
        # Only cleanup periodically, not on every request
        if now - self.last_cleanup < self.cleanup_interval:
            return
        
        cutoff_time = now - 60  # Keep entries from last minute
        
        for ip in list(self.request_log.keys()):
            # Keep only recent entries
            self.request_log[ip] = [
                (ts, count) for ts, count in self.request_log[ip]
                if ts > cutoff_time
            ]
            
            # Remove IPs with no entries
            if not self.request_log[ip]:
                del self.request_log[ip]
        
        self.last_cleanup = now
    
    def is_allowed(self, client_ip: str) -> tuple[bool, Dict[str, any]]:
        """
        Check if client is allowed to make a request
        Returns: (allowed: bool, info: dict with details)
        """
        self._cleanup_old_entries()
        
        now = time.time()
        one_minute_ago = now - 60
        
        # Get requests from last minute
        if client_ip in self.request_log:
            recent_requests = [
                (ts, count) for ts, count in self.request_log[client_ip]
                if ts > one_minute_ago
            ]
            self.request_log[client_ip] = recent_requests
        else:
            recent_requests = []
        
        # Count total requests
        total_requests = sum(count for _, count in recent_requests)
        
        # Check if limit exceeded
        allowed = total_requests < self.requests_per_minute
        
        if not allowed:
            # Calculate when rate limit resets
            oldest_request_time = recent_requests[0][0] if recent_requests else now
            reset_time = oldest_request_time + 60
            reset_seconds = max(0, int(reset_time - now))
        else:
            reset_seconds = 0
        
        # Log this request
        if client_ip not in self.request_log:
            self.request_log[client_ip] = []
        self.request_log[client_ip].append((now, 1))
        
        return allowed, {
            "requests_count": total_requests + 1,
            "limit": self.requests_per_minute,
            "remaining": max(0, self.requests_per_minute - (total_requests + 1)),
            "reset_in_seconds": reset_seconds if not allowed else 60,
        }
    
    def get_stats(self, client_ip: str) -> Dict[str, any]:
        """Get current stats for a client IP"""
        now = time.time()
        one_minute_ago = now - 60
        
        if client_ip in self.request_log:
            recent_requests = [
                (ts, count) for ts, count in self.request_log[client_ip]
                if ts > one_minute_ago
            ]
        else:
            recent_requests = []
        
        total_requests = sum(count for _, count in recent_requests)
        
        return {
            "ip": client_ip,
            "requests_in_last_minute": total_requests,
            "limit": self.requests_per_minute,
            "status": "ok" if total_requests < self.requests_per_minute else "limited"
        }

# Global rate limiter instance
_rate_limiter: Optional[RateLimiter] = None

def get_rate_limiter() -> RateLimiter:
    """Get or create global rate limiter"""
    global _rate_limiter
    if _rate_limiter is None:
        _rate_limiter = RateLimiter(requests_per_minute=60)
    return _rate_limiter

def create_rate_limiter(requests_per_minute: int = 60) -> RateLimiter:
    """Create a new rate limiter instance"""
    return RateLimiter(requests_per_minute=requests_per_minute)
