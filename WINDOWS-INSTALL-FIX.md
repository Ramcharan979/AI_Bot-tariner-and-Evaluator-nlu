# Windows Installation Fix

## Problem
NumPy and other packages are trying to build from source, but no C compiler is found on Windows.

## Solution

### Option 1: Use the Windows Installer Script (Recommended)

Run this in PowerShell or Command Prompt:

```bash
cd backend
install-windows.bat
```

Or in PowerShell:
```powershell
cd backend
.\install-windows.ps1
```

This script installs packages one by one using pre-built wheels (no compilation needed).

### Option 2: Manual Installation

If the script doesn't work, install packages manually:

```bash
cd backend
venv\Scripts\activate

# Upgrade pip
python -m pip install --upgrade pip

# Install basic packages first
pip install flask==3.0.0 flask-cors==4.0.0 python-dotenv==1.0.0

# Install NumPy with pre-built wheels only
pip install numpy --only-binary :all:

# Install Pandas
pip install pandas --only-binary :all:

# Install Scikit-learn
pip install scikit-learn --only-binary :all:

# Install PyTorch (CPU version - no CUDA needed)
pip install torch --index-url https://download.pytorch.org/whl/cpu

# Install Transformers
pip install transformers
```

### Option 3: Install Visual Studio Build Tools (If you need to compile)

If you still want to compile from source:

1. Download [Visual Studio Build Tools](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022)
2. Install "Desktop development with C++" workload
3. Then run: `pip install -r requirements.txt`

### Quick Test

After installation, test if it works:

```bash
cd backend
venv\Scripts\activate
python -c "import flask, numpy, pandas, sklearn; print('All packages installed successfully!')"
```

If you see "All packages installed successfully!", you're good to go!

Then run:
```bash
python app.py
```

