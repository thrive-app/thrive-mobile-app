import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCallback, useContext } from "react";
import { useColorScheme, View } from "react-native";
import LoginPage from "./screens/LoginPage";
import Welcome from "./screens/Welcome";
import Settings from "./screens/Settings"
import { ClerkLoaded, useUser } from "@clerk/clerk-expo";
import LoginEmail from "./screens/LoginEmail";
import ThemeContext from "./contexts/ThemeContext";
import { useFonts } from "expo-font";
import { DarkTheme, DefaultTheme } from "./themes";
import * as SplashScreen from 'expo-splash-screen';

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
  const { isSignedIn } = useUser();

  return (
    <ClerkLoaded>
      <Stack.Navigator>
        {isSignedIn ? (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Welcome"
              component={Welcome}
            />
            <Stack.Screen
                options={{headerShown: false}}
                name="Settings"
                component={Settings} />
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
