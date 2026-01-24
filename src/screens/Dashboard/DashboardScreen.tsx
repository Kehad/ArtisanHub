import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, hp, wp } from "components/utils";
import { FarmSummaryCardWidget } from "components/weatherDetail";
import React, { JSX, useCallback, useState } from "react";
import { Alert, StyleSheet, Text, View, RefreshControl, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DashboardStackParamList } from "../../navigation/DashboardNavigator";

interface ArtisanDataItem {
    id: number;
    title: string;
    icon: string;
    value: string;
    statusColor: string;
    subtitle: string;
    details: string;
    actionLabel: string;
    hasToggle?: boolean;
    toggleValue?: boolean;
    hasBadge?: boolean;
    badgeCount?: number;
    screen?: keyof DashboardStackParamList;
}

export default function DashboardScreen(): JSX.Element {
    const navigation = useNavigation<StackNavigationProp<DashboardStackParamList>>();
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());

    const [artisanData, setArtisanData] = useState<ArtisanDataItem[]>([
        {
            id: 1,
            title: "Digital Tools",
            icon: "handyman",
            value: "12 Tools",
            statusColor: "#0EA5E9",
            subtitle: "For Carpenters & Welders",
            details: "Access blueprints and calculation tools",
            actionLabel: "Explore Tools",
            screen: "DigitalTools",
        },
        {
            id: 2,
            title: "Skills Training",
            icon: "school",
            value: "3 Courses",
            statusColor: "#8B5CF6",
            subtitle: "Modern Techniques",
            details: "Enrolled: Advanced Woodworking",
            actionLabel: "Continue Learning",
            hasToggle: false,
            screen: "SkillsTraining",
        },
        {
            id: 3,
            title: "Business Suite",
            icon: "store",
            value: "Growth",
            statusColor: "#10B981",
            subtitle: "Invoicing & Inventory",
            details: "Manage your shop efficiently",
            actionLabel: "Manage Business",
            screen: "BusinessSuite",
        },
        {
            id: 4,
            title: "Job Connect",
            icon: "work",
            value: "5 Leads",
            statusColor: "#EA580C",
            subtitle: "New Opportunities",
            details: "Local clients looking for services",
            actionLabel: "View Leads",
            screen: "JobConnect",
        },
    ]);

    const onRefresh = useCallback(async (): Promise<void> => {
        setRefreshing(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLastSyncTime(new Date());
        setRefreshing(false);
    }, []);

    const getTimeAgo = (date: Date): string => {
        const diff = (new Date().getTime() - date.getTime()) / 1000 / 60; // minutes
        if (diff < 1) return 'Just now';
        if (diff < 60) return `${Math.floor(diff)}m ago`;
        return 'Recently';
    };

    const toggleSwitch = (id: number, newValue: boolean): void => {
        setArtisanData(prev =>
            prev.map(item => item.id === id ? { ...item, toggleValue: newValue } : item)
        );
    };

    const handleLongPress = (item: ArtisanDataItem): void => {
        Alert.alert(
            "Options",
            `Manage ${item.title}`,
            [
                { text: "Share Resource", onPress: () => console.log("Share") },
                { text: "Save for offline", onPress: () => console.log("Save") },
                { text: "Cancel", style: "cancel" }
            ]
        );
    };

    const handleItemPress = (item: ArtisanDataItem) => {
        if (item.screen) {
            navigation.navigate(item.screen as any);
        } else {
            console.log(`Tapped ${item.title}`);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.primary} />

            {/* Header Section */}
            <View style={styles.headerContainer}>
                <View>
                    <Text style={styles.headerTitle}>Osun Artisan Hub</Text>
                    <Text style={styles.headerSubtitle}>Empowering Local Talent</Text>
                </View>
                <View style={styles.headerIcons}>
                    <MaterialIcons name="notifications" size={20} color={COLORS.onPrimary} style={{ marginRight: 15 }} />
                    <MaterialIcons name="search" size={20} color={COLORS.onPrimary} />
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />
                }
            >
                {/* Replaced Weather Card with Welcome/Intro Card logic if needed, or just removed */}
                {/* For now, let's put a simple welcome text area or keep it clean */}
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeTitle}>Welcome back, Master Artisan</Text>
                    <Text style={styles.welcomeSubtitle}>Enhance your craft with digital tools.</Text>
                </View>

                <Text style={styles.sectionTitle}>Your Toolkit</Text>

                {artisanData.map((item) => (
                    <FarmSummaryCardWidget
                        key={item.id}
                        data={item}
                        onTap={() => handleItemPress(item)}
                        onLongPress={() => handleLongPress(item)}
                        onToggleChanged={item.hasToggle ? (val: boolean) => toggleSwitch(item.id, val) : null}
                        navigateTo={item.screen}
                    />
                ))}

                <View style={{ height: hp(10) }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    headerContainer: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: wp(4),
        paddingBottom: hp(2),
        paddingTop: Platform.OS === 'android' ? hp(2) : 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    headerTitle: {
        color: COLORS.onPrimary,
        fontSize: 20,
        fontWeight: '700',
    },
    headerSubtitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        marginTop: 4,
    },
    headerIcons: {
        flexDirection: 'row',
    },
    scrollContent: {
        paddingHorizontal: wp(4),
        paddingVertical: hp(2),
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginTop: hp(2),
        marginBottom: hp(1),
    },
    welcomeContainer: {
        marginBottom: hp(2),
        padding: wp(4),
        backgroundColor: COLORS.surface,
        borderRadius: wp(3),
        borderLeftWidth: 4,
        borderLeftColor: COLORS.primary,
        elevation: 2,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    welcomeTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    welcomeSubtitle: {
        fontSize: 14,
        color: COLORS.textSecondary,
        lineHeight: 20,
    }
});
