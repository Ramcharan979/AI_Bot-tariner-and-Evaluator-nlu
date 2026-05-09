import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquare, Bot, User } from "lucide-react";
import { API_ENDPOINTS } from "../../config/api";

function Chatbot({ workspaceId }) {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "Hello! I'm your AI health assistant. Select a domain above to get specialized help:\n\n🏥 General Health: Describe symptoms for disease prediction\n🥗 Diet & Nutrition: Get dietary recommendations\n💪 Workouts & Exercise: Safe exercise guidance\n💊 Medications: Treatment information\n⚠️ Precautions: Safety and prevention tips",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("general");
  const [showDomainSelector, setShowDomainSelector] = useState(true);
  const messagesEndRef = useRef(null);

  const domains = [
    { id: "general", name: "General Health", icon: "🏥", description: "Describe symptoms like 'headache and fever'" },
    { id: "diet", name: "Diet & Nutrition", icon: "🥗", description: "Ask 'diet for diabetes' or 'healthy eating tips'" },
    { id: "workout", name: "Workouts & Exercise", icon: "💪", description: "Ask 'safe exercises for arthritis' or 'workout plans'" },
    { id: "medications", name: "Medications", icon: "💊", description: "Ask 'medicines for hypertension' or 'treatment options'" },
    { id: "precautions", name: "Precautions", icon: "⚠️", description: "Ask 'how to prevent flu' or 'safety tips'" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleDomainSelect = (domainId) => {
    setSelectedDomain(domainId);
    setShowDomainSelector(false); // Hide selector after selection
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(API_ENDPOINTS.CHATBOT, {
        message: input,
        workspace_id: workspaceId,
        domain: selectedDomain,
      });

      setMessages((prev) => [
        ...prev,
        { role: "bot", content: response.data.reply },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to get response from chatbot");
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen w-full p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Chat container with background */}
        <div
          className="rounded-2xl p-8 shadow-2xl border border-slate-800 relative overflow-hidden backdrop-blur-xl"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            backgroundBlendMode: "overlay",
          }}
        >
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-slate-900/40"></div>

          <div className="relative z-10 flex flex-col h-[90vh]">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
                <MessageSquare className="w-6 h-6 text-blue-400" />
                AI Health Assistant
              </h2>
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-300 text-sm">
                  Ask your health-related questions. Each domain provides specialized responses.
                </p>
                {!showDomainSelector && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowDomainSelector(true)}
                    className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 text-xs rounded-lg border border-slate-600/50 transition-all duration-200 backdrop-blur-md"
                  >
                    Change Domain
                  </motion.button>
                )}
              </div>

              {/* Domain Selection - Collapsible */}
              <AnimatePresence>
                {showDomainSelector && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mb-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 mb-3">
                      {domains.map((domain) => (
                        <motion.button
                          key={domain.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleDomainSelect(domain.id)}
                          className={`p-2 rounded-lg border-2 transition-all duration-200 backdrop-blur-md ${
                            selectedDomain === domain.id
                              ? "bg-blue-600/20 border-blue-400 text-blue-100 shadow-lg shadow-blue-900/30"
                              : "bg-slate-800/40 border-slate-600/50 text-slate-300 hover:border-slate-500/70 hover:bg-slate-700/40"
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-lg mb-1">{domain.icon}</div>
                            <div className="font-medium text-xs mb-0.5">{domain.name}</div>
                            <div className="text-xs opacity-70 leading-tight">{domain.description}</div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="text-center">
                <p className="text-slate-400 text-xs">
                  Current domain: <span className="text-blue-400 font-medium">
                    {domains.find(d => d.id === selectedDomain)?.name}
                  </span>
                </p>
              </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-6 pr-2 rounded-2xl p-6 border border-slate-700/50 shadow-inner bg-slate-900/20 backdrop-blur-sm">
              <AnimatePresence>
                {messages.map((message, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`flex gap-4 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "bot" && (
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-800/30 ring-2 ring-blue-500/20">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl px-5 py-4 shadow-lg ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-900/30"
                          : "bg-white/10 text-slate-100 border border-slate-600/50 backdrop-blur-md shadow-slate-900/20"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                    {message.role === "user" && (
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg ring-2 ring-slate-500/20">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-800/30 ring-2 ring-blue-500/20">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white/10 rounded-2xl px-5 py-4 border border-slate-600/50 backdrop-blur-md shadow-lg">
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              )}
          <div ref={messagesEndRef} />
        </div>

            {/* Input */}
            <div className="flex gap-4 mt-auto">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  selectedDomain === 'general' ? "Describe your symptoms (e.g., 'headache and fever for 2 days')..." :
                  selectedDomain === 'diet' ? "Ask about diets (e.g., 'diet for diabetes' or 'healthy eating tips')..." :
                  selectedDomain === 'workout' ? "Ask about exercises (e.g., 'safe workouts for arthritis')..." :
                  selectedDomain === 'medications' ? "Ask about medicines (e.g., 'medicines for hypertension')..." :
                  selectedDomain === 'precautions' ? "Ask about precautions (e.g., 'how to prevent flu')..." :
                  "Ask your health question..."
                }
                className="flex-1 px-5 py-4 rounded-xl border border-slate-600/50 bg-slate-800/40 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-md shadow-lg"
                disabled={loading}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-900/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
              >
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">Send</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
