# AI Workspace Web Application

A modern AI Workspace Web Application with Firebase Authentication, AutoML features, and an interactive chatbot.

## Features

- 🔐 **Firebase Authentication** - Email/Password and Google Sign-In
- 📊 **Workspace Management** - Create and manage multiple workspaces
- 🤖 **AutoML Training** - Upload CSV datasets and automatically train ML models
- 📈 **Predictions** - Generate predictions on new data
- 💬 **AI Chatbot** - Interactive chatbot powered by Hugging Face transformers
- 📉 **Model Analytics** - Visualize model metrics and performance

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Firebase SDK
- Recharts

### Backend
- Flask
- SQLite
- Scikit-learn
- Hugging Face Transformers

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- Firebase account

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
   - Enable Google
4. Create a Firestore database (start in test mode)
5. Copy your Firebase config

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create necessary directories (already created in code)
mkdir -p uploads models

# Run the Flask server
python app.py
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Update Firebase config
# Edit frontend/src/firebase/config.js
# Replace the placeholder values with your Firebase config

# Start development server
npm run dev
```

The frontend will run on `http://localhost:3000`

### 4. Firebase Configuration

Edit `frontend/src/firebase/config.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Usage

1. **Register/Login**: Create an account or sign in with Google
2. **Create Workspace**: Click "Create New Workspace" on the dashboard
3. **Upload Dataset**: 
   - Go to "Dataset Upload" tab
   - Upload a CSV file
   - Select the target column
   - Click "Train Model"
4. **Make Predictions**:
   - Go to "Predict" tab
   - Upload a CSV file (without target column)
   - View predictions and download results
5. **Chat with AI**: Use the Chatbot tab to interact with the AI assistant
6. **View Model Info**: Check model metrics and performance in the Model Info tab

## Project Structure

```
.
├── .gitignore
├── LICENSE
├── QUICKSTART.md
├── README.md
├── run-backend.bat
├── run-frontend.bat
├── TROUBLESHOOTING.md
├── eda.ipynb
├── backend/
│   ├── app.py                    # Flask application
│   ├── factual_embeddings.pkl    # Pretrained embeddings
│   ├── install-windows.bat       # Windows installation script
│   ├── install-windows.ps1       # PowerShell installation script
│   ├── pretrain_base_model.py    # Model pretraining script
│   ├── requirements-simple.txt   # Simplified dependencies
│   ├── requirements.txt          # Python dependencies
│   ├── datasets/                 # Preloaded datasets
│   │   ├── description.csv
│   │   ├── diets.csv
│   │   ├── Diseases_and_Symptoms_dataset.csv
│   │   ├── medications.csv
│   │   ├── precautions.csv
│   │   └── workout.csv
│   ├── models/                   # Trained models directory
│   ├── rasa/                     # Rasa integration
│   │   └── data/
│   │       └── lookup/
│   │           └── symptoms.yml
│   └── uploads/                  # Uploaded datasets
├── frontend/
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── components/
│       │   └── Workspace/
│       │       ├── Algorithms.jsx
│       │       ├── Chatbot.jsx
│       │       ├── Datasets.jsx
│       │       ├── DatasetUpload.jsx
│       │       ├── FeedbackCollector.jsx
│       │       ├── ModelComparison.jsx
│       │       ├── ModelInfo.jsx
│       │       ├── Predict.jsx
│       │       ├── Rasa.jsx
│       │       └── TrainingLogs.jsx
│       ├── config/
│       │   └── api.js
│       ├── firebase/
│       │   └── config.js
│       ├── hooks/
│       │   └── useTheme.js
│       └── pages/
│           ├── Dashboard.jsx
│           ├── Login.jsx
│           ├── Register.jsx
│           └── Workspace.jsx
├── Images inf project/           # Project images and screenshots
│   ├── 3. nlu evaluation.png
│   ├── module1/
│   │   ├── login architecture.png
│   │   ├── Screenshot (323).png
│   │   ├── Screenshot (324).png
│   │   ├── Screenshot (325).png
│   │   ├── Screenshot (326).png
│   │   └── Screenshot (327).png
│   ├── module2/
│   │   ├── Screenshot (329).png
│   │   ├── Screenshot (330).png
│   │   ├── Screenshot (334).png
│   │   ├── Screenshot (335).png
│   │   ├── Screenshot (336).png
│   │   ├── Screenshot (337).png
│   │   └── Screenshot (338).png
│   ├── module3/
│   │   ├── 3. nlu evaluation.png
│   │   ├── Screenshot (339).png
│   │   ├── Screenshot (341).png
│   │   ├── Screenshot (342).png
│   │   ├── Screenshot (343).png
│   │   └── Screenshot (344).png
│   └── module4/
│       ├── deployment_architecture_svg.png
│       ├── Screenshot (345).png
│       ├── Screenshot (346).png
│       ├── Screenshot (347).png
│       ├── Screenshot (348).png
│       └── Screenshot (349).png
└── rasa/                         # Rasa chatbot configuration
    ├── config.yml
    ├── domain.yml
    └── data/
        ├── nlu.yml
        └── lookup/
            └── symptoms.yml
```

## API Endpoints

- `POST /api/workspace/create` - Create a new workspace
- `POST /api/workspace/list` - List user workspaces
- `POST /api/dataset/upload` - Upload and train model
- `POST /api/predict` - Generate predictions
- `POST /api/predict/download` - Download predictions
- `POST /api/model/info` - Get model information
- `POST /api/chatbot` - Chat with AI assistant

## Notes

- The chatbot uses GPT-2 model from Hugging Face. On first run, it will download the model (~500MB)
- For production, consider using a more powerful model or API
- SQLite database is created automatically on first run
- All uploaded files are stored in the `backend/uploads` directory
- Trained models are saved in the `backend/models` directory

## Troubleshooting

1. **CORS Errors**: Make sure Flask-CORS is installed and the backend is running
2. **Firebase Errors**: Verify your Firebase config is correct
3. **Model Training Fails**: Ensure your CSV file has valid data and the target column exists
4. **Chatbot Not Working**: The model download may take time on first use

## License

MIT

