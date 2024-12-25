// import axios from 'axios';

// const API_URL = process.env.REACT_APP_AUTH_URL;

// export const signup = async (userData) => {
//   try {
//     const response = await axios.post(`${API_URL}/signup`, userData, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     console.log('Signup successful:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error during signup:', error.response?.data || error.message);
//     throw error.response?.data || error.message;
//   }
// };

// export const login = async (userData) => {
//   try {
//     const response = await axios.post(`${API_URL}/login`, userData, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     const { token } = response.data;
//     localStorage.setItem('authToken', token);
//     console.log('Login successful:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error during login:', error.response?.data || error.message);
//     throw error.response?.data || error.message;
//   }
// };

// export const logout = () => {
//   localStorage.removeItem('authToken');
//   console.log('User logged out.');
// };

import axios from 'axios';

const API_URL = process.env.REACT_APP_AUTH_URL;

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Signup successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error during signup:', error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Login successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error during login:', error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};