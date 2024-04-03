import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  StatusBar,
  View,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import { useTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
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
import ReactNativeModal from "react-native-modal";
import HelpSVG from "../assets/svg/HelpSVG";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const LoginPage = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);

  const onGoogleLogin = () => {
    onGoogleButtonPress()
      .then(() => {
        createNewUser(auth().currentUser.uid);
        firestore()
          .collection("users")
          .doc(auth().currentUser.uid)
          .get()
          .then((doc) => {
            dispatch(updateUser(doc.data()));
            dispatch(updateLoggedIn(true));
          });
      })
      .catch((error) => {
        Alert.alert("Authentication Error:", error);
      });
  };

  const styles = createStyleSheet(colors);

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

      <TouchableOpacity style={styles.button} onPress={onGoogleLogin}>
        <AntDesign name="google" size={28} color="white" style={styles.icons} />
        <Text style={styles.buttonText}>Register with Google</Text>
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

      <TouchableOpacity style={styles.button} onPress={onGoogleLogin}>
        <AntDesign name="google" size={28} color="white" style={styles.icons} />
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </>
  );

  const HelpPopup = () => (
    <>
      <ReactNativeModal isVisible={isModalVisible}>
        <GestureHandlerRootView style={styles.popupContent}>
          <Text style={[styles.text, { fontSize: 22 }]}>Help</Text>
          <ScrollView>
            <View>
              <Text style={[styles.text, { color: colors.subheading }]}>
                How do I sign up/login?
              </Text>
              <Text style={styles.description}>
                You have the option to log in or sign up with email, Google, or
                Apple by pressing their respective buttons. More information is
                on the email registration/login pages.
              </Text>
              <Text style={[styles.text, { color: colors.subheading }]}>
                What information do you use?
              </Text>
              <Text style={styles.description}>
                For email registration, we will need your full name and email
                address. If you choose to sign up with Google or Apple, we will
                use your Google/Apple account and the information associated
                with it.
              </Text>
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={() => setModalVisible(!isModalVisible)}
            style={styles.button}
          >
            <Text style={[styles.buttonText, {alignSelf: 'center', left: "75%"}]}>Sounds good, thanks!</Text>
          </TouchableOpacity>
        </GestureHandlerRootView>
        
      </ReactNativeModal>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {HelpPopup()}
      <View
        style={{
          top: StatusBar.currentHeight * 2,
          flexDirection: "row-reverse",
          right: 20,
        }}
      >
        <HelpSVG
          width={35}
          height={35}
          onPress={() => setModalVisible(!isModalVisible)}
        />
      </View>
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
                  margin: 20,
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
