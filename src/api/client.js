import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const client = axios.create({
  baseURL: `${API_BASE}/api`,
  withCredentials: false
});

// Attach token from localStorage
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("chat_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
