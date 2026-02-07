import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, hp, wp } from 'components/utils';
import { StatusBar } from 'expo-status-bar';
import { useJobConnect } from './hooks/useJobConnect';
import { JobCard } from './components/JobCard';
import { JobFilterModal } from './components/JobFilterModal';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { JobsStackParamList } from 'src/navigation/JobsNavigator';
import { useAuth } from 'src/context/AuthContext';

type JobScreenNavigationProp = StackNavigationProp<JobsStackParamList, 'JobsConnect'>;

export default function JobConnectScreen() {
    const navigation = useNavigation<JobScreenNavigationProp>();
    const { user } = useAuth();

    const {
        jobs,
        selectedCategory,
        setSelectedCategory,
        filterModalVisible,
        setFilterModalVisible,
        handleApply,
        handleRefresh,
        loading,
        searchQuery,
        setSearchQuery,
        FILTER_CATEGORIES
    } = useJobConnect();

    const renderJobItem = ({ item }: { item: any }) => (
        <JobCard
            item={item}
            onPress={() => navigation.navigate('JobDetails', { job: item })}
            onApply={() => navigation.navigate('JobDetails', { job: item })}
            hasApplied={item.applicants && user ? item.applicants.includes(user.id) : false}
        />
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar style="light" backgroundColor={COLORS.primary} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.headerTitle}>Job Connect</Text>
                    <View style={styles.headerActions}>
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => navigation.navigate('AppliedJobs')}
                        >
                            <MaterialIcons name="assignment" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <MaterialIcons name="notifications-none" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <MaterialIcons name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search jobs, skills, or clients..."
                        placeholderTextColor={COLORS.textSecondary}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity style={styles.filterButton} onPress={() => setFilterModalVisible(true)}>
                        <MaterialIcons name="filter-list" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Stats / Info */}
            <View style={styles.statsBar}>
                <Text style={styles.statsText}>
                    Found {jobs.length} {selectedCategory !== 'All' ? selectedCategory : 'active'} jobs
                </Text>
                {selectedCategory !== 'All' && (
                    <TouchableOpacity onPress={() => setSelectedCategory('All')}>
                        <Text style={styles.clearFilterText}>Clear Filter</Text>
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                data={jobs}
                keyExtractor={(item) => item._id}
                renderItem={renderJobItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                onRefresh={handleRefresh}
                refreshing={loading}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <View style={styles.emptyIconContainer}>
                            <MaterialIcons name="work-outline" size={48} color={COLORS.textSecondary} />
                        </View>
                        <Text style={styles.emptyText}>No jobs found</Text>
                        <Text style={styles.emptySubText}>
                            Try adjusting your filters or search query to find more opportunities.
                        </Text>
                    </View>
                }
            />

            <JobFilterModal
                visible={filterModalVisible}
                onClose={() => setFilterModalVisible(false)}
                categories={FILTER_CATEGORIES}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        paddingHorizontal: wp(5),
        paddingVertical: hp(2),
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: COLORS.onPrimary,
        letterSpacing: 0.5,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        marginLeft: 8,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 8, // Reduced padding for better height
        height: 50,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: COLORS.textPrimary,
        height: '100%',
    },
    filterButton: {
        backgroundColor: COLORS.primary,
        padding: 8,
        borderRadius: 10,
        marginLeft: 8,
    },
    statsBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: wp(5),
    },
    statsText: {
        color: COLORS.textSecondary,
        fontWeight: '600',
        fontSize: 14,
    },
    clearFilterText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 12,
    },
    listContent: {
        padding: wp(4),
        paddingBottom: hp(10), // Extra padding for bottom tab
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(8),
        paddingHorizontal: 32,
    },
    emptyIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        elevation: 2,
    },
    emptyText: {
        color: COLORS.textPrimary,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    emptySubText: {
        color: COLORS.textSecondary,
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    }
});
