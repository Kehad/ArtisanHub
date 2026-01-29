import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import BackendDataFetcher from '../../components/BackendDataFetcher';
import { API_ENDPOINTS } from '../../api/config';

interface PortfolioItem {
    _id: string;
    title: string;
    description: string;
}

const PortfolioListScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Portfolio</Text>

            <BackendDataFetcher
                endpoint={API_ENDPOINTS.PORTFOLIO}
                renderData={(data: PortfolioItem[]) => (
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <View style={styles.itemCard}>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <Text style={styles.itemDesc}>{item.description}</Text>
                            </View>
                        )}
                        contentContainerStyle={styles.list}
                        ListEmptyComponent={<Text style={styles.empty}>No portfolio items found.</Text>}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    list: {
        paddingBottom: 20,
    },
    itemCard: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#4CAF50',
    },
    itemDesc: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    empty: {
        textAlign: 'center',
        marginTop: 50,
        color: '#999',
    }
});

export default PortfolioListScreen;
