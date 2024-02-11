import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCallback, useContext, useState, useEffect } from "react";
import { useColorScheme, View, Text } from "react-native";
import LoginPage from "./screens/LoginPage";
import Welcome from "./screens/Welcome";
import Settings from "./screens/Settings";
import { ClerkLoaded, useUser } from "@clerk/clerk-expo";
import LoginEmail from "./screens/LoginEmail";
import ThemeContext from "./contexts/ThemeContext";
import { useFonts } from "expo-font";
import { DarkTheme, DefaultTheme } from "./themes";
import * as SplashScreen from "expo-splash-screen";
import auth from "@react-native-firebase/auth";

export default function Navigation() {
  const { theme } = useContext(ThemeContext);
  return (
    <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  //const { isSignedIn } = useUser();
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return <Text>Loading</Text>; //replace with loading screen

  return (
    <ClerkLoaded>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Welcome"
              component={Welcome}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Settings"
              component={Settings}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginPage}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="LoginEmail"
              component={LoginEmail}
            />
          </>
        )}
      </Stack.Navigator>
    </ClerkLoaded>
  );
};
