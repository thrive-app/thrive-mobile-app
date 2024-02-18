import Navigation from "./Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./contexts/ThemeContext";
import BetterStatusBar from "./components/StatusBar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import dataReducer from "./redux/store";

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSansRegular: require("./assets/fonts/DMSans-Regular.ttf"),
    DMSansMedium: require("./assets/fonts/DMSans-Medium.ttf"),
    DMSansBold: require("./assets/fonts/DMSans-Bold.ttf"),
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
      store: dataReducer,
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
