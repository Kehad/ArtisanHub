import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Ensure this is imported correctly
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS, hp, wp } from 'components/utils';
import { StatusBar } from 'expo-status-bar';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Job } from 'src/context/JobContext';

import { StackNavigationProp } from '@react-navigation/stack';
import { JobsStackParamList } from 'src/navigation/JobsNavigator';

type JobDetailsRouteProp = RouteProp<JobsStackParamList, 'JobDetails'>;
type JobDetailsNavigationProp = StackNavigationProp<JobsStackParamList, 'JobDetails'>;

export default function JobDetailsScreen() {
    const navigation = useNavigation<JobDetailsNavigationProp>();
    const route = useRoute<JobDetailsRouteProp>();
    const { job } = route.params;

    const handleApply = () => {
        // Placeholder for application logic
        console.log("Applying to job:", job._id);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar style="light" backgroundColor={COLORS.primary} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Job Details</Text>
                <TouchableOpacity style={styles.shareButton}>
                    <MaterialIcons name="share" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Title & Status */}
                <View style={styles.mainInfo}>
                    <Text style={styles.jobTitle}>{job.title}</Text>
                    <View style={styles.statusRow}>
                        <View style={[styles.statusBadge, job.urgent ? styles.urgentBadge : styles.normalBadge]}>
                            <Text style={[styles.statusText, job.urgent ? styles.urgentText : styles.normalText]}>
                                {job.urgent ? 'URGENT' : 'NORMAL'}
                            </Text>
                        </View>
                        <Text style={styles.postedDate}>{job.posted}</Text>
                    </View>
                </View>

                {/* Info Cards */}
                <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                        <View style={styles.iconContainer}>
                            <FontAwesome5 name="money-bill-wave" size={20} color={COLORS.primary} />
                        </View>
                        <Text style={styles.statLabel}>Budget</Text>
                        <Text style={styles.statValue}>₦{job.budget?.toLocaleString()}</Text>
                    </View>
                    <View style={styles.statCard}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons name="location-pin" size={24} color={COLORS.primary} />
                        </View>
                        <Text style={styles.statLabel}>Location</Text>
                        <Text style={styles.statValue}>{job.location}</Text>
                    </View>
                </View>

                {/* Client Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Client</Text>
                    <View style={styles.clientCard}>
                        <View style={styles.clientAvatar}>
                            <Text style={styles.clientInitials}>{job.client?.charAt(0)}</Text>
                        </View>
                        <View>
                            <Text style={styles.clientName}>{job.client}</Text>
                            <Text style={styles.clientRating}>⭐ 4.8 (12 jobs posted)</Text>
                        </View>
                    </View>
                </View>

                {/* Description */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>
                        {job.description || "No description provided for this job. Please contact the client for more details."}
                    </Text>
                </View>

                {/* Tags */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Skills Required</Text>
                    <View style={styles.tagsContainer}>
                        {job.tags.map((tag: string, index: number) => (
                            <View key={index} style={styles.tag}>
                                <Text style={styles.tagText}>{tag}</Text>
                            </View>
                        ))}
                    </View>
                </View>

            </ScrollView>

            {/* Bottom Action Bar */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.applyButton} onPress={() => navigation.navigate('JobApplication', { job })}>
                    <Text style={styles.applyButtonText}>Apply Now</Text>
                    <MaterialIcons name="arrow-forward" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(4),
        paddingVertical: hp(2),
        backgroundColor: COLORS.primary,
    },
    backButton: {
        padding: 8,
    },
    shareButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
    },
    content: {
        padding: wp(5),
    },
    mainInfo: {
        marginBottom: 24,
    },
    jobTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: 12,
        lineHeight: 32,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    urgentBadge: {
        backgroundColor: '#FFEBEE',
    },
    normalBadge: {
        backgroundColor: '#E8F5E9',
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    urgentText: {
        color: COLORS.error,
    },
    normalText: {
        color: COLORS.success,
    },
    postedDate: {
        color: COLORS.textSecondary,
        fontSize: 14,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 32,
    },
    statCard: {
        flex: 1,
        backgroundColor: COLORS.surface,
        padding: 16,
        borderRadius: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    statLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginBottom: 4,
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: 16,
    },
    clientCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        padding: 16,
        borderRadius: 16,
    },
    clientAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    clientInitials: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    clientName: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.textPrimary,
    },
    clientRating: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginTop: 4,
    },
    descriptionText: {
        fontSize: 16,
        color: COLORS.textPrimary,
        lineHeight: 24,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        backgroundColor: COLORS.surface,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    tagText: {
        color: COLORS.textSecondary,
        fontSize: 14,
    },
    footer: {
        padding: 20,
        backgroundColor: COLORS.surface,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    applyButton: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    applyButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
    },
});
