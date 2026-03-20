import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, Route } from '@react-navigation/native';
import { BottomNavBar, TabType } from '../../components/BottomNavBar';
import DashboardNavigator from './DashboardNavigator';
import AnalyticsScreen from '../screens/Analytics/AnalyticsScreen';
import ChatNavigator from './ChatNavigator';
import ProfileNavigator from './ProfileNavigator';
import JobsNavigator from './JobsNavigator';

const Tab = createBottomTabNavigator();

interface TabNavigatorProps {
    onFabPress: () => void;
}

export default function TabNavigator({ onFabPress }: TabNavigatorProps) {

    const shouldHideTabBar = (route: Partial<Route<string>>) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        // List of screens where the tab bar should be hidden
        const hiddenScreens = [
            'ChatDetail',
            'DigitalTools',
            'TechSkills',
            'BusinessSuite',
            'JobConnect',
            'PersonalInfo',
            'SecurityPrivacy',
            'Notifications',
            'About',
            'EditProfile',
            'PortfolioScreen',
            'JobDetails',
            'JobApplication',
            'AIUsage'
        ];

        // If routeName is undefined, we are at the root of the navigator (e.g., ChatList), so don't hide.
        if (!routeName) return false;

        return hiddenScreens.includes(routeName);
    };

    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={(props) => {
                const { state, navigation } = props;
                const currentRoute = state.routes[state.index];
                const currentRouteName = state.routeNames[state.index];

                if (shouldHideTabBar(currentRoute)) {
                    return null;
                }

                let activeTab: TabType = 'dashboard';

                switch (currentRouteName) {
                    case 'Dashboard': activeTab = 'dashboard'; break;
                    case 'Jobs': activeTab = 'jobs'; break;
                    case 'Chat': activeTab = 'chat'; break;
                    case 'Profile': activeTab = 'profile'; break;
                }

                const handleTabPress = (tab: TabType) => {
                    let routeName = 'Dashboard';
                    switch (tab) {
                        case 'dashboard': routeName = 'Dashboard'; break;
                        case 'jobs': routeName = 'Jobs'; break;
                        case 'chat': routeName = 'Chat'; break;
                        case 'profile': routeName = 'Profile'; break;
                    }
                    navigation.navigate(routeName);
                };

                return (
                    <BottomNavBar
                        activeTab={activeTab}
                        onTabPress={handleTabPress}
                        onFabPress={onFabPress}
                    />
                );
            }}
        >
            <Tab.Screen name="Dashboard" component={DashboardNavigator} />
            <Tab.Screen name="Jobs" component={JobsNavigator} />
            <Tab.Screen name="Chat" component={ChatNavigator} />
            <Tab.Screen name="Profile" component={ProfileNavigator} />
        </Tab.Navigator>
    );
}
