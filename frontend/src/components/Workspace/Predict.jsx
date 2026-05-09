import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FileText, Download, TrendingUp, Loader } from "lucide-react";
import { API_ENDPOINTS } from "../../config/api";

function Predict({ workspaceId }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const isCsv = selectedFile.name.toLowerCase().endsWith(".csv");
    const isJson = selectedFile.name.toLowerCase().endsWith(".json");
    if (!isCsv && !isJson) {
      toast.error("Please upload a CSV or JSON file");
      return;
    }

    setFile(selectedFile);
  };

  const handlePredict = async () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("workspace_id", workspaceId);

      const response = await axios.post(API_ENDPOINTS.PREDICT, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (evt) => {
          if (evt.total) {
            setUploadProgress(Math.round((evt.loaded * 100) / evt.total));
          }
        },
      });

      const resp = response.data || {};
      const normalized = {
        predictions: resp.predictions || resp.predicted || [],
        data: resp.data_preview || resp.data || [],
        total_rows: resp.total_rows ?? resp.totalRows ?? (resp.data ? resp.data.length : 0),
        predictedColumn:
          resp.predicted_column ||
          resp.predictedColumn ||
          resp.target_column ||
          resp.targetColumn ||
          null,
      };

      setResults(normalized);
      toast.success("Predictions generated successfully!");
    } catch (error) {
      console.error("Error making predictions:", error);
      toast.error(error.response?.data?.error || "Failed to generate predictions");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!results) return;

    try {
      const response = await axios.post(
        API_ENDPOINTS.PREDICT_DOWNLOAD,
        {
          workspace_id: workspaceId,
          predictions: results.predictions,
          original_data: results.data,
        },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "predictions.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("File downloaded successfully!");
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to download file");
    }
  };

  const columns = results
    ? (() => {
        const firstRow = results?.data?.[0] || {};
        let cols = Object.keys(firstRow);
        const pred = results?.predictedColumn || null;
        if (pred && cols.includes(pred)) {
          cols = cols.filter((c) => c !== pred);
          cols.push(pred);
        }
        return cols;
      })()
    : [];

  return (
    <div className="min-h-screen w-full p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div
          className="rounded-2xl p-8 backdrop-blur-md shadow-2xl border border-slate-800 relative overflow-hidden"
          style={{
            backgroundImage:
              "url('https://thumbs.dreamstime.com/b/technology-network-digital-data-wave-background-glowing-connections-forming-abstract-futuristic-innovation-concept-380330795.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            backgroundBlendMode: "overlay",
          }}
        >
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-slate-900/30"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-6 text-slate-100 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              Make Predictions
            </h2>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-slate-300">
              Upload CSV or JSON File (without target column)
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".csv,.json"
                onChange={handleFileChange}
                className="hidden"
                id="predict-file-upload"
                disabled={loading}
              />
              <label
                htmlFor="predict-file-upload"
                className="flex items-center justify-center gap-3 p-8 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-blue-400 transition-all bg-slate-800/50"
              >
                <FileText className="w-8 h-8 text-blue-400" />
                <div>
                  <span className="text-blue-400 font-semibold">Click to upload</span>
                  <span className="text-slate-400"> or drag and drop</span>
                </div>
              </label>
              {file && (
                <div className="mt-4 p-4 bg-slate-800 rounded-lg">
                  <p className="text-sm text-slate-300">
                    Selected: <span className="font-semibold text-white">{file.name}</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Upload progress */}
          {loading && (
            <div className="mb-4">
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  style={{ width: `${uploadProgress}%` }}
                  className="h-2 bg-blue-500 transition-all"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">Uploading: {uploadProgress}%</p>
            </div>
          )}

          {/* Predict Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePredict}
            disabled={!file || loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Generating Predictions...</span>
              </>
            ) : (
              <>
                <TrendingUp className="w-5 h-5" />
                <span>Generate Predictions</span>
              </>
            )}
          </motion.button>
            </div>
          </div>
        </div>

        {/* Results */}
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-8 bg-slate-900/70 backdrop-blur-md shadow-xl border border-slate-800"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-100">Prediction Results</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download CSV</span>
              </motion.button>
            </div>

            <div className="mb-4 text-sm text-slate-400">
              Showing {results?.data?.length ?? 0} of {results?.total_rows ?? 0} rows
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-slate-200">
                <thead>
                  <tr className="bg-slate-800/60">
                    {columns.map((key) => {
                      const predictedKey = results?.predictedColumn;
                      return (
                        <th
                          key={key}
                          className={`px-4 py-3 text-left text-sm font-semibold border-b border-slate-700 ${
                            key === predictedKey
                              ? "bg-green-900/20 text-green-300"
                              : "text-slate-300"
                          }`}
                        >
                          {key}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {(results?.data || []).map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-slate-800 hover:bg-slate-800/40"
                    >
                      {columns.map((colKey, valIdx) => {
                        const value = row[colKey];
                        return (
                          <td
                            key={valIdx}
                            className={`px-4 py-3 text-sm ${
                              colKey === results?.predictedColumn
                                ? "text-green-400 font-semibold"
                                : "text-slate-300"
                            }`}
                          >
                            {typeof value === "number"
                              ? Number(value).toFixed(4)
                              : String(value)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
  );
}

export default Predict;
