import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useState, useEffect } from "react";
import { Text, ActivityIndicator, View, StyleSheet } from "react-native";
import LoginPage from "./screens/LoginPage";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import LoginEmail from "./screens/LoginEmail";
import ThemeContext from "./contexts/ThemeContext";
import { DarkTheme, DefaultTheme } from "./themes";
import auth from "@react-native-firebase/auth";
import RegistrationEmail from "./screens/RegistrationEmail";
import { useSelector } from "react-redux"

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
  const loggedIn = useSelector((state) => state.store.value.loggedIn)
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }


  const styles = StyleSheet.create({
    indicatorText: {
      fontSize: 18,
      marginTop: 12,
      fontWeight: 'bold',
      fontFamily: 'sans-serif-medium'
    }
  })
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return(
    <View style={{alignContent: 'center', justifyContent:'center'}}>
      <ActivityIndicator size="large" color="rgb(140,82,255)" />
      <Text style={styles.indicatorText}>Loading...</Text>
    </View>
  )
  //replace with loading screen

  return (
      <Stack.Navigator>
        {loggedIn && user ? (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Profile"
              component={Profile}
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
            <Stack.Screen
              options={{ headerShown: false }}
              name="RegistrationEmail"
              component={RegistrationEmail}
            />
          </>
        )}
      </Stack.Navigator>
  );
};
