import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  const handleUnlock = () => {
    setIsUnlocking(true);
    setTimeout(() => {
      setShowLogin(true);
      setIsUnlocking(false);
    }, 300);
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Logged in with Google!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // tweak these offsets to fine-tune vertical spacing relative to fingerprint
  const titleOffset = -140; // px above the anchor (fingerprint center)
  const bottomOffset = 320; // px below the anchor (fingerprint center)

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">

      {/* Full-screen AI Background */}
      <div
        className={`absolute inset-0 bg-cover bg-center cursor-pointer transition-all duration-600 fingerprint-bg ${
          isUnlocking ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        }`}
        style={{
          backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/011/635/825/non_2x/abstract-square-interface-modern-background-concept-fingerprint-digital-scanning-visual-security-system-authentication-login-vector.jpg)',
          backgroundPosition: 'center 30%',
        }}
        onClick={handleUnlock}
      ></div>

      {/* Central glow effect (keeps fingerprint visually highlighted) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-blue-400/20 via-purple-400/10 to-transparent rounded-full pointer-events-none"></div>

      {/* ===== BRUTE-FORCE ANCHOR: position at fingerprint visual center (center horizontally, 30% vertically) ===== */}
      <div
        className="central-anchor"
        style={{
          position: 'absolute',
          top: '30%',      // matches backgroundPosition 'center 30%'
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none', // allow clicks to pass through to background
          zIndex: 15,
        }}
      >
        {/* Title (only show when login form is hidden) */}
        {!showLogin && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              position: 'relative',
              top: `${titleOffset}px`, // push up from anchor
              left: '0',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <h1
              className="text-3xl font-bold text-white mb-2 tracking-wide"
              style={{ textShadow: '0 0 10px rgba(0, 200, 255, 0.6)' }}
            >
              Secure Authentication
            </h1>
            <p className="text-blue-300 text-sm font-medium">
              AI Workspace Access Portal
            </p>
            <div className="w-20 h-0.5 bg-gradient-to-r from-blue-400 to-transparent mx-auto mt-3 rounded-full"></div>
          </motion.div>
        )}

        {/* Bottom instruction (only show when login form is hidden) */}
        {!showLogin && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{
              position: 'relative',
              top: `${bottomOffset}px`, // push down from anchor
              left: '0',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <p className="text-slate-300 text-sm font-medium">
              Tap on fingerprint to Begin Authorization
            </p>
          </motion.div>
        )}
      </div>
      {/* ===== end anchor block ===== */}

      {/* Login form (appears after click) */}
      {showLogin && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

          {/* Neural network animated overlay */}
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080">
              <defs>
                <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
                  <stop offset="50%" stopColor="rgba(147, 51, 234, 0.6)" />
                  <stop offset="100%" stopColor="rgba(236, 72, 153, 0.6)" />
                </linearGradient>
              </defs>

              <path d="M100,200 L400,200" stroke="url(#neuralGradient)" strokeWidth="1">
                <animate attributeName="stroke-dasharray" values="0,300;300,0" dur="4s" repeatCount="indefinite" />
              </path>
              <path d="M500,300 L800,300" stroke="url(#neuralGradient)" strokeWidth="1">
                <animate attributeName="stroke-dasharray" values="0,300;300,0" dur="3s" repeatCount="indefinite" />
              </path>
              <path d="M900,400 L1200,400" stroke="url(#neuralGradient)" strokeWidth="1">
                <animate attributeName="stroke-dasharray" values="0,300;300,0" dur="5s" repeatCount="indefinite" />
              </path>

              <circle cx="300" cy="200" r="3" fill="rgba(59, 130, 246, 0.8)" className="animate-ping" />
              <circle cx="700" cy="300" r="3" fill="rgba(147, 51, 234, 0.8)" className="animate-ping" />
              <circle cx="500" cy="400" r="3" fill="rgba(236, 72, 153, 0.8)" className="animate-ping" />
            </svg>
          </div>

          {/* Theme toggle */}
          <div className="absolute top-4 right-4 z-20">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-3 rounded-full bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 hover:bg-white/30 dark:hover:bg-slate-800/30 transition-all"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </motion.button>
          </div>

          {/* animated blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 dark:bg-yellow-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>

          {/* glass login card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-8 w-full max-w-2xl md:max-w-3xl z-10 shadow-2xl"

          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4"
              >
                <LogIn className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold gradient-text mb-2">Welcome Back</h1>
              <p className="text-slate-600 dark:text-slate-400">Sign in to your AI Workspace</p>
            </div>

            <form onSubmit={handleEmailLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </motion.button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300 dark:border-slate-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-slate-800 text-slate-500">Or continue with</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleLogin}
                disabled={loading}
                className="mt-4 w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Google</span>
              </motion.button>
            </div>

            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Animations & Styles */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        .fingerprint-bg:hover {
          box-shadow: 0 0 50px rgba(59, 130, 246, 0.3);
          transition: box-shadow 0.3s ease;
        }

        .fingerprint-bg:active {
          animation: pulse 1s ease;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
          70% { box-shadow: 0 0 0 30px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
      `}</style>
    </div>
  );
}

export default Login;
