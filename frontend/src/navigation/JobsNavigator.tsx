import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import EditProfile from '../screens/Profile/EditProfile';
import AboutScreen from '../screens/Profile/AboutPage';
import SecurityPrivacyScreen from '../screens/Profile/SettingsScreen';
import NotificationsScreen from '../screens/Profile/NotificationScreen';
import HelpCenterScreen from '../screens/Profile/HelpCenter';
import JobConnectScreen from 'src/screens/Job/JobConnectScreen';
import JobDetailsScreen from 'src/screens/Job/JobDetailsScreen';
import JobApplicationScreen from 'src/screens/Job/JobApplicationScreen';
// import PortfolioScreen from '../screens/Profile/PortfolioScreen';


export type JobsStackParamList = {
    JobsConnect: undefined;
    JobDetails: { job: any };
    JobApplication: { job: any };
};

const Stack = createStackNavigator<JobsStackParamList>();

export default function JobsNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="JobsConnect"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="JobsConnect" component={JobConnectScreen} />
            <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
            <Stack.Screen name="JobApplication" component={JobApplicationScreen} />
        </Stack.Navigator>
    );
}
