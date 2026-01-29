import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, hp, wp } from "components/utils";
import React, { JSX } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProfileHeader } from "components/Profile/ProfileHeader";
import { ProfileStats } from "components/Profile/ProfileStats";
import { MenuItem } from "components/Profile/MenuItem";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "../../navigation/ProfileNavigator";
import { useAuth } from "../../context/AuthContext";

export default function ProfileScreen(): JSX.Element {
    const navigation = useNavigation<StackNavigationProp<ProfileStackParamList>>();
    const { user, signOut } = useAuth();

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await signOut();
                            // Navigation is handled automatically by AuthContext/App.tsx
                        } catch (error) {
                            Alert.alert("Error", "Failed to log out. Please try again.");
                        }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Profile Header */}
                <ProfileHeader
                    name={user?.name || "Artisan"}
                    role={user?.role === 'artisan' ? "Master Artisan • Osun State" : "Client"}
                    imageUri={user?.pic}
                />

                {/* Stats Row */}
                <ProfileStats />

                {/* Menu Sections */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account Settings</Text>
                    <MenuItem
                        icon="person-outline"
                        label="Personal Information"
                        onPress={() => navigation.navigate('PersonalInfo')}
                    />
                    {/* <MenuItem
                        icon="person"
                        label="My Portfolio"
                        onPress={() => navigation.navigate('PortfolioScreen')}
                    /> */}
                    <MenuItem
                        icon="notifications-none"
                        label="Notifications"
                        badge="2"
                        onPress={() => navigation.navigate('Notifications')}
                    />
                    <MenuItem
                        icon="lock-outline"
                        label="Security & Privacy"
                        onPress={() => navigation.navigate('SecurityPrivacy')}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>App Settings</Text>
                    <MenuItem icon="language" label="Language" value="English" />
                    <MenuItem icon="dark-mode" label="Dark Mode" isSwitch />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Support</Text>
                    <MenuItem
                        icon="help-outline"
                        label="Help Center"
                        onPress={() => navigation.navigate('HelpCenter')}
                    />
                    <MenuItem
                        icon="info-outline"
                        label="About ArtisanHub"
                        onPress={() => navigation.navigate('About')}
                    />
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <MaterialIcons name="logout" size={20} color={COLORS.error} />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

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
    scrollContent: {
        paddingHorizontal: wp(4),
        paddingVertical: hp(2),
    },
    section: {
        marginBottom: hp(3),
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: hp(1.5),
        marginLeft: wp(2),
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFEBEE', // Light Red
        padding: hp(2),
        borderRadius: wp(3),
        marginTop: hp(1),
    },
    logoutText: {
        color: COLORS.error,
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    }
});
