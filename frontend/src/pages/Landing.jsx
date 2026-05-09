import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Floating animation for elements
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Stagger animation for features
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const features = [
    {
      title: "Dataset Management",
      desc: "Upload, organize, and preprocess your datasets with intelligent data validation.",
      icon: "📊",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "AutoML Training",
      desc: "Automated machine learning pipelines with hyperparameter optimization and model selection.",
      icon: "🤖",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Rasa NLU Integration",
      desc: "Seamless integration with Rasa for natural language understanding and chatbot development.",
      icon: "💬",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Model Predictions",
      desc: "Real-time predictions with trained models and comprehensive inference analytics.",
      icon: "⚡",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Training Analytics",
      desc: "Monitor training progress with live metrics, accuracy curves, and performance insights.",
      icon: "📈",
      color: "from-red-500 to-rose-500",
    },
    {
      title: "Model Deployment",
      desc: "One-click deployment of trained models with scalable API endpoints.",
      icon: "🚀",
      color: "from-indigo-500 to-blue-500",
    },
  ];

  // Medical and AI-themed floating icons
  const floatingIcons = [
    { icon: "🧠", size: "text-4xl", delay: 0, duration: 8 },
    { icon: "🩺", size: "text-3xl", delay: 1, duration: 7 },
    { icon: "💊", size: "text-5xl", delay: 2, duration: 9 },
    { icon: "🏥", size: "text-4xl", delay: 3, duration: 6 },
    { icon: "⚙", size: "text-3xl", delay: 4, duration: 8 },
    { icon: "🎯", size: "text-4xl", delay: 5, duration: 7 },
    { icon: "🔮", size: "text-5xl", delay: 6, duration: 10 },
    { icon: "💡", size: "text-3xl", delay: 7, duration: 6 },
  ];

  // Updated stats - more relevant for AI platform
  const stats = [
    { number: "99.9%", label: "Uptime", description: "Reliable service availability" },
    { number: "<2s", label: "Response Time", description: "Fast model inference" },
    { number: "10x", label: "Faster Training", description: "Optimized pipelines" },
    { number: "24/7", label: "Support", description: "Always here to help" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-cyan-900 to-green-900 relative overflow-hidden text-gray-100">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900" />

        {/* Animated circuit board pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            animation: "pan 15s linear infinite",
          }}
        />

        {/* Floating neural network connections */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
          <defs>
            <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
            </radialGradient>
          </defs>
          {[...Array(8)].map((_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 100}
              cy={Math.random() * 100}
              r="0.5"
              fill="url(#glow)"
              animate={{
                r: [0.5, 2, 0.5],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </svg>

        {/* Floating AI Icons */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.size} text-white/20`}
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
          >
            {item.icon}
          </motion.div>
        ))}

        {/* Data flow lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
          {[...Array(12)].map((_, i) => (
            <motion.path
              key={i}
              d={`M ${Math.random() * 100} ${Math.random() * 100} 
                  C ${Math.random() * 100} ${Math.random() * 100},
                    ${Math.random() * 100} ${Math.random() * 100},
                    ${Math.random() * 100} ${Math.random() * 100}`}
              stroke="url(#lineGradient)"
              strokeWidth="0.3"
              fill="none"
              animate={{
                strokeDasharray: ["0 10", "10 0"],
                opacity: [0.1, 0.5, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Pulsing orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl shadow-cyan-500/50"
        />

        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-green-500/20 rounded-full blur-3xl shadow-green-500/50"
        />

        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-2/3 left-1/3 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl shadow-cyan-500/50"
        />

        {/* Binary rain effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-400/20 font-mono text-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-20px",
              }}
              animate={{
                y: ["0vh", "100vh"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/20 backdrop-blur-md shadow-sm fixed w-full top-0 z-50 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <span className="text-white font-bold text-sm">AI</span>
              </motion.div>
              <h1 className="text-2xl font-bold text-white tracking-tight select-text">AI Workspace</h1>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/login"
                  className="text-gray-200 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition border border-white/20 hover:border-white/40 hover:bg-white/5"
                >
                  Sign In
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-lg transition shadow-blue-500/25 hover:shadow-blue-500/40"
                >
                  Sign Up
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section with compact layout */}
      <section
        className="relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: "url('/assets/images/LandingPage.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          height: "100vh",
          padding: "4rem 1rem 1rem",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* FIX 1: Increased opacity from 30% to 75% (bg-black/75). 
            This is the main fix to make white text pop. */}
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        <div className="max-w-4xl mx-auto text-center w-full px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-4">
            <motion.div animate={floatingAnimation} className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full mb-4 border border-white/20 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-200 font-bold tracking-wide">AI-Powered Platform</span>
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-4">
            {/* FIX 2: Added a heavy black drop-shadow behind the text (0 4px 10px black) 
                before the cyan glow. This creates a hard edge for readability. */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 leading-tight select-text"
              style={{ textShadow: "0 4px 10px rgba(0,0,0,0.9), 0 0 25px rgba(6,182,212,0.6)" }}
            >
              AI-Integrated Health Assessment
            </h1>

            <div className="text-lg sm:text-xl font-medium text-slate-200 mb-4">
              {/* FIX 3: Used lighter gradient colors (300 instead of 400) for better brightness */}
              <span className="bg-gradient-to-r from-cyan-300 via-white to-green-300 bg-clip-text text-transparent font-bold drop-shadow-md">
                AI-Powered Health Assessments and Predictions
              </span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm sm:text-base text-gray-100 max-w-2xl mx-auto mb-6 leading-relaxed font-medium"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
          >
            Upload medical datasets, train AI models, and generate accurate health predictions in one seamless workflow.
          </motion.p>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.4 }} className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-lg transition shadow-blue-500/25 inline-flex items-center space-x-2 border border-white/10"
              >
                <span>Get Started</span>
                <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  →
                </motion.span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/features"
                className="bg-black/40 border border-white/30 hover:border-white/60 text-white px-6 py-3 rounded-lg text-sm font-medium transition inline-flex items-center space-x-1 hover:bg-black/60 backdrop-blur-sm"
              >
                <span>View Features</span>
                <span>✨</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Section - Added background to cards for readability */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} className="text-center p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/40 transition-all duration-300 group shadow-lg">
                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: index * 0.1 + 0.8, type: "spring" }} className="text-3xl font-bold text-white mb-2 select-text group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 drop-shadow-sm">
                  {stat.number}
                </motion.div>
                <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-sm text-gray-300 font-medium">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 select-text">
              Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Features</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto">Everything you need to build, train, and deploy AI models for health assessments in one platform.</p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants} whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", stiffness: 300 } }} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-white/10 group-hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className={`w-12 h-12 rounded-xl mb-4 bg-gradient-to-br ${feature.color} flex items-center justify-center text-xl font-semibold shadow-lg`}>
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-3 select-text">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed flex-grow">{feature.desc}</p>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }} className="h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent mt-4" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-3xl" />
            <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 select-text">Ready to Start Assessing?</h2>
              <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl mx-auto">Join healthcare professionals creating intelligent health assessments with our AI platform.</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl transition shadow-blue-500/25">
                  Get Started
                </Link>
                <Link to="/features" className="border-2 border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-xl text-lg font-semibold transition backdrop-blur-sm hover:bg-white/5">
                  View All Features
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-transparent text-slate-300 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mb-6">
            <h3 className="text-2xl font-bold mb-3 text-white select-text">AI-Integrated Health Assessment Web Application</h3>
            <p className="text-slate-400 max-w-md mx-auto">Empowering healthcare with AI-driven assessments and predictions.</p>
          </motion.div>
          <div className="text-sm text-slate-500">© 2025 AI Workspace. All rights reserved.</div>
        </div>
      </footer>

      {/* Custom styles for animations (Vite-friendly) */}
      <style>{`
        @keyframes pan {
          from {
            background-position: 0% 0%;
          }
          to {
            background-position: 100% 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Landing;
