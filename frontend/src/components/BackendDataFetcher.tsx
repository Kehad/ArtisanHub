import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useFetch } from '../hooks/useFetch';

interface BackendDataFetcherProps {
    endpoint: string;
    renderData: (data: any) => React.ReactNode;
    onDataFetched?: (data: any) => void;
}

/**
 * A reusable component to fetch data from the backend.
 * Handles loading, error, and displays the data using a render prop.
 */
const BackendDataFetcher: React.FC<BackendDataFetcherProps> = ({
    endpoint,
    renderData,
    onDataFetched
}) => {
    const { data, loading, error, fetchData } = useFetch<any>();

    useEffect(() => {
        const load = async () => {
            const result = await fetchData(endpoint);
            if (onDataFetched) onDataFetched(result);
        };
        load();
    }, [endpoint, fetchData, onDataFetched]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.text}>Fetching data...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={[styles.text, styles.errorText]}>Error: {error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={() => fetchData(endpoint)}>
                    <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!data) return null;

    return (
        <View style={styles.container}>
            {renderData(data)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        color: '#F44336',
        textAlign: 'center',
    },
    retryButton: {
        marginTop: 15,
        backgroundColor: '#4CAF50',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retryText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default BackendDataFetcher;
