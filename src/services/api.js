import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Authorization Header:', config.headers['Authorization']);
    } else {
      console.warn('Token is missing.');
    }
    return config;
  }
);


export const getStocks = () => apiClient.get('/stocks');
export const addStock = (stock) => apiClient.post('/stocks', stock);
export const updateStock = (id, stock) => apiClient.put(`/stocks/${id}`, stock);
export const deleteStock = (id) => apiClient.delete(`/stocks/${id}`);
export const getMetrics = () => apiClient.get('/stocks/portfolio-value');
export const getDashboard = () => apiClient.get('/stocks/dashboard');
