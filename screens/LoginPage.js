import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useCallback, useContext } from "react";
import { useTheme } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { TabView, TabBar } from "react-native-tab-view";
import { useOAuth } from "@clerk/clerk-expo";
import ThemeContext from "../contexts/ThemeContext";
import DarkLogoSVG from "../assets/svg/DarkLogoSVG";
import LightLogoSVG from "../assets/svg/LightLogoSVG";
import onGoogleButtonPress from "../functions/onGoogleButtonPress";

const LoginPage = ({ navigation }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    image: {
      alignSelf: "center",
      padding: "20%",
      marginTop: "15%",
    },
    text: {
      color: colors.text,
      fontSize: 18,
      fontFamily: "DMSansBold",
      padding: "5%",
      textAlign: "center",
      alignSelf: "center",
    },
    buttonText: {
      color: "white",
      fontFamily: "DMSansMedium",
      textAlign: "center",
      fontSize: 16,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignContent: "center",
      justifyContent: "center",
    },
    button: {
      backgroundColor: colors.primary,
      width: "80%",
      borderRadius: 25,
      height: 50,
      marginTop: 10,
      marginBottom: 10,
      marginHorizontal: "8%",
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "center",
      padding: 10,
      gap: 15,
    },
    logo: {
      left: "2%",
    },
    icons: {
      position: "relative",
      paddingRight: 10,
    },
    tabView: {
      backgroundColor: colors.background,
      marginBottom: 15,
    },
  });

  const { theme } = useContext(ThemeContext);

  const logoToUse =
    theme === "light" ? (
      <LightLogoSVG height={100} width={325} style={styles.image} />
    ) : (
      <DarkLogoSVG height={100} width={325} style={styles.image} />
    );
  const [routes] = useState([
    { key: "register", title: "Register" },
    { key: "signIn", title: "Sign In" },
  ]);

  const googleOAuthFlow = useOAuth({ strategy: "oauth_google" }).startOAuthFlow;
  const linkedInOAuthFlow = useOAuth({
    strategy: "oauth_linkedin_oidc",
  }).startOAuthFlow;

  const onPressGoogle = useCallback(async () => {
    try {
      console.log(1);
      const { createdSessionId, signIn, signUp, setActive } =
        await googleOAuthFlow();
      console.log(2);
      if (createdSessionId) {
        console.log(3); //login info wasn't in cache prior to starting OAuth flow
        console.log(3.5);
        setActive({ session: createdSessionId });
        console.log(4);
      } //add else and use signIn or signUp for MFA
    } catch (err) {
      Alert.alert("Authentication error", err);
    }
  }, []);

  const onPressLinkedIn = useCallback(async () => {
    try {
      console.log(1);
      const { createdSessionId, signIn, signUp, setActive } =
        await linkedInOAuthFlow();
      console.log(2);
      if (createdSessionId) {
        console.log(3); //login info wasn't in cache prior to starting OAuth flow
        setActive({ session: createdSessionId });
        console.log(3.5);
        //useEffect(() => {signInWithClerk()}, []);
        console.log(4);
      } //add else and use signIn or signUp for MFA
    } catch (err) {
      console.error(err);
    }
  }, []);

  const [index, setIndex] = useState(0);

  const Register = () => (
    <>
      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons
          name="email-outline"
          size={32}
          color="white"
          style={styles.icons}
        />
        <Text style={styles.buttonText}>Register with Email</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onGoogleButtonPress()
        }}
      >
        <SimpleLineIcons
          name="social-google"
          size={28}
          color="white"
          style={styles.icons}
        />
        <Text style={styles.buttonText}>Register with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onPressLinkedIn();
        }}
      >
        <SimpleLineIcons
          name="social-linkedin"
          size={28}
          color="white"
          style={styles.icons}
        />
        <Text style={styles.buttonText}>Register with LinkedIn</Text>
      </TouchableOpacity>
    </>
  );

  const SignIn = () => (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LoginEmail")}
      >
        <MaterialCommunityIcons
          name="email-outline"
          size={32}
          color="white"
          style={styles.icons}
        />
        <Text style={styles.buttonText}>Sign in with Email</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onGoogleButtonPress()
        }}
      >
        <SimpleLineIcons
          name="social-google"
          size={28}
          color="white"
          style={styles.icons}
        />
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onPressLinkedIn();
        }}
      >
        <SimpleLineIcons
          name="social-linkedin"
          size={28}
          color="white"
          style={styles.icons}
        />
        <Text style={styles.buttonText}>Sign in with LinkedIn</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {logoToUse}
      <Text style={styles.text}>Your future at your fingertips.</Text>
      <TabView
        renderTabBar={(props) => (
          <TabBar
            indicatorStyle={{ backgroundColor: colors.primary, height: 2 }}
            {...props}
            renderLabel={({ route }) => (
              <Text
                style={{
                  color: colors.text,
                  margin: 8,
                  fontSize: 18,
                  fontFamily: "DMSansMedium",
                }}
              >
                {route.title}
              </Text>
            )}
            style={styles.tabView}
          />
        )}
        navigationState={{ index, routes }}
        renderScene={({ route }) => {
          switch (route.key) {
            case "register":
              return Register();
            case "signIn":
              return SignIn();
            default:
              return null;
          }
        }}
        onIndexChange={setIndex}
        initialLayout={{ width: "100%" }}
      />
    </SafeAreaView>
  );
};

export default LoginPage;
