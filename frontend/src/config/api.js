// API Configuration
// Use relative URLs to work with Vite proxy, or absolute URLs for production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/api/health`,
  WORKSPACE_CREATE: `${API_BASE_URL}/api/workspace/create`,
  WORKSPACE_LIST: `${API_BASE_URL}/api/workspace/list`,
  WORKSPACE_DELETE: `${API_BASE_URL}/api/workspace/delete`,
  DATASET_UPLOAD: `${API_BASE_URL}/api/dataset/upload`,
  DATASETS_LIST: `${API_BASE_URL}/api/datasets`,
  PREDICT: `${API_BASE_URL}/api/predict`,
  PREDICT_DOWNLOAD: `${API_BASE_URL}/api/predict/download`,
  MODEL_INFO: `${API_BASE_URL}/api/model/info`,
  MODEL_COMPARISON: `${API_BASE_URL}/api/model/comparison`,
  ALGORITHMS: `${API_BASE_URL}/api/model/algorithms`,
  TRAINING_LOGS: `${API_BASE_URL}/api/training/logs`,
  FEEDBACK: `${API_BASE_URL}/api/feedback`,
  CHATBOT: `${API_BASE_URL}/api/chatbot`,
  PROGRESS: `${API_BASE_URL}/api/progress`,
  REPORT_DOWNLOAD: `${API_BASE_URL}/api/report/download`,
};

export default API_BASE_URL;

