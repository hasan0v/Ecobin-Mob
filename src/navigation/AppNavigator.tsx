import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { colors } from '../theme';

// Auth Screens
import { SplashScreen } from '../screens/auth/SplashScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { OnboardingScreen } from '../screens/auth/OnboardingScreen';

// Main Screens
import { DashboardScreen } from '../screens/main/DashboardScreen';
import { CompostMonitoringScreen } from '../screens/main/CompostMonitoringScreen';

// Navigation Types
export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Onboarding: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Compost: undefined;
  Water: undefined;
  Soil: undefined;
  Profile: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

// Placeholder components for incomplete screens
const PlaceholderScreen = ({ title }: { title: string }) => {
  const { SafeAreaView } = require('react-native-safe-area-context');
  const { View } = require('react-native');
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.light.background }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 8 }}>🚧</Text>
        <Text style={{ fontSize: 20, fontWeight: '600', color: colors.light.text.primary, textAlign: 'center' }}>
          {title}
        </Text>
        <Text style={{ fontSize: 16, color: colors.light.text.muted, marginTop: 8, textAlign: 'center' }}>
          Tezliklə
        </Text>
      </View>
    </SafeAreaView>
  );
};

// Auth Navigator
const AuthNavigator = ({ onAuthSuccess }: { onAuthSuccess: () => void }) => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login">
        {({ navigation }) => (
          <LoginScreen
            onLoginSuccess={onAuthSuccess}
            onNavigateToRegister={() => navigation.navigate('Register')}
            onForgotPassword={() => alert('Şifrəni Sıfırla - Tezliklə')}
          />
        )}
      </AuthStack.Screen>
      <AuthStack.Screen name="Register">
        {({ navigation }) => (
          <RegisterScreen
            onRegisterSuccess={onAuthSuccess}
            onNavigateToLogin={() => navigation.navigate('Login')}
          />
        )}
      </AuthStack.Screen>
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
    </AuthStack.Navigator>
  );
};

// Main Tab Navigator - Wraps screens with navigation props
const MainNavigator = () => {
  return (
    <MainTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.light.text.muted,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.light.border,
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <MainTab.Screen
        name="Dashboard"
        options={{
          tabBarLabel: 'Ana səhifə',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🏠</Text>,
        }}
      >
        {({ navigation }) => (
          <DashboardScreen
            onNavigateToCompost={() => navigation.navigate('Compost')}
            onNavigateToWater={() => navigation.navigate('Water')}
            onNavigateToSoil={() => navigation.navigate('Soil')}
            onNavigateToAI={() => alert('AI Köməkçi - Tezliklə')}
            onNavigateToEducation={() => alert('Təlim Mərkəzi - Tezliklə')}
          />
        )}
      </MainTab.Screen>
      <MainTab.Screen
        name="Compost"
        options={{
          tabBarLabel: 'Kompost',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>♻️</Text>,
        }}
      >
        {({ navigation }) => (
          <CompostMonitoringScreen onNavigateBack={() => navigation.navigate('Dashboard')} />
        )}
      </MainTab.Screen>
      <MainTab.Screen
        name="Water"
        options={{
          tabBarLabel: 'Su',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>💧</Text>,
        }}
      >
        {() => <PlaceholderScreen title="Su İdarəetməsi" />}
      </MainTab.Screen>
      <MainTab.Screen
        name="Soil"
        options={{
          tabBarLabel: 'Torpaq',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🌱</Text>,
        }}
      >
        {() => <PlaceholderScreen title="Torpaq Analizi" />}
      </MainTab.Screen>
      <MainTab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>👤</Text>,
        }}
      >
        {() => <PlaceholderScreen title="Profil" />}
      </MainTab.Screen>
    </MainTab.Navigator>
  );
};

// Root Navigator
export const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {showSplash ? (
          <RootStack.Screen name="Splash">
            {() => (
              <SplashScreen
                onFinish={() => {
                  setShowSplash(false);
                  setShowOnboarding(!isAuthenticated);
                }}
              />
            )}
          </RootStack.Screen>
        ) : showOnboarding ? (
          <RootStack.Screen name="Auth">
            {() => (
              <OnboardingScreen
                onComplete={() => {
                  setShowOnboarding(false);
                }}
              />
            )}
          </RootStack.Screen>
        ) : !isAuthenticated ? (
          <RootStack.Screen name="Auth">
            {() => <AuthNavigator onAuthSuccess={() => setIsAuthenticated(true)} />}
          </RootStack.Screen>
        ) : (
          <RootStack.Screen name="Main" component={MainNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
