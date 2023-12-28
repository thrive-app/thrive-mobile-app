import { StyleSheet,useColorScheme } from 'react-native';
import Navigation from './Navigation';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context'; 
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { StatusBar } from 'expo-status-bar';
import { tokenCache } from './tokenCache';
import { VITE_CLERK_PUBLISHABLE_KEY } from "@env"

export default function App() {
  return (
  <ClerkProvider 
    publishableKey={VITE_CLERK_PUBLISHABLE_KEY}
    tokenCache={tokenCache}
  >
    <SafeAreaProvider> 
      <Navigation />
      <StatusBar />
    </SafeAreaProvider>
  </ClerkProvider>
  );
}


