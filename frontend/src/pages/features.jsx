import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      title: "Dataset Management",
      desc: "Upload, organize, and preprocess your datasets with intelligent data validation. Supports CSV, JSON, and Excel formats with automatic data type detection and cleaning.",
      icon: "📊",
      color: "from-blue-500 to-cyan-500",
      details: [
        "Drag & drop file upload",
        "Automatic data validation",
        "Data preprocessing tools",
        "Format conversion",
        "Dataset versioning"
      ]
    },
    {
      title: "AutoML Training",
      desc: "Automated machine learning pipelines with hyperparameter optimization and model selection. Train multiple models simultaneously and compare performance.",
      icon: "🤖",
      color: "from-green-500 to-emerald-500",
      details: [
        "Automated model selection",
        "Hyperparameter optimization",
        "Cross-validation",
        "Performance comparison",
        "Training progress tracking"
      ]
    },
    {
      title: "Rasa NLU Integration",
      desc: "Seamless integration with Rasa for natural language understanding and chatbot development. Train conversational AI models with your custom data.",
      icon: "💬",
      color: "from-purple-500 to-pink-500",
      details: [
        "Rasa framework integration",
        "Intent classification",
        "Entity recognition",
        "Conversation training",
        "Model export"
      ]
    },
    {
      title: "Model Predictions",
      desc: "Real-time predictions with trained models and comprehensive inference analytics. Get instant results with detailed confidence scores.",
      icon: "⚡",
      color: "from-yellow-500 to-orange-500",
      details: [
        "Real-time inference",
        "Batch predictions",
        "Confidence scoring",
        "Prediction history",
        "API endpoints"
      ]
    },
    {
      title: "Training Analytics",
      desc: "Monitor training progress with live metrics, accuracy curves, and performance insights. Visualize model performance across epochs.",
      icon: "📈",
      color: "from-red-500 to-rose-500",
      details: [
        "Live training metrics",
        "Accuracy/loss curves",
        "Performance dashboards",
        "Model comparison",
        "Exportable reports"
      ]
    },
    {
      title: "Model Deployment",
      desc: "One-click deployment of trained models with scalable API endpoints. Deploy your models for production use with automatic scaling.",
      icon: "🚀",
      color: "from-indigo-500 to-blue-500",
      details: [
        "One-click deployment",
        "REST API endpoints",
        "Automatic scaling",
        "Usage monitoring",
        "Version management"
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold text-white">NeuralForge</span>
            </Link>
            <Link 
              to="/"
              className="text-gray-200 hover:text-white px-4 py-2 rounded-lg border border-white/20 hover:border-white/40 transition"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Features</span>
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto">
            Discover all the powerful tools and capabilities that make NeuralForge the complete AI platform.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="space-y-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl shadow-lg`}>
                    {feature.icon}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-4">{feature.title}</h2>
                  <p className="text-lg text-slate-200 mb-6 leading-relaxed">{feature.desc}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {feature.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center space-x-3 text-slate-300">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-slate-200 mb-6 max-w-2xl mx-auto">
              Join thousands of developers and start building intelligent applications today.
            </p>
            <Link
              to="/register"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg transition inline-block"
            >
              Get Started Now
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;