import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';

function Algorithms({ workspaceId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`${API_ENDPOINTS.ALGORITHMS}?workspace_id=${encodeURIComponent(workspaceId)}`);
        if (!mounted) return;
        setItems(res.data?.algorithms || []);
      } catch (e) {
        // Fallback static example if API not ready
        setItems([
          { name: 'RandomForestClassifier', version: '1.4', method: 'Supervised', params: { n_estimators: 200, max_depth: 16 } },
          { name: 'TF-IDF + LogisticRegression', version: '2.1', method: 'Text Classification', params: { C: 1.0, penalty: 'l2' } },
        ]);
        setError('Using fallback data (API not reachable).');
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [workspaceId]);

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Algorithms Used</h2>
        {loading && <span className="text-sm text-slate-500">Loading...</span>}
      </div>
      {error && (
        <div className="mb-4 text-xs text-amber-600">{error}</div>
      )}
      {items.length === 0 ? (
        <div className="text-slate-500">No algorithms info available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((alg, idx) => (
            <div key={idx} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <div className="font-semibold text-slate-800 dark:text-slate-100">{alg.name}</div>
              <div className="text-xs text-slate-500">Version: {alg.version || 'N/A'}</div>
              <div className="text-sm mt-2"><span className="font-medium">Method:</span> {alg.method || 'N/A'}</div>
              {alg.params && (
                <div className="mt-2 text-sm">
                  <div className="font-medium mb-1">Hyperparameters</div>
                  <ul className="list-disc pl-5 space-y-0.5 text-slate-700 dark:text-slate-300">
                    {Object.entries(alg.params).map(([k, v]) => (
                      <li key={k}><span className="font-medium">{k}:</span> {String(v)}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Algorithms;
