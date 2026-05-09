import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Target,
  Loader,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { API_ENDPOINTS } from '../../config/api';

function ModelInfo({ workspaceId }) {
  const [modelInfo, setModelInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadModelInfo();
  }, [workspaceId]);

  const loadModelInfo = async () => {
    try {
      const response = await axios.post(API_ENDPOINTS.MODEL_INFO, {
        workspace_id: workspaceId,
      });
      setModelInfo(response.data);
    } catch (error) {
      if (error.response?.status !== 404) {
        toast.error('Failed to load model information');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="rounded-2xl p-8 flex items-center justify-center h-64"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-vector/abstract-dark-background-with-line-grid-gradient-color-applicable-website-banner-poster-corporate_650401-156.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backgroundBlendMode: 'overlay',
        }}
      >
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!modelInfo) {
    return (
      <div
        className="rounded-2xl p-8 text-center backdrop-blur-md border border-slate-700/50"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-vector/abstract-dark-background-with-line-grid-gradient-color-applicable-website-banner-poster-corporate_650401-156.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backgroundBlendMode: 'overlay',
        }}
      >
        <BarChart3 className="w-16 h-16 mx-auto text-slate-400 mb-4" />
        <h3 className="text-xl font-semibold text-slate-100 mb-2">
          No Model Found
        </h3>
        <p className="text-slate-400">
          Please upload and train a dataset first to view model information.
        </p>
      </div>
    );
  }

  const metricsData = [
    { name: 'Accuracy', value: modelInfo.accuracy, color: '#3b82f6' },
    { name: 'F1 Score', value: modelInfo.f1_score, color: '#8b5cf6' },
    { name: 'R² Score', value: modelInfo.r2_score, color: '#10b981' },
  ].filter((item) => item.value !== null);

  const chartData = metricsData.map((item) => ({
    name: item.name,
    value: item.value,
  }));

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed p-8"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-vector/abstract-dark-background-with-line-grid-gradient-color-applicable-website-banner-poster-corporate_650401-156.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="max-w-6xl mx-auto bg-slate-900/70 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-slate-800 space-y-6">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 text-slate-100 flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-blue-400" />
          Model Information
        </h2>

        {/* Health Status Indicator */}
        {modelInfo.health_status && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-xl border-2 mb-6 ${
              modelInfo.health_status === 'good'
                ? 'bg-green-900/20 border-green-500/50'
                : modelInfo.health_status === 'moderate'
                ? 'bg-yellow-900/20 border-yellow-500/50'
                : 'bg-red-900/20 border-red-500/50'
            }`}
          >
            <div className="flex items-center gap-4">
              {modelInfo.health_status === 'good' && <CheckCircle className="w-8 h-8 text-green-400" />}
              {modelInfo.health_status === 'moderate' && <AlertTriangle className="w-8 h-8 text-yellow-400" />}
              {modelInfo.health_status === 'poor' && <XCircle className="w-8 h-8 text-red-400" />}
              <div>
                <h3 className={`text-xl font-bold ${
                  modelInfo.health_status === 'good'
                    ? 'text-green-400'
                    : modelInfo.health_status === 'moderate'
                    ? 'text-yellow-400'
                    : 'text-red-400'
                }`}>
                  Model Health: {modelInfo.health_status.charAt(0).toUpperCase() + modelInfo.health_status.slice(1)}
                </h3>
                <p className="text-slate-300 mt-1">
                  {modelInfo.health_status === 'good' && 'Excellent performance! Your model is ready for production use.'}
                  {modelInfo.health_status === 'moderate' && 'Decent performance. Consider fine-tuning or trying different algorithms.'}
                  {modelInfo.health_status === 'poor' && 'Performance needs improvement. Try different algorithms or preprocess your data.'}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-6 bg-blue-900/40 rounded-xl border border-blue-700/40">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-blue-400" />
              <p className="text-sm font-medium text-slate-300">Algorithm</p>
            </div>
            <p className="text-lg font-bold text-blue-400 break-words leading-tight">
              {modelInfo.algorithm}
            </p>
          </div>

          {modelInfo.accuracy !== null && (
            <div className="p-6 bg-purple-900/40 rounded-xl border border-purple-700/40">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <p className="text-sm font-medium text-slate-300">Accuracy</p>
              </div>
              <p className="text-2xl font-bold text-purple-400">
                {modelInfo.accuracy.toFixed(2)}%
              </p>
            </div>
          )}

          {modelInfo.f1_score !== null && (
            <div className="p-6 bg-green-900/40 rounded-xl border border-green-700/40">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <p className="text-sm font-medium text-slate-300">F1 Score</p>
              </div>
              <p className="text-2xl font-bold text-green-400">
                {modelInfo.f1_score.toFixed(3)}
              </p>
            </div>
          )}

          {modelInfo.r2_score !== null && (
            <div className="p-6 bg-yellow-900/40 rounded-xl border border-yellow-700/40">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
                <p className="text-sm font-medium text-slate-300">R² Score</p>
              </div>
              <p className="text-2xl font-bold text-yellow-400">
                {modelInfo.r2_score.toFixed(3)}
              </p>
            </div>
          )}

          {modelInfo.mse !== null && (
            <div className="p-6 bg-pink-900/40 rounded-xl border border-pink-700/40">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-pink-400" />
                <p className="text-sm font-medium text-slate-300">MSE</p>
              </div>
              <p className="text-2xl font-bold text-pink-400">
                {modelInfo.mse.toFixed(3)}
              </p>
            </div>
          )}

          <div className="p-6 bg-indigo-900/40 rounded-xl border border-indigo-700/40">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-indigo-400" />
              <p className="text-sm font-medium text-slate-300">
                Training Time
              </p>
            </div>
            <p className="text-2xl font-bold text-indigo-400">
              {(Number(modelInfo.training_time) || 0).toFixed(3)}s
            </p>
          </div>
        </div>

        {/* Charts */}
        {chartData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/40">
              <h3 className="text-lg font-semibold mb-4 text-slate-100">
                Performance Metrics
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis
                    domain={[0, 100]}
                    tickFormatter={(v) => `${Math.round(v)}%`}
                    stroke="#94a3b8"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      color: '#fff',
                    }}
                    formatter={(v) => `${v.toFixed(2)}%`}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#60a5fa"
                    strokeWidth={3}
                    dot={{ r: 5, stroke: '#2563eb', strokeWidth: 2 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/40">
              <h3 className="text-lg font-semibold mb-4 text-slate-100">
                Metrics Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={metricsData[index].color}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      color: '#fff',
                    }}
                    formatter={(v, n, props) => [
                      `${v.toFixed(2)}%`,
                      props?.payload?.name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3 flex flex-wrap gap-3 text-sm">
                {metricsData.map((m) => (
                  <div key={m.name} className="inline-flex items-center gap-2">
                    <span
                      className="inline-block w-3 h-3 rounded"
                      style={{ backgroundColor: m.color }}
                    />
                    <span className="text-slate-300">{m.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-6 p-6 bg-slate-800/60 rounded-xl border border-slate-700/40">
          <h3 className="text-lg font-semibold mb-4 text-slate-100">
            Model Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-400 mb-1">Target Column</p>
              <p className="font-semibold text-slate-100">
                {modelInfo.target_column}
              </p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">Created At</p>
              <p className="font-semibold text-slate-100">
                {new Date(modelInfo.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModelInfo;
