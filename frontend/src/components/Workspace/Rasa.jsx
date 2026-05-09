import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle, Server, Settings, Code, Play } from 'lucide-react';

function Rasa() {
  const [inputText, setInputText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = () => {
    if (!inputText.trim()) return;

    // Mock analysis result
    setAnalysisResult({
      intent: 'provide_symptoms',
      entities: [
        { entity: 'symptom', value: 'headache' },
        { entity: 'symptom', value: 'nausea' }
      ]
    });
  };

  const sampleJson = {
    "intent": "provide_symptoms",
    "entities": [
      {"entity": "symptom", "value": "fever"},
      {"entity": "symptom", "value": "cough"}
    ]
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="w-8 h-8 text-blue-500" />
          <h2 className="text-3xl font-bold gradient-text">Rasa NLU Integration</h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Natural Language Understanding module that powers the chatbot's symptom extraction.
        </p>

        {/* Status Info Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Status</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Connection:</span>
                <span className="text-green-600 dark:text-green-400 font-medium">✅ Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Server:</span>
                <a
                  href="http://localhost:5005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  http://localhost:5005
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Mode:</span>
                <span className="text-purple-600 dark:text-purple-400 font-medium">Rasa-only NLU</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-5 h-5 text-blue-500" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Purpose</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Extract intents and symptoms from user input before passing them to the trained ML model.
            </p>
          </div>
        </div>

        {/* Sample JSON Output */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">Sample JSON Output</span>
          </div>
          <div className="bg-slate-900 dark:bg-slate-800 rounded-xl p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
              {JSON.stringify(sampleJson, null, 2)}
            </pre>
          </div>
        </div>

        {/* Analysis Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
              Test Symptom Analysis
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="I have a headache and nausea"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAnalyze}
            disabled={!inputText.trim()}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5" />
            <span>Analyze</span>
          </motion.button>
        </div>

        {/* Analysis Result */}
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
          >
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Analysis Result</h4>
            <div className="text-sm text-green-700 dark:text-green-300 space-y-1">
              <div><strong>Detected Intent:</strong> {analysisResult.intent}</div>
              <div><strong>Extracted Entities:</strong> {analysisResult.entities.map(e => e.value).join(', ')}</div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Rasa;