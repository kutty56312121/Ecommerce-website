import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: apiBaseUrl,
});

api.interceptors.request.use((config) => {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('admin_token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});