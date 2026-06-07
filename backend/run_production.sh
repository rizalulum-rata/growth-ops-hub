#!/bin/bash
# Production startup script for Growth Ops Hub DeepSeek Chatbot

set -e  # Exit on error

echo "🚀 Growth Ops Hub - DeepSeek Chatbot"
echo "====================================="
echo ""

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found. Install it first."
    exit 1
fi

echo "✅ Python version: $(python3 --version)"
echo ""

# Navigate to backend
cd "$(dirname "$0")/backend" || { echo "❌ Backend folder not found"; exit 1; }

# Check .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "   Copy from .env.example and add your DeepSeek API key"
    exit 1
fi

# Install dependencies if needed
if ! python3 -c "import fastapi" 2>/dev/null; then
    echo "📦 Installing dependencies..."
    pip install -r requirements.txt
fi

echo "✅ Dependencies ready"
echo ""

# Run server
echo "🎬 Starting server..."
echo "   API will be available at: http://localhost:8001"
echo "   Press CTRL+C to stop"
echo ""

python3 -m uvicorn src.main:app --host 0.0.0.0 --port 8001 --workers 4
