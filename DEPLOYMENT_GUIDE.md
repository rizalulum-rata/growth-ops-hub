# 🚀 Production Deployment Guide - Growth Ops Hub Chatbot

**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Last Updated:** 2024-12-18

---

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [System Requirements](#system-requirements)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Deployment Options](#deployment-options)
6. [Monitoring](#monitoring)
7. [Troubleshooting](#troubleshooting)
8. [Maintenance](#maintenance)

---

## 🚀 Quick Start

### Start Server (Development)
```bash
cd backend
python -m uvicorn src.main:app --reload --host 127.0.0.1 --port 8001
```

### Start Server (Production)
```bash
cd backend
python -m uvicorn src.main:app --host 0.0.0.0 --port 8001 --workers 1
```

### Test Endpoints
```bash
# Health check
curl http://localhost:8001/health

# Chat query
curl -X POST http://localhost:8001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "Apa itu Growth Ops Hub?"}'
```

---

## 💻 System Requirements

### Minimum
- Python 3.9+
- 512MB RAM
- 1GB disk space (logs)

### Recommended
- Python 3.11+
- 2GB RAM
- 10GB disk space
- 2+ CPU cores

### Dependencies
- FastAPI 0.115.0
- Uvicorn 0.32.0
- OpenAI 2.40.0 (for DeepSeek)
- Pydantic 2.9.2

---

## 📦 Installation

### 1. Clone/Download Project
```bash
cd growth-ops-hub
```

### 2. Create Virtual Environment (Recommended)
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 4. Create Configuration
```bash
# Copy .env template
cp .env.example .env

# Edit .env with your settings
nano .env  # or edit in your editor
```

### 5. Create Logs Directory
```bash
mkdir logs
```

---

## ⚙️ Configuration

### Environment Variables (.env)
```env
# DeepSeek API
DEEPSEEK_API_KEY=sk-your-api-key-here
DEEPSEEK_BASE_URL=https://api.deepseek.com/v1
DEEPSEEK_MODEL=deepseek-chat
DEEPSEEK_MAX_TOKENS=2048

# Server
HOST=0.0.0.0
PORT=8001
WORKERS=1

# CORS
CORS_ORIGINS=http://localhost:5500,http://127.0.0.1:5500,https://example.com

# Database (Optional)
DATABASE_URL=postgresql://user:password@localhost:5432/growth_ops
```

### Application Settings
File: `backend/src/config.py`
```python
- deepseek_api_key: str
- deepseek_base_url: str
- deepseek_model: str
- deepseek_max_tokens: int
- cors_origins: str
```

---

## 🌍 Deployment Options

### Option 1: Local Development
```bash
cd backend
python -m uvicorn src.main:app --reload --port 8001
```
- Best for: Testing, development
- Port: 8001 (local only)
- Workers: 1
- Auto-reload: Yes

### Option 2: Production Server (Linux/Mac)
```bash
#!/bin/bash
cd /path/to/growth-ops-hub/backend
nohup python -m uvicorn src.main:app \
  --host 0.0.0.0 \
  --port 8001 \
  --workers 1 \
  > app.log 2>&1 &
```

### Option 3: Gunicorn (Production)
```bash
pip install gunicorn
gunicorn src.main:app \
  -w 4 \
  -b 0.0.0.0:8001 \
  --timeout 120 \
  --access-logfile logs/access.log
```

### Option 4: Docker (Recommended)
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "-m", "uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8001"]
```

Build and run:
```bash
docker build -t growth-ops-hub:latest .
docker run -p 8001:8001 -e DEEPSEEK_API_KEY=your-key growth-ops-hub:latest
```

### Option 5: Reverse Proxy (Nginx)
```nginx
upstream chatbot_backend {
    server 127.0.0.1:8001;
}

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://chatbot_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Enable SSL
    listen 443 ssl;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
}
```

---

## 📊 Monitoring

### 1. Real-time Dashboard
```bash
cd backend
python monitor.py
```

Output:
```
============================================================
📊 GROWTH OPS HUB CHATBOT - MONITORING DASHBOARD
============================================================

📈 ACTIVITY (Last 60 minutes)
  Queries:     4
  Responses:   4
  Errors:      0

⏱️  PERFORMANCE METRICS
  Average:     3.25ms
  Minimum:     2.55ms
  Maximum:     3.79ms

👥 CLIENT DISTRIBUTION
  Unique IPs:  1
    127.0.0.1: 4 requests

🟢 HEALTHY
```

### 2. Log File Monitoring
```bash
# Watch access logs
tail -f backend/logs/access.log

# Watch error logs
tail -f backend/logs/error.log

# Watch performance logs
tail -f backend/logs/performance.log
```

### 3. Log Analysis
```bash
# Count queries per hour
jq '.timestamp' backend/logs/access.log | cut -d'T' -f2 | cut -d':' -f1 | sort | uniq -c

# Average response time
jq '.response_time_ms' backend/logs/access.log | awk '{sum+=$1; count++} END {print "Average: " sum/count "ms"}'

# Error count
wc -l backend/logs/error.log
```

---

## 🔍 Health Checks

### Manual
```bash
curl http://localhost:8001/health
# Response: {"status":"ok","chatbot_ready":true}
```

### Automated (Linux cron)
```bash
# Add to crontab
*/5 * * * * curl -f http://localhost:8001/health > /dev/null || systemctl restart growth-ops-hub
```

### Monitoring Script
```python
import requests
import time

while True:
    try:
        response = requests.get('http://localhost:8001/health')
        if response.status_code == 200:
            print("✅ Healthy")
        else:
            print(f"⚠️  Status: {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    time.sleep(60)  # Check every minute
```

---

## 🐛 Troubleshooting

### Issue: Port Already in Use
```bash
# Find process on port 8001
lsof -i :8001  # Linux/Mac
netstat -ano | findstr :8001  # Windows

# Kill process
kill -9 <PID>  # Linux/Mac
taskkill /PID <PID> /F  # Windows
```

### Issue: Rate Limiting Too Strict
Edit `backend/src/main.py`:
```python
rate_limiter = get_rate_limiter(requests_per_minute=120)  # Increase to 120
```

### Issue: Slow Responses
1. Check `backend/logs/performance.log`
2. Monitor DeepSeek API latency
3. Consider response caching

### Issue: High Error Rate
1. Check `backend/logs/error.log`
2. Verify DeepSeek API key
3. Check network connectivity
4. Verify CORS configuration

### Issue: Missing Logs
```bash
# Create logs directory
mkdir -p backend/logs

# Set permissions
chmod 755 backend/logs
chmod 644 backend/logs/*.log
```

---

## 🛡️ Security Hardening

### 1. Enable HTTPS
```bash
# Generate self-signed certificate
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365

# Run with SSL
python -m uvicorn src.main:app --ssl-keyfile=key.pem --ssl-certfile=cert.pem
```

### 2. Restrict CORS
Update `.env`:
```env
CORS_ORIGINS=https://example.com,https://app.example.com
```

### 3. Add API Authentication
```python
# In main.py
@app.post("/api/chat")
async def chat(request: ChatRequest, api_key: str = Header(...)):
    if api_key != settings.api_secret:
        raise HTTPException(status_code=401, detail="Invalid API key")
    # ... rest of logic
```

### 4. Rate Limiting
Already configured: 60 requests/minute per IP

---

## 📈 Scaling

### Single to Multi-Worker
```bash
# Gunicorn with 4 workers
gunicorn src.main:app -w 4 -b 0.0.0.0:8001
```

### Load Balancing
```nginx
upstream backend {
    server 127.0.0.1:8001;
    server 127.0.0.1:8002;
    server 127.0.0.1:8003;
}

server {
    location / {
        proxy_pass http://backend;
    }
}
```

### Database Persistence
```bash
# Setup PostgreSQL
createdb growth_ops

# Run migrations (when implemented)
alembic upgrade head
```

---

## 🧹 Maintenance

### Daily
- [ ] Check error logs: `tail backend/logs/error.log`
- [ ] Verify health: `curl http://localhost:8001/health`

### Weekly
- [ ] Review performance: `python backend/monitor.py`
- [ ] Check disk space: `df -h`
- [ ] Analyze usage patterns

### Monthly
- [ ] Archive old logs: `tar -czf logs_backup_$(date +%Y%m%d).tar.gz logs/*.log`
- [ ] Review API costs (DeepSeek dashboard)
- [ ] Security audit
- [ ] Update dependencies: `pip install --upgrade -r requirements.txt`

### Quarterly
- [ ] Full system backup
- [ ] Load testing
- [ ] Security penetration testing
- [ ] Performance optimization review

---

## 📞 Support & SLA

### SLA Targets
- Uptime: 99.9% (36 seconds downtime/month)
- Response Time: <5 seconds average
- Error Rate: <1% (99% success rate)

### On-Call Alerts
```
Error Rate > 5% in 5min window
Response Time > 10s
API Failures (402, 429, 500)
Disk Space < 1GB
```

### Incident Response
1. **Identify:** Check error logs and health status
2. **Assess:** Determine severity (P1/P2/P3)
3. **Respond:** Follow playbooks below
4. **Resolve:** Fix root cause
5. **Review:** Post-mortem analysis

### Playbooks

**P1: Service Down**
```bash
# 1. Check if process is running
ps aux | grep uvicorn

# 2. Restart
systemctl restart growth-ops-hub

# 3. Verify
curl http://localhost:8001/health
```

**P2: High Error Rate**
```bash
# 1. Check logs
tail -100 backend/logs/error.log

# 2. Check API key
grep DEEPSEEK_API_KEY backend/.env

# 3. Restart if needed
systemctl restart growth-ops-hub
```

**P3: Slow Responses**
```bash
# 1. Check current load
top

# 2. Review performance metrics
jq '.response_time_ms' backend/logs/access.log | \
  awk '{sum+=$1; count++} END {print sum/count}'

# 3. Consider caching or scaling
```

---

## 📋 Pre-Launch Checklist

- [ ] API key configured and verified
- [ ] Environment variables set
- [ ] Logs directory created with proper permissions
- [ ] CORS origins configured
- [ ] Rate limiting configured
- [ ] SSL/TLS certificate (if HTTPS)
- [ ] Database initialized (if using)
- [ ] Monitoring dashboard tested
- [ ] Health check endpoint verified
- [ ] Load testing completed
- [ ] Security audit done
- [ ] Documentation updated
- [ ] Team trained on monitoring
- [ ] On-call support established
- [ ] Backup and recovery plan ready

---

## 🎉 You're Ready!

Your Growth Ops Hub Chatbot is now ready for production deployment.

**Key Resources:**
- 📝 [PRODUCTION_READINESS.md](PRODUCTION_READINESS.md) - Feature status
- 📊 [Performance Logs](backend/logs/performance.log) - Metrics
- 🔍 [Error Logs](backend/logs/error.log) - Issue tracking
- 📈 [Dashboard](backend/monitor.py) - Real-time monitoring

**Next Steps:**
1. Deploy to staging environment
2. Run load tests
3. Configure monitoring and alerts
4. Train team on operations
5. Deploy to production
6. Monitor closely for 24-48 hours

---

**Questions?** Check [PRODUCTION_READINESS.md](PRODUCTION_READINESS.md) or review the implementation in `backend/src/`
