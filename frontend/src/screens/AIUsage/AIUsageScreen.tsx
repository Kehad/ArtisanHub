import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, hp, wp } from 'components/utils';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DashboardStackParamList } from 'src/navigation/DashboardNavigator';

const { width } = Dimensions.get('window');

type AIUsageScreenNavigationProp = StackNavigationProp<DashboardStackParamList, 'AIUsage'>;

export default function AIUsageScreen() {
    const navigation = useNavigation<AIUsageScreenNavigationProp>();

    // Mock Data for AI Stats
    const stats = [
        { label: 'Total Interactions', value: '1,245', icon: 'chat-bubble-outline', color: '#0EA5E9' },
        { label: 'Tokens Saved', value: '45K', icon: 'memory', color: '#8B5CF6' },
        { label: 'Efficiency Boost', value: '+35%', icon: 'trending-up', color: '#10B981' },
    ];

    // Mock Data for AI Tools
    const tools = [
        {
            id: '1',
            title: 'Smart Assistant',
            description: 'Ask questions about farming, weather, and more.',
            icon: 'smart-toy',
            color: '#0EA5E9',
            screen: 'Chat' as any, // Linking to Chat for now
        },
        {
            id: '2',
            title: 'Crop Diagnosis',
            description: 'Upload photos to detect diseases instantly.',
            icon: 'camera-alt',
            color: '#F59E0B',
            action: () => alert('Crop Diagnosis Camera coming soon!'),
        },
        {
            id: '3',
            title: 'Market Insights',
            description: 'AI-driven predictions for market prices.',
            icon: 'insert-chart-outlined',
            color: '#EF4444',
            action: () => alert('Market Insights feature coming soon!'),
        },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>AI Usage</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Intro Section */}
                <View style={styles.introSection}>
                    <Text style={styles.greeting}>Your AI Hub</Text>
                    <Text style={styles.subGreeting}>Track usage and access intelligent tools.</Text>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <View key={index} style={styles.statCard}>
                            <View style={[styles.statIconContainer, { backgroundColor: stat.color + '20' }]}>
                                <MaterialIcons name={stat.icon as any} size={24} color={stat.color} />
                            </View>
                            <Text style={styles.statValue}>{stat.value}</Text>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                        </View>
                    ))}
                </View>

                {/* AI Tools Section */}
                <Text style={styles.sectionTitle}>Available Tools</Text>
                <View style={styles.toolsContainer}>
                    {tools.map((tool) => (
                        <TouchableOpacity
                            key={tool.id}
                            style={styles.toolCard}
                            onPress={() => tool.screen ? navigation.navigate(tool.screen) : tool.action && tool.action()}
                        >
                            <View style={[styles.toolIcon, { backgroundColor: tool.color }]}>
                                <MaterialIcons name={tool.icon as any} size={24} color="white" />
                            </View>
                            <View style={styles.toolContent}>
                                <Text style={styles.toolTitle}>{tool.title}</Text>
                                <Text style={styles.toolDesc}>{tool.description}</Text>
                            </View>
                            <MaterialIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={{ height: hp(5) }} />
            </ScrollView>
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
        backgroundColor: COLORS.background,
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    scrollContent: {
        paddingHorizontal: wp(4),
    },
    introSection: {
        marginBottom: hp(3),
        marginTop: hp(1),
    },
    greeting: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: 8,
    },
    subGreeting: {
        fontSize: 16,
        color: COLORS.textSecondary,
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: hp(4),
    },
    statCard: {
        width: (width - wp(8) - 20) / 3, // 3 columns
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 12, // reduced padding for fitting
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    statIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 10, // smaller font for labels to fit
        color: COLORS.textSecondary,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: hp(2),
    },
    toolsContainer: {
        gap: 16,
    },
    toolCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        padding: 16,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    toolIcon: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    toolContent: {
        flex: 1,
    },
    toolTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    toolDesc: {
        fontSize: 12,
        color: COLORS.textSecondary,
        lineHeight: 18,
    },
});
