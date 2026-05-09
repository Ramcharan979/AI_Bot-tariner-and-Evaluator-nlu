# Quick Start Guide

## 🚀 Running the Application

### Step 1: Setup Backend

Open a terminal and run:

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
python app.py
```

✅ Backend should be running on `http://localhost:5000`

### Step 2: Setup Frontend

Open a **new terminal** and run:


```bash
cd frontend
npm install
npm run dev
```

✅ Frontend should be running on `http://localhost:3000`

### Step 3: Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password + Google)
4. Create Firestore database
5. Copy your config
6. Edit `frontend/src/firebase/config.js` and paste your config

### Step 4: Open Browser

Navigate to `http://localhost:3000` and start using the app!

## 📝 Quick Test

1. Register a new account
2. Create a workspace
3. Upload a CSV file (sample data works!)
4. Train the model
5. Make predictions
6. Chat with the AI assistant

## ⚠️ Common Issues

**Backend won't start?**
- Make sure Python 3.8+ is installed
- Check if port 5000 is available
- Install dependencies: `pip install -r requirements.txt`

**Frontend won't start?**
- Make sure Node.js 16+ is installed
- Delete `node_modules` and run `npm install` again
- Check if port 3000 is available

**Firebase errors?**
- Verify your Firebase config in `frontend/src/firebase/config.js`
- Make sure Authentication and Firestore are enabled

**CORS errors?**
- Ensure backend is running on port 5000
- Check browser console for specific errors

