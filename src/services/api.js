import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getStocks = () => axios.get(`${API_URL}/stocks`);
export const addStock = (stock) => axios.post(`${API_URL}/stocks`, stock);
export const updateStock = (id, stock) => axios.put(`${API_URL}/stocks/${id}`, stock);
export const deleteStock = (id) => axios.delete(`${API_URL}/stocks/${id}`);
export const getMetrics = () => axios.get(`${API_URL}/portfolio/metrics`);
export const getDashboard = () => axios.get(`${API_URL}/stocks/dashboard`);
