import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

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
