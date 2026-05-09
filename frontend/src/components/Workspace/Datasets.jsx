import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';

function Datasets({ workspaceId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(
          `${API_ENDPOINTS.DATASETS_LIST}?workspace_id=${encodeURIComponent(workspaceId)}`
        );
        if (!mounted) return;
        setItems(res.data?.datasets || []);
      } catch (e) {
        setError('Failed to fetch datasets.');
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [workspaceId]);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed p-8"
      style={{
        backgroundImage:
          "url('https://t3.ftcdn.net/jpg/15/66/57/08/360_F_1566570889_oShW2XGQVhdXaDHAFnwkSc7i0FzY1Ids.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="max-w-5xl mx-auto bg-slate-900/70 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-800 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-100">Datasets</h2>
          {loading && (
            <span className="text-sm text-slate-400 animate-pulse">
              Loading...
            </span>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-sm text-amber-400 bg-amber-900/30 p-3 rounded-md border border-amber-800/30">
            {error}
          </div>
        )}

        {/* Dataset List */}
        {items.length === 0 && !loading ? (
          <div className="text-slate-400 italic text-sm">
            No datasets uploaded yet.
          </div>
        ) : (
          <div className="divide-y divide-slate-700/60 rounded-lg bg-slate-800/40 border border-slate-700/40 backdrop-blur-sm overflow-hidden">
            {items.map((d, idx) => (
              <div
                key={d.id || idx}
                className="py-4 px-4 flex items-center justify-between hover:bg-slate-800/60 transition-colors"
              >
                <div>
                  <div className="font-semibold text-slate-100">
                    {d.name}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {d.size
                      ? `${(d.size / 1024 / 1024).toFixed(2)} MB`
                      : ''}
                    {d.uploaded_at
                      ? ` • ${new Date(d.uploaded_at).toLocaleString()}`
                      : ''}
                  </div>
                </div>
                {d.url ? (
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 text-sm hover:underline hover:text-blue-300 transition"
                  >
                    Open
                  </a>
                ) : (
                  <button
                    disabled
                    className="text-slate-500 text-sm cursor-not-allowed"
                  >
                    No URL
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Datasets;
