import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import DigitalToolsScreen from '../screens/Dashboard/Details/DigitalToolsScreen';
import TechSkillsScreen from '../screens/TechSkills/TechSkillsScreen';
import BusinessSuiteScreen from '../screens/Dashboard/Details/BusinessSuiteScreen';
import JobConnectScreen from '../screens/Job/JobConnectScreen';
import AnalyticsScreen from 'src/screens/Analytics/AnalyticsScreen';

import AIUsageScreen from '../screens/AIUsage/AIUsageScreen';

export type DashboardStackParamList = {
    DashboardMain: undefined;
    DigitalTools: undefined; // Was ActiveCrops
    TechSkills: undefined; // Was Irrigation
    BusinessSuite: undefined; // Was Tasks
    Analtyics: undefined; // Was AIRecommendations
    AIUsage: undefined;
};

const Stack = createStackNavigator<DashboardStackParamList>();

export default function DashboardNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="DashboardMain"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="DashboardMain" component={DashboardScreen} />
            <Stack.Screen name="DigitalTools" component={DigitalToolsScreen} />
            <Stack.Screen name="TechSkills" component={TechSkillsScreen} />
            <Stack.Screen name="BusinessSuite" component={BusinessSuiteScreen} />
            <Stack.Screen name="Analtyics" component={AnalyticsScreen} />
            <Stack.Screen name="AIUsage" component={AIUsageScreen} />
        </Stack.Navigator>
    );
}
