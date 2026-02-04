// const BASE_URL = 'http://10.0.2.2:5000/api'; // Use 10.0.2.2 for Android Emulator
const BASE_URL = 'http://192.168.18.8:5000/api'; // Use 10.0.2.2 for Android Emulator
// const BASE_URL = 'http://localhost:5000/api'; // Use localhost for iOS/Web

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: `${BASE_URL}/auth/login`,
        REGISTER: `${BASE_URL}/auth/register`,
        CHANGE_PASSWORD: `${BASE_URL}/auth/change-password`,
    },
    PORTFOLIO: `${BASE_URL}/portfolio`,
    JOBS: {
        GET_ALL: `${BASE_URL}/jobs`,
    },
    CHAT: `${BASE_URL}/chat`,
};

export default BASE_URL;