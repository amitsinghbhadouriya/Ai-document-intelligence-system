@echo off
echo ========================================================
echo Starting AI Document Intelligence Backend (FastAPI)...
echo ========================================================
cd /d "%~dp0backend"
if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
    python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
) else (
    echo Virtual environment not found. Please run: python -m venv backend\venv
    pause
)
