@echo off
echo Starting Backend Server...
cd backend

REM Check if venv exists, if not create it
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
    call venv\Scripts\activate
    echo Installing dependencies (this may take a few minutes)...
    call install-windows.bat
) else (
    call venv\Scripts\activate
)

REM Check if Flask is installed
python -c "import flask" 2>nul
if errorlevel 1 (
    echo Dependencies not installed. Running installer...
    call install-windows.bat
)

echo.
echo Starting Flask server...
python app.py
pause

