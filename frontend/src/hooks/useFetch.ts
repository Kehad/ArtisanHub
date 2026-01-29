import { useState, useCallback } from 'react';
import apiService from '../services/apiService';

interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export const useFetch = <T,>() => {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const fetchData = useCallback(async (url: string, config = {}) => {
        setState({ data: null, loading: true, error: null });
        try {
            const data = await apiService.get<T>(url, config);
            setState({ data, loading: false, error: null });
            return data;
        } catch (err: any) {
            const errorMessage = err.message || 'Something went wrong';
            setState({ data: null, loading: false, error: errorMessage });
            throw err;
        }
    }, []);

    return { ...state, fetchData };
};

// const { data, loading, error, fetchData } = useFetch();

// useEffect(() => {
//     fetchData(API_ENDPOINTS.PORTFOLIO);
// }, []);