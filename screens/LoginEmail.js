import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Alert,
} from "react-native";
import { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HatSVG from "../assets/svg/HatSVG";
import {
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import auth from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import { updateLoggedIn, updateUser } from "../redux/state";
import firestore from "@react-native-firebase/firestore";

const LoginEmail = ({ navigation, route }) => {
  const { height, width, scale, fontScale } = useWindowDimensions();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const styles = StyleSheet.create({
    text: {
      color: colors.text,
      paddingLeft: width / 4 - 7,
    },
    buttonText: {
      color: "white",
      fontFamily: "DMSansBold",
      fontSize: 16,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    button: {
      backgroundColor: colors.primary,
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
      marginBottom: 10,
      alignSelf: "center",
    },
    inputText: {
      fontSize: 16,
      color: "#000000",
      fontFamily: "DMSansRegular",
      backgroundColor: "#ececec",
      width: "100%",
      padding: 20,
      borderRadius: 16,
      marginTop: 10,
      marginBottom: 10,
    },
    image: {
      alignSelf: "center",
      margin: "5%",
    },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        if (
          error.code === "auth/invalid-email" ||
          error.code === "auth/wrong-password" ||
          error.code === "auth/invalid-credential"
        ) {
          Alert.alert(
            "Authentication Error",
            "The email or password are incorrect."
          );
        }
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/user-disabled"
        ) {
          Alert.alert(
            "Authentication Error",
            "A user with that email does not exist."
          );
        }
        if (error.code === "auth/too-many-requests") {
          Alert.alert(
            "Too Many Requests",
            "We have detected unusual authentication activity, so access to this account has been temporarily disabled. Please try again later."
          );
        }
      })
      .then(() => {
        firestore()
          .collection("users")
          .doc(auth().currentUser.uid)
          .get()
          .then((doc) => {
            dispatch(updateUser(doc.data()));
          });
        dispatch(updateLoggedIn(true)); //log in user on frontend
      }).catch(error => console.error(error))
  };

  return (
    <>
      <TouchableOpacity
        style={{
          backgroundColor: colors.primary,
          borderRadius: 25,
          width: "10%",
          marginTop: 75,
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("Login")}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <SafeAreaView style={styles.container}>
          <GestureHandlerRootView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{ justifyContent: "flex-end", paddingTop: "30%" }}>
                <HatSVG style={styles.image} />
                <TextInput
                  autoCorrect={false}
                  style={styles.inputText}
                  placeholder="Email"
                  placeholderTextColor={"gray"}
                  keyboardAppearance="default"
                  onChangeText={(text) => setEmail(text)}
                />

                <TextInput
                  textContentType="password"
                  secureTextEntry={true}
                  autoCorrect={false}
                  style={styles.inputText}
                  placeholder="Password"
                  placeholderTextColor={"gray"}
                  keyboardAppearance="default"
                  onChangeText={(text) => setPassword(text)}
                />

                <TouchableOpacity style={styles.button} onPress={() => login()}>
                  <Text style={styles.buttonText} >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </GestureHandlerRootView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginEmail;
