import Navigation from "./src/Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./src/contexts/ThemeContext";
import BetterStatusBar from "./src/components/StatusBar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import dataReducer from "./src/redux/state";

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSansRegular: require("./src/assets/fonts/DMSans-Regular.ttf"),
    DMSansMedium: require("./src/assets/fonts/DMSans-Medium.ttf"),
    DMSansBold: require("./src/assets/fonts/DMSans-Bold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const store = configureStore({
    reducer: {
      store: dataReducer
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider>
        <SafeAreaProvider onLayout={onLayoutRootView}>
          <BetterStatusBar />
          <Navigation />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}
