# PowerShell script to install Python dependencies on Windows
Write-Host "Installing Python dependencies for Windows..." -ForegroundColor Green
Write-Host ""

Set-Location backend

# Create virtual environment if it doesn't exist
if (-not (Test-Path venv)) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
}

# Activate virtual environment
& .\venv\Scripts\Activate.ps1

# Upgrade pip first
Write-Host "Upgrading pip..." -ForegroundColor Yellow
python -m pip install --upgrade pip

# Install packages one by one to avoid compilation issues
Write-Host ""
Write-Host "Installing Flask and basic dependencies..." -ForegroundColor Yellow
pip install flask==3.0.0 flask-cors==4.0.0 python-dotenv==1.0.0

Write-Host ""
Write-Host "Installing NumPy (this may take a while)..." -ForegroundColor Yellow
pip install numpy --only-binary :all:

Write-Host ""
Write-Host "Installing Pandas..." -ForegroundColor Yellow
pip install pandas --only-binary :all:

Write-Host ""
Write-Host "Installing Scikit-learn..." -ForegroundColor Yellow
pip install scikit-learn --only-binary :all:

Write-Host ""
Write-Host "Installing PyTorch (CPU version - smaller download)..." -ForegroundColor Yellow
pip install torch --index-url https://download.pytorch.org/whl/cpu

Write-Host ""
Write-Host "Installing Transformers..." -ForegroundColor Yellow
pip install transformers

Write-Host ""
Write-Host "Installation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To run the server, use:" -ForegroundColor Cyan
Write-Host "  .\venv\Scripts\Activate.ps1" -ForegroundColor Cyan
Write-Host "  python app.py" -ForegroundColor Cyan
Write-Host ""

