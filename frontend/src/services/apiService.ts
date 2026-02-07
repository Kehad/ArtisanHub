import apiClient from '../api/apiClient';

/**
 * A utility to handle API requests consistently with error management.
 */
export const handleRequest = async <T>(request: Promise<any>): Promise<T> => {
    try {
        // console.log(request)
        // console.log('request')
        const response = await request;
        // console.log(response);
        return response.data;
    } catch (error: any) {
        console.error('API Request Error:', error.response?.data || error.message);
        console.log('error response data', error.response?.data)
        console.log('error message', error?.message)

        const errorMessage =
            error.response?.data?.message ||  // 1. Check for specific backend message text (Best)
            error.response?.data ||           // 2. Check for raw data (Only if it's a plain string)
            error.message ||                  // 3. Check for Network/Browser error
            'An unexpected error occurred';   // 4. Fallback
        console.log('error message', errorMessage)
        throw new Error(errorMessage);
    }
};

/**
 * Reusable API service functions
 */
export const apiService = {
    get: <T>(url: string, config?: any) =>
        handleRequest<T>(apiClient.get(url, config)),

    post: <T>(url: string, data?: any, config?: any) =>
        handleRequest<T>(apiClient.post(url, data, config)),

    put: <T>(url: string, data?: any, config?: any) =>
        handleRequest<T>(apiClient.put(url, data, config)),

    delete: <T>(url: string, config?: any) =>
        handleRequest<T>(apiClient.delete(url, config)),

    patch: <T>(url: string, data?: any, config?: any) =>
        handleRequest<T>(apiClient.patch(url, data, config)),
};

export default apiService;

// import apiService from '../services/apiService';
// import { API_ENDPOINTS } from '../api/config';

// const handleSignUp = async (userData) => {
//     try {
//         const result = await apiService.post(API_ENDPOINTS.AUTH.REGISTER, userData);
//         alert('Success!');
//     } catch (err) {
//         alert(err.message); // Automatically simplified error message
//     }
// };

