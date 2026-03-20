import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, hp, wp } from 'components/utils';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { JobsStackParamList } from 'src/navigation/JobsNavigator';
import { useJobs } from 'src/context/JobContext';
import { useAuth } from 'src/context/AuthContext';
import { JobCard } from './components/JobCard';

type JobScreenNavigationProp = StackNavigationProp<JobsStackParamList>;

export default function AppliedJobsScreen() {
    const navigation = useNavigation<JobScreenNavigationProp>();
    const { jobs, loading, fetchJobs } = useJobs();
    const { user } = useAuth();

    const appliedJobs = useMemo(() => {
        if (!user) return [];
        return jobs.filter(job => job.applicants && job.applicants.includes(user.id));
    }, [jobs, user]);

    const renderJobItem = ({ item }: { item: any }) => (
        <JobCard
            item={item}
            onPress={() => navigation.navigate('JobDetails', { job: item })}
            onApply={() => navigation.navigate('JobDetails', { job: item })}
            hasApplied={true}
        />
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar style="light" backgroundColor={COLORS.primary} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <MaterialIcons name="arrow-back" size={24} color={COLORS.onPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Applied Jobs</Text>
                    <View style={{ width: 24 }} />
                </View>
            </View>

            {/* Content */}
            <FlatList
                data={appliedJobs}
                keyExtractor={(item) => item._id}
                renderItem={renderJobItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                onRefresh={fetchJobs}
                refreshing={loading}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <View style={styles.emptyIconContainer}>
                            <MaterialIcons name="assignment" size={48} color={COLORS.textSecondary} />
                        </View>
                        <Text style={styles.emptyText}>No applications yet</Text>
                        <Text style={styles.emptySubText}>
                            You haven't applied to any jobs yet. Browse available jobs to get started.
                        </Text>
                    </View>
                }
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
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.onPrimary,
    },
    listContent: {
        padding: wp(4),
        paddingBottom: hp(5),
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(10),
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
