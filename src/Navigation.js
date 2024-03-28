import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useContext, useState, useEffect } from "react";
import { Text, ActivityIndicator, View, StyleSheet } from "react-native";
import LoginPage from "./screens/LoginPage";
import Profile from "./screens/profile/Profile";
import CoursesForm from "./screens/profile/CoursesForm";
import TestScoresForm from "./screens/profile/TestScoresForm";
import AcademicsHome from "./screens/profile/AcademicsHome";
import ECsForm from "./screens/profile/ECsForm";
import ECsHome from "./screens/profile/ECsHome";
import AthleticsForm from "./screens/profile/AthleticsForm";
import VolunteerWorkHome from "./screens/profile/VolunteerWorkHome";
import EditGeneralInfo from "./screens/profile/EditGeneralInfo";
import WorkExperienceHome from "./screens/profile/WorkExperienceHome";
import WorkExperienceForm from "./screens/profile/WorkExperienceForm";
import VolunteerWorkForm from "./screens/profile/VolunteerWorkForm";
import AthleticsHome from "./screens/profile/AthleticsHome";
import PerformingArtsHome from "./screens/profile/PerformingArtsHome";
import PerformingArtsForm from "./screens/profile/PerformingArtsForm";
import Settings from "./screens/Settings";
import LoginEmail from "./screens/LoginEmail";
import ThemeContext from "./contexts/ThemeContext";
import { DarkTheme, DefaultTheme } from "./themes";
import auth from "@react-native-firebase/auth";
import RegistrationEmail from "./screens/RegistrationEmail";
import { useSelector } from "react-redux";
import { TransitionPresets } from "@react-navigation/stack";
import AwardsHome from "./screens/profile/AwardsHome";
import AwardsForm from "./screens/profile/AwardsForm";

export default function Navigation() {
  const { theme } = useContext(ThemeContext);
  return (
    <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

const RootNavigator = () => {
  const loggedIn = useSelector((state) => state.store.value.loggedIn);
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
      marginBottom: 5,
      fontWeight: "bold",
      fontFamily: "sans-serif-medium",
      alignSelf: "center",
    },
  });
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing)
    return (
      <View
        style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
      >
        <Text style={styles.indicatorText}>Loading...</Text>
        <ActivityIndicator size="large" color="rgb(140,82,255)" />
      </View>
    );

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

          <Stack.Group
            screenOptions={{
              presentation: "modal",
              headerShown: false,
              gestureEnabled: true,
              ...TransitionPresets.ScaleFromCenterAndroid,
            }}
          >
            <Stack.Screen name="EditGeneralInfo" component={EditGeneralInfo} />
            <Stack.Screen name="AcademicsHome" component={AcademicsHome} />
            <Stack.Screen name="TestScoresForm" component={TestScoresForm} />
            <Stack.Screen name="CoursesForm" component={CoursesForm} />
            <Stack.Screen
              name="WorkExperienceHome"
              component={WorkExperienceHome}
            />
            <Stack.Screen
              name="WorkExperienceForm"
              component={WorkExperienceForm}
            />
            <Stack.Screen
              name="VolunteerWorkHome"
              component={VolunteerWorkHome}
            />
            <Stack.Screen
              name="VolunteerWorkForm"
              component={VolunteerWorkForm}
            />
            <Stack.Screen name="AthleticsHome" component={AthleticsHome} />
            <Stack.Screen name="AthleticsForm" component={AthleticsForm} />
            <Stack.Screen name="ECsHome" component={ECsHome} />
            <Stack.Screen name="ECsForm" component={ECsForm} />
            <Stack.Screen
              name="PerformingArtsHome"
              component={PerformingArtsHome}
            />
            <Stack.Screen
              name="PerformingArtsForm"
              component={PerformingArtsForm}
            />
            <Stack.Screen name="AwardsHome" component={AwardsHome} />
            <Stack.Screen name="AwardsForm" component={AwardsForm} />
          </Stack.Group>
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
