import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export const register = (userData) => api.post('/register', userData);
export const login = (credentials) => api.post('/login', credentials);
export const logout = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return api.post('/logout');
};
