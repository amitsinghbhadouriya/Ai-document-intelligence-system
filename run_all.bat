@echo off
echo =========================================================================
echo Launching AI-Powered Document Intelligence & Knowledge Extraction System
echo =========================================================================
start "DocuIntel Backend (FastAPI)" cmd /k "%~dp0run_backend.bat"
start "DocuIntel Frontend (React+Vite)" cmd /k "%~dp0run_frontend.bat"
echo.
echo Application instances started!
echo Frontend URL: http://localhost:5173
echo Backend API:  http://127.0.0.1:8000/docs
echo.
pause
