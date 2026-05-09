import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, TrendingUp, MessageSquare, BarChart3, LogOut, Moon, Sun, Database, Layers, FileText, Zap, GitCompare } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import DatasetUpload from '../components/Workspace/DatasetUpload';
import Predict from '../components/Workspace/Predict';
import Chatbot from '../components/Workspace/Chatbot';
import ModelInfo from '../components/Workspace/ModelInfo';
import Algorithms from '../components/Workspace/Algorithms';
import Datasets from '../components/Workspace/Datasets';
import TrainingLogs from '../components/Workspace/TrainingLogs';
import FeedbackCollector from '../components/Workspace/FeedbackCollector';
import Rasa from '../components/Workspace/Rasa';
import ModelComparison from '../components/Workspace/ModelComparison';

function Workspace({ user }) {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upload');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const isDark = stored ? stored === 'dark' : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (e) {
      console.error(e);
    }
  };

  const tabs = [
    { id: 'upload', label: 'Dataset Upload & Training', icon: Upload },
    { id: 'rasa', label: 'Rasa NLU Integration', icon: Zap },
    { id: 'datasets', label: 'Datasets', icon: Database },
    { id: 'logs', label: 'Training Logs', icon: FileText },
    { id: 'algorithms', label: 'Algorithms', icon: Layers },
    { id: 'comparison', label: 'Model Comparison', icon: GitCompare },
    { id: 'predict', label: 'Predict', icon: TrendingUp },
    { id: 'chatbot', label: 'Chatbot', icon: MessageSquare },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'info', label: 'Model Info', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="glass-card border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
              <h1 className="text-2xl font-bold gradient-text">Workspace</h1>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </motion.button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-full sm:w-72 shrink-0 glass-card rounded-2xl p-4 h-fit sticky top-6 self-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold">
                {user?.email?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">{user?.displayName || 'User'}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 truncate">{user?.email}</div>
              </div>
            </div>

            {/* WORKSPACE group */}
            <div className="space-y-1 mb-4">
              <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 px-2">Workspace</div>
              <button onClick={() => setActiveTab('upload')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'upload' ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                <Upload className="w-4 h-4" />
                <span className="text-sm">Dataset Upload & Training</span>
              </button>
              <button onClick={() => setActiveTab('rasa')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'rasa' ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                <Zap className="w-4 h-4" />
                <span className="text-sm">Rasa NLU Integration</span>
              </button>
              <button onClick={() => setActiveTab('comparison')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'comparison' ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                <GitCompare className="w-4 h-4" />
                <span className="text-sm">Model Comparison</span>
              </button>
              <button onClick={() => setActiveTab('predict')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'predict' ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Predict</span>
              </button>
              <button onClick={() => setActiveTab('chatbot')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'chatbot' ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">Chatbot</span>
              </button>
              <button onClick={() => setActiveTab('info')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'info' ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm">Model Info</span>
              </button>
            </div>

            {/* ALGORITHMS group */}
            <div className="space-y-1 mb-4">
              <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 px-2">Algorithms</div>
              <button onClick={() => setActiveTab('algorithms')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'algorithms' ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                <Layers className="w-4 h-4" />
                <span className="text-sm">Models & Algorithms</span>
              </button>
            </div>

            {/* STORAGE group */}
            <div className="space-y-1 mb-4">
              <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 px-2">Storage</div>
              <button onClick={() => setActiveTab('datasets')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'datasets' ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                <Database className="w-4 h-4" />
                <span className="text-sm">Datasets</span>
              </button>
              <button onClick={() => setActiveTab('logs')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'logs' ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                <FileText className="w-4 h-4" />
                <span className="text-sm">Training Logs</span>
              </button>
            </div>

            {/* FEEDBACK group */}
            <div className="space-y-1 mb-4">
              <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 px-2">Feedback</div>
              <button onClick={() => setActiveTab('feedback')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'feedback' ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">Feedback</span>
              </button>
            </div>

            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">
              <span className="text-sm text-slate-700 dark:text-slate-300">Theme</span>
              <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700">
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </aside>

          {/* Main Panel */}
          <div className="flex-1 min-w-0">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'upload' && <DatasetUpload workspaceId={workspaceId} />}
              {activeTab === 'rasa' && <Rasa />}
              {activeTab === 'datasets' && <Datasets workspaceId={workspaceId} />}
              {activeTab === 'logs' && <TrainingLogs workspaceId={workspaceId} />}
              {activeTab === 'algorithms' && <Algorithms workspaceId={workspaceId} />}
              {activeTab === 'comparison' && <ModelComparison workspaceId={workspaceId} />}
              {activeTab === 'predict' && <Predict workspaceId={workspaceId} />}
              {activeTab === 'chatbot' && <Chatbot workspaceId={workspaceId} />}
              {activeTab === 'feedback' && <FeedbackCollector user={user} workspaceId={workspaceId} />}
              {activeTab === 'info' && <ModelInfo workspaceId={workspaceId} />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workspace;

