// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL;

// const apiClient = axios.create({
//   baseURL: API_URL,
// });

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("authToken");

//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     } else {
//       console.warn('No auth token found, please log in.');
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export const getStocks = () => apiClient.get('/stocks');
// export const addStock = (stock) => apiClient.post('/stocks', stock);
// export const updateStock = (id, stock) => apiClient.put(`/stocks/${id}`, stock);
// export const deleteStock = (id) => apiClient.delete(`/stocks/${id}`);
// export const getPortfolioMetrics = () => apiClient.get('/stocks/portfolio-value');
// export const getDashboard = () => apiClient.get('/stocks/dashboard');


import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      config.headers['X-User-Id'] = userId;
    } else {
      console.warn('User ID is missing. Ensure the user is authenticated.');
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getStocks = () => apiClient.get('/stocks');
export const addStock = (stock) => apiClient.post('/stocks', stock);
export const updateStock = (id, stock) => apiClient.put(`/stocks/${id}`, stock);
export const deleteStock = (id) => apiClient.delete(`/stocks/${id}`);
export const getMetrics = () => apiClient.get('/portfolio/metrics');
export const getDashboard = () => apiClient.get('/stocks/dashboard');