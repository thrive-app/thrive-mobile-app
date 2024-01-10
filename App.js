import Navigation from "./Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "./tokenCache";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CLERK_PUBLISHABLE_KEY } from "@env";
import BetterStatusBar from "./components/StatusBar";
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { useCallback } from "react";

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSansRegular: require("./assets/fonts/DMSans-Regular.ttf"),
    DMSansMedium: require("./assets/fonts/DMSans-Medium.ttf"),
    DMSansBold: require("./assets/fonts/DMSans-Bold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if(fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ThemeProvider>
      <ClerkProvider
        publishableKey={CLERK_PUBLISHABLE_KEY}
        tokenCache={tokenCache}
      >
        <SafeAreaProvider onLayout={onLayoutRootView}>
          <BetterStatusBar />
          <Navigation />
        </SafeAreaProvider>
      </ClerkProvider>
    </ThemeProvider>
  );
}
