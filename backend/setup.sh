#!/bin/bash
# Quick Start Script for DeepSeek Chatbot

echo "🚀 Growth Ops Hub - DeepSeek Chatbot Setup"
echo "=========================================="
echo ""

# Check Python
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed"
    exit 1
fi

echo "✅ Python found: $(python --version)"
echo ""

# Navigate to backend
cd backend || { echo "❌ backend folder not found"; exit 1; }

echo "📦 Installing dependencies..."
pip install -r requirements.txt

echo ""
echo "⚙️  Configuration needed:"
echo "1. Copy .env.example to .env"
echo "2. Add your DeepSeek API key"
echo "3. Configure other services (PostgreSQL, Qdrant)"
echo ""
echo "📝 Command: cp .env.example .env"
echo ""

echo "✅ Setup complete! Now run:"
echo "   python -m uvicorn src.main:app --reload --host 0.0.0.0 --port 8000"
echo ""
echo "Then open platform.html in your browser and test the chatbot!"
