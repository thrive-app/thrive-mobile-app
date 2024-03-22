import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import { useTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons"
import { MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TabView, TabBar } from "react-native-tab-view";
import ThemeContext from "../contexts/ThemeContext";
import DarkLogoSVG from "../assets/svg/DarkLogoSVG";
import LightLogoSVG from "../assets/svg/LightLogoSVG";
import onGoogleButtonPress from "../functions/onGoogleButtonPress";
import { useDispatch } from "react-redux";
import { updateLoggedIn, updateUser } from "../redux/state";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import createNewUser from "../functions/createNewUser";
import createStyleSheet from "../styles/screens/LoginPage";


const LoginPage = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  

  const onGoogleLogin = () => {
    onGoogleButtonPress().then(() => {
      createNewUser(auth().currentUser.uid)
      firestore()
        .collection("users")
        .doc(auth().currentUser.uid)
        .get()
        .then((doc) => {
          dispatch(updateUser(doc.data()));
          dispatch(updateLoggedIn(true));
        });
    }).catch((error) => {
      Alert.alert("Authentication Error:", error)
    })
  }

  const styles = createStyleSheet(colors)

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

  const [index, setIndex] = useState(0);

  const Register = () => (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("RegistrationEmail")}
      >
        <MaterialIcons
          name="email"
          size={32}
          color="white"
          style={styles.icons}
        />
        <Text style={styles.buttonText}>Register with Email</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onGoogleLogin}
      >
       <AntDesign
          name="google"
          size={28}
          color="white"
          style={styles.icons}
        />
        <Text style={styles.buttonText}>Register with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
      <MaterialCommunityIcons
          name="apple"
          size={30}
          color="white"
          style={styles.icons}
        />
        <Text style={styles.buttonText}>Register with Apple</Text>
      </TouchableOpacity>
    </>
  );

  const SignIn = () => (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LoginEmail")}
      >
        <MaterialIcons
          name="email"
          size={32}
          color="white"
          style={styles.icons}
        />
        <Text style={styles.buttonText}>Sign in with Email</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onGoogleLogin}
      >
        <AntDesign
          name="google"
          size={28}
          color="white"
          style={styles.icons}
        />
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons
          name="apple"
          size={30}
          color="white"
          style={styles.icons}
        />
        <Text style={styles.buttonText}>Sign in with Apple</Text>
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
