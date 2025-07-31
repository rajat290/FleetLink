import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Updated base URL to include /api prefix
});
// api.interceptors.request.use(
//   (config) => {
//     // You can add any request interceptors here, like adding auth tokens
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
export default api;
