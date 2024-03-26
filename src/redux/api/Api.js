// src/api.js

import axios from 'axios';

const baseURL = 'https://shopninja.in/anurag/caross/api/user/'; // Replace with your actual API base URL

const api = axios.create({
  baseURL,
});

const apiEndpoints = {
  get: (url) => api.get(url),
  post: (url, data) => api.post(url, data),
  put: (url, data) => api.put(url, data),
  delete: (url) => api.delete(url),
};

export default apiEndpoints;