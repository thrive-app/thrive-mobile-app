import Navigation from "./Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ClerkProvider } from "@clerk/clerk-expo";
import { StatusBar } from "expo-status-bar";
import { tokenCache } from "./tokenCache";
import { ThemeProvider } from "./contexts/ThemeContext";
import { VITE_CLERK_PUBLISHABLE_KEY } from "@env";

export default function App() {
  return (
    <ThemeProvider>
      <ClerkProvider
        publishableKey={VITE_CLERK_PUBLISHABLE_KEY}
        tokenCache={tokenCache}
      >
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </ClerkProvider>
    </ThemeProvider>
  );
}
