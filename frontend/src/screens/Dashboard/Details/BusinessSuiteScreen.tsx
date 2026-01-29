import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, hp, wp } from 'components/utils';
import { StatusBar } from 'expo-status-bar';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function BusinessSuiteScreen({ navigation }: any) {

    const FeatureCard = ({ title, icon, color, onPress }: any) => (
        <TouchableOpacity style={[styles.featureCard, { borderLeftColor: color }]} onPress={onPress}>
            <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
                <MaterialIcons name={icon} size={28} color={color} />
            </View>
            <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{title}</Text>
                <Text style={styles.featureAction}>Tap to manage</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
        </TouchableOpacity>
    );

    const StatCard = ({ label, value, trend, trendUp }: any) => (
        <View style={styles.statCard}>
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={styles.statValue}>{value}</Text>
            <View style={styles.trendRow}>
                <MaterialIcons
                    name={trendUp ? "trending-up" : "trending-down"}
                    size={16}
                    color={trendUp ? COLORS.success : COLORS.error}
                />
                <Text style={[styles.trendText, { color: trendUp ? COLORS.success : COLORS.error }]}>
                    {trend}
                </Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar style="light" backgroundColor={COLORS.primary} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Business Suite</Text>
                <TouchableOpacity style={styles.btnIcon}>
                    <MaterialIcons name="settings" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Quick Stats */}
                <Text style={styles.sectionTitle}>Monthly Overview</Text>
                <View style={styles.statsContainer}>
                    <StatCard label="Invoiced" value="₦450k" trend="+12%" trendUp={true} />
                    <StatCard label="Expenses" value="₦85k" trend="-5%" trendUp={true} />
                </View>

                {/* Features List */}
                <Text style={styles.sectionTitle}>Tools</Text>

                <FeatureCard
                    title="Invoice Generator"
                    icon="receipt"
                    color={COLORS.primary}
                    onPress={() => console.log('Invoice')}
                />

                <FeatureCard
                    title="Expense Tracker"
                    icon="attach-money"
                    color={COLORS.error}
                    onPress={() => console.log('Expenses')}
                />

                <FeatureCard
                    title="Inventory Management"
                    icon="inventory"
                    color={COLORS.tertiary}
                    onPress={() => console.log('Inventory')}
                />

                <FeatureCard
                    title="Client CRM"
                    icon="contacts"
                    color={COLORS.secondary}
                    onPress={() => console.log('CRM')}
                />

                {/* Recent Activity */}
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                <View style={styles.activityCard}>
                    <ActivityItem
                        title="Invoice #0042 Paid"
                        subtitle="Mrs. Adebayo • Custom Bookshelf"
                        time="2 hrs ago"
                        amount="+₦150k"
                        isIncome
                    />
                    <View style={styles.divider} />
                    <ActivityItem
                        title="Material Purchase"
                        subtitle="Iron Rods x50"
                        time="Yesterday"
                        amount="-₦45k"
                        isIncome={false}
                    />
                </View>

                <View style={{ height: hp(5) }} />

            </ScrollView>
        </SafeAreaView>
    );
}

const ActivityItem = ({ title, subtitle, time, amount, isIncome }: any) => (
    <View style={styles.activityItem}>
        <View style={styles.activityIcon}>
            <MaterialIcons
                name={isIncome ? "arrow-downward" : "arrow-upward"}
                size={20}
                color={isIncome ? COLORS.success : COLORS.error}
            />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.actTitle}>{title}</Text>
            <Text style={styles.actSubtitle}>{subtitle}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
            <Text style={[styles.actAmount, { color: isIncome ? COLORS.success : COLORS.textPrimary }]}>
                {amount}
            </Text>
            <Text style={styles.actTime}>{time}</Text>
        </View>
    </View>
);

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
    btnIcon: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.onPrimary,
    },
    content: {
        padding: wp(4),
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: 16,
        marginTop: 8,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(3),
    },
    statCard: {
        backgroundColor: COLORS.surface,
        width: '48%',
        padding: 16,
        borderRadius: 16,
        elevation: 2,
    },
    statLabel: {
        color: COLORS.textSecondary,
        fontSize: 12,
        marginBottom: 4,
    },
    statValue: {
        color: COLORS.textPrimary,
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 4,
    },
    trendRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trendText: {
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
    },
    featureCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        elevation: 1,
        borderLeftWidth: 4,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    featureContent: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.textPrimary,
    },
    featureAction: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    activityCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    activityIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textPrimary,
    },
    actSubtitle: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    actAmount: {
        fontSize: 14,
        fontWeight: '700',
    },
    actTime: {
        fontSize: 10,
        color: COLORS.textSecondary,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: 8,
    }
});
