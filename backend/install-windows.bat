@echo off
echo Installing Python dependencies for Windows...
echo.

cd backend

REM Create virtual environment if it doesn't exist
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate

REM Upgrade pip first
echo Upgrading pip...
python -m pip install --upgrade pip

REM Install packages one by one to avoid compilation issues
echo.
echo Installing Flask and basic dependencies...
pip install flask==3.0.0 flask-cors==4.0.0 python-dotenv==1.0.0

echo.
echo Installing NumPy (this may take a while)...
pip install numpy --only-binary :all:

echo.
echo Installing Pandas...
pip install pandas --only-binary :all:

echo.
echo Installing Scikit-learn...
pip install scikit-learn --only-binary :all:

echo.
echo Installing PyTorch (CPU version - smaller download)...
pip install torch --index-url https://download.pytorch.org/whl/cpu

echo.
echo Installing Transformers...
pip install transformers

echo.
echo Installation complete!
echo.
echo To run the server, use:
echo   venv\Scripts\activate
echo   python app.py
echo.
pause

