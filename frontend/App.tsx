import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';

import './global.css';
import MainApp from './src/screens/MainApp';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import PortfolioScreen from './src/screens/Dashboard/Actions/PortfolioScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { View } from 'react-native';
import { JobProvider } from 'src/context/JobContext';

// Define the root stack param list
export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  MainApp: undefined;
  MyPortfolio: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function Navigation() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F5F5F5' }
      }}
    >
      {!user ? (
        <>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      ) : (
        <>
          <Stack.Screen name="MainApp" component={MainApp} />
          <Stack.Screen name="MyPortfolio" component={PortfolioScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Navigation />
        </NavigationContainer>
      </JobProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5'
  }
})