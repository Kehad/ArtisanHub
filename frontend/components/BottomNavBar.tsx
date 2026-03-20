import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { COLORS, wp } from "./utils";

export type TabType = 'dashboard' | 'jobs' | 'chat' | 'profile';

interface BottomNavBarProps {
    activeTab: TabType;
    onTabPress: (tab: TabType) => void;
    onFabPress: () => void;
}

const TabItem = ({ name, icon, active, onPress }: { name: string, icon: any, active: boolean, onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} style={styles.tabItem}>
        <MaterialIcons name={icon} size={24} color={active ? COLORS.primary : "#9E9E9E"} />
        <Text style={[styles.tabLabel, { color: active ? COLORS.primary : "#9E9E9E" }]}>{name}</Text>
    </TouchableOpacity>
);

export const BottomNavBar = ({ activeTab, onTabPress, onFabPress }: BottomNavBarProps) => {

    return (
        <>
            <TouchableOpacity
                style={styles.fab}
                onPress={onFabPress}
                activeOpacity={0.8}
            >
                <MaterialIcons name="add" size={32} color="white" />
            </TouchableOpacity>

            <View style={styles.bottomBar}>
                <TabItem
                    name="Home"
                    icon="dashboard"
                    active={activeTab === 'dashboard'}
                    onPress={() => onTabPress('dashboard')}
                />

                <TabItem
                    name="Jobs"
                    icon="business-center"
                    active={activeTab === 'jobs'}
                    onPress={() => onTabPress('jobs')}
                />

                <View style={{ width: wp(12) }} />

                <TabItem
                    name="Chat"
                    icon="chat-bubble-outline"
                    active={activeTab === 'chat'}
                    onPress={() => onTabPress('chat')}
                />

                <TabItem
                    name="Profile"
                    icon="person-outline"
                    active={activeTab === 'profile'}
                    onPress={() => onTabPress('profile')}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70, // Increased height for labels
        backgroundColor: COLORS.surface,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 8,
        paddingTop: 8,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
        borderTopWidth: 0, // Remove border for cleaner shadow look
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
        minWidth: 60,
    },
    tabLabel: {
        fontSize: 10,
        marginTop: 4,
        fontWeight: '500',
    },
    fab: {
        position: 'absolute',
        bottom: 35, // Adjusted to float above the bar
        alignSelf: 'center',
        backgroundColor: COLORS.primary,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        zIndex: 10,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        borderWidth: 4,
        borderColor: COLORS.background, // Creates a cutout effect
    },
});
