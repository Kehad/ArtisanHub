import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../services/apiService';
import { API_ENDPOINTS } from '../api/config';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    signIn: (credentials: any) => Promise<void>;
    signUp: (userData: any) => Promise<void>;
    signOut: () => Promise<void>;
    changePassword: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    // const jsonValue = AsyncStorage.getItem('userData');
    // console.log(jsonValue);

    useEffect(() => {
        // Load stored auth data on app start
        const loadStoredAuth = async () => {
            try {
                // const storedUser = await AsyncStorage.removeItem('userData');
                // const storedToken = await AsyncStorage.removeItem('userToken');
                const storedToken = await AsyncStorage.getItem('userToken');
                const storedUser = await AsyncStorage.getItem('userData');
                console.log(storedToken, storedUser);

                if (storedToken && storedUser) {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));
                }
            } catch (e) {
                console.error('Failed to load auth data', e);
            } finally {
                setLoading(false);
            }
        };

        loadStoredAuth();
    }, []);

    const signIn = async (credentials: any) => {
        const response: any = await apiService.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
        console.log(response);
        const { token: newToken, user: newUser } = response;

        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');
        // await AsyncStorage.setItem('userToken', newToken);
        // await AsyncStorage.setItem('userData', JSON.stringify(newUser));

        setToken(newToken);
        setUser(newUser);
    };

    const signUp = async (userData: any) => {
        try {
            console.log('Registering user with:', userData);
            console.log('Endpoint:', API_ENDPOINTS.AUTH.REGISTER);

            const response: any = await apiService.post(API_ENDPOINTS.AUTH.REGISTER, userData);
            console.log('SignUp Success Response:', response);

            const { token: newToken, user: newUser } = response;

            if (newToken && newUser) {
                await AsyncStorage.setItem('userToken', newToken);
                await AsyncStorage.setItem('userData', JSON.stringify(newUser));

                setToken(newToken);
                setUser(newUser);
            } else {
                console.error("SignUp response missing token or user", response);
                throw new Error("Invalid response from server");
            }
        } catch (error: any) {
            console.error("SignUp Failed:", error);
            throw error; // Re-throw to be caught by the UI
        }
    };

    const signOut = async () => {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');
        setToken(null);
        setUser(null);
    };

    const changePassword = async (data: any) => {
        try {
            const response: any = await apiService.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
            // const { token: newToken, user: newUser } = response;
            console.log('Change Password Success Response:', response);
            
        } catch (error: any) {
            console.error("Change Password Failed:", error);
            throw error; // Re-throw to be caught by the UI
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, signIn, signUp, signOut, changePassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
