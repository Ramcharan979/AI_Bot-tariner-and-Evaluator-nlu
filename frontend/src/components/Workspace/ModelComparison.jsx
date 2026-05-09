import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';

function ModelComparison({ workspaceId }) {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModels();
  }, [workspaceId]);

  const fetchModels = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.MODEL_COMPARISON}?workspace_id=${workspaceId}`);
      setModels(response.data.models || []);
    } catch (error) {
      console.error('Error fetching models:', error);
      toast.error('Failed to load models');
    } finally {
      setLoading(false);
    }
  };

  const getHealthIcon = (status) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'moderate':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'poor':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <BarChart3 className="w-5 h-5 text-gray-500" />;
    }
  };

  const getHealthColor = (status) => {
    switch (status) {
      case 'good':
        return 'text-green-400';
      case 'moderate':
        return 'text-yellow-400';
      case 'poor':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-8 bg-slate-900/40 backdrop-blur-xl shadow-xl border border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-blue-400" />
          Model Comparison Dashboard
        </h2>

        {models.length === 0 ? (
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No trained models found. Train some models first to see comparisons.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-900/30 rounded-lg">
                <p className="text-sm text-gray-300 mb-1">Total Models</p>
                <p className="text-2xl font-bold text-blue-400">{models.length}</p>
              </div>
              <div className="p-4 bg-green-900/30 rounded-lg">
                <p className="text-sm text-gray-300 mb-1">Best Accuracy</p>
                <p className="text-2xl font-bold text-green-400">
                  {Math.max(...models.map(m => m.accuracy || 0)).toFixed(2)}%
                </p>
              </div>
              <div className="p-4 bg-purple-900/30 rounded-lg">
                <p className="text-sm text-gray-300 mb-1">Algorithms Used</p>
                <p className="text-2xl font-bold text-purple-400">
                  {new Set(models.map(m => m.algorithm)).size}
                </p>
              </div>
              <div className="p-4 bg-yellow-900/30 rounded-lg">
                <p className="text-sm text-gray-300 mb-1">Avg Training Time</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {models.length > 0 ? (models.reduce((sum, m) => sum + (m.training_time || 0), 0) / models.length).toFixed(1) : 0}s
                </p>
              </div>
            </div>

            {/* Models Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="pb-3 text-gray-300 font-semibold">Algorithm</th>
                    <th className="pb-3 text-gray-300 font-semibold">Accuracy</th>
                    <th className="pb-3 text-gray-300 font-semibold">F1 Score</th>
                    <th className="pb-3 text-gray-300 font-semibold">Training Time</th>
                    <th className="pb-3 text-gray-300 font-semibold">Health Status</th>
                    <th className="pb-3 text-gray-300 font-semibold">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {models.map((model, index) => (
                    <motion.tr
                      key={model.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-slate-800/50"
                    >
                      <td className="py-4 text-white font-medium">{model.algorithm}</td>
                      <td className="py-4 text-blue-400">
                        {model.accuracy ? `${model.accuracy.toFixed(2)}%` : 'N/A'}
                      </td>
                      <td className="py-4 text-purple-400">
                        {model.f1_score ? model.f1_score.toFixed(3) : 'N/A'}
                      </td>
                      <td className="py-4 text-yellow-400 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {model.training_time ? `${model.training_time.toFixed(1)}s` : 'N/A'}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          {getHealthIcon(model.health_status)}
                          <span className={`capitalize ${getHealthColor(model.health_status)}`}>
                            {model.health_status || 'unknown'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-400">
                        {new Date(model.created_at).toLocaleDateString()}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModelComparison;