import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';

function TrainingLogs({ workspaceId }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError('');
      try {
        const url = `${API_ENDPOINTS.TRAINING_LOGS}?workspace_id=${encodeURIComponent(
          workspaceId
        )}${level ? `&level=${encodeURIComponent(level)}` : ''}`;
        const res = await axios.get(url);
        if (!mounted) return;
        setLogs(res.data?.logs || []);
      } catch (e) {
        setError('Failed to fetch training logs.');
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [workspaceId, level]);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed p-8"
      style={{
        backgroundImage:
          "url('https://thumbs.dreamstime.com/b/honeycomb-grid-tile-random-background-hexagonal-cell-texture-color-proton-purple-violet-dark-black-gradient-tec-152792351.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="max-w-5xl mx-auto bg-slate-900/70 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-800 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-100">Training Logs</h2>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="text-sm px-3 py-2 rounded-md border border-slate-600 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All</option>
            <option value="INFO">INFO</option>
            <option value="WARN">WARN</option>
            <option value="ERROR">ERROR</option>
          </select>
        </div>

        {/* Log viewer */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 h-[450px] overflow-auto backdrop-blur-sm text-sm text-slate-100">
          {loading ? (
            <div className="text-slate-400 animate-pulse">Loading logs...</div>
          ) : error ? (
            <div className="text-amber-400">{error}</div>
          ) : logs.length === 0 ? (
            <div className="text-slate-400 italic">No logs available.</div>
          ) : (
            <ul className="space-y-1">
              {logs.map((l, idx) => (
                <li
                  key={idx}
                  className={`whitespace-pre-wrap ${
                    l.level === 'ERROR'
                      ? 'text-red-400'
                      : l.level === 'WARN'
                      ? 'text-amber-400'
                      : 'text-slate-300'
                  }`}
                >
                  <span className="text-slate-500">
                    [{l.ts ? new Date(l.ts).toLocaleString() : '—'}]
                  </span>
                  {l.level ? ` [${l.level}]` : ''} {l.message || ''}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrainingLogs;
