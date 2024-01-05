import Navigation from "./Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "./tokenCache";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CLERK_PUBLISHABLE_KEY } from "@env";
import BetterStatusBar from "./components/StatusBar";


export default function App() {
  return (
    <ThemeProvider>
      <ClerkProvider
        publishableKey={CLERK_PUBLISHABLE_KEY}
        tokenCache={tokenCache}
      >
        <SafeAreaProvider>
          <BetterStatusBar />
          <Navigation />
        </SafeAreaProvider>
      </ClerkProvider>
    </ThemeProvider>
  );
}
