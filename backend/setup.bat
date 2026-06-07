@echo off
REM Quick Start Script for DeepSeek Chatbot (Windows)

echo 🚀 Growth Ops Hub - DeepSeek Chatbot Setup
echo ==========================================
echo.

REM Check Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed
    exit /b 1
)

echo ✅ Python found:
python --version
echo.

REM Navigate to backend
cd backend
if %errorlevel% neq 0 (
    echo ❌ backend folder not found
    exit /b 1
)

echo 📦 Installing dependencies...
pip install -r requirements.txt

echo.
echo ⚙️  Configuration needed:
echo 1. Copy .env.example to .env
echo 2. Add your DeepSeek API key
echo 3. Configure other services (PostgreSQL, Qdrant)
echo.
echo 📝 Command: copy .env.example .env
echo.

echo ✅ Setup complete! Now run:
echo    python -m uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
echo.
echo Then open platform.html in your browser and test the chatbot!
echo.
pause
