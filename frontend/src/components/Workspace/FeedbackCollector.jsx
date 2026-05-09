import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';

function FeedbackCollector({ user, workspaceId }) {
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState(false);

  const submit = async () => {
    if (!message.trim()) return;
    setSubmitting(true);
    setError('');
    setOk(false);
    try {
      await axios.post(API_ENDPOINTS.FEEDBACK, {
        user_id: user?.uid,
        username: user?.displayName || user?.email || 'user',
        workspace_id: workspaceId,
        message,
        created_at: new Date().toISOString(),
      });
      setOk(true);
      setMessage('');
    } catch (e) {
      setError('Failed to submit feedback.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed p-8"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/blue-gradient-abstract-background_53876-104913.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="max-w-3xl mx-auto bg-slate-900/70 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-800 p-8 transition-all duration-300">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-2 text-slate-100">Feedback Collector</h2>
        <p className="text-sm text-slate-400 mb-6">
          Share your suggestions, issues, or insights. Your username will be stored with the feedback.
        </p>

        {/* Textarea */}
        <textarea
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your feedback here..."
          className="w-full rounded-xl border border-slate-700 bg-slate-800/60 text-slate-100 p-4 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 placeholder-slate-500 transition-all resize-none"
        />

        {/* Submit Section */}
        <div className="mt-5 flex items-center gap-4">
          <button
            onClick={submit}
            disabled={submitting || !message.trim()}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              submitting || !message.trim()
                ? 'bg-blue-600/40 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105'
            }`}
          >
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </button>

          {ok && (
            <span className="text-green-400 text-sm animate-pulse">
              ✅ Submitted successfully!
            </span>
          )}
          {error && <span className="text-amber-400 text-sm">{error}</span>}
        </div>
      </div>
    </div>
  );
}

export default FeedbackCollector;

