import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from './config';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token
apiClient.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('userToken');
        console.log('apiClient', token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors globally
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access (e.g., redirect to login or clear token)
            await AsyncStorage.removeItem('userToken');
            // You might want to trigger a logout action here
        }
        return Promise.reject(error);
    }
);

export default apiClient;
