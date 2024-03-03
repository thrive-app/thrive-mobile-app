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
import createNewUser from "../functions/createNewUser";

const RegistrationEmail = ({ navigation, route }) => {
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
      fontSize: 13,
      color: "#000000",
      fontFamily: "DMSansRegular",
      backgroundColor: "#ececec",
      width: "100%",
      padding: 8,
      borderRadius: 16,
      marginTop: 8,
      marginBottom: 10,
    },
    image: {
      alignSelf: "center",
      margin: "5%",
    },
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const goodPassword = (password) => {
    var decimal =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/;
    if (password.match(decimal)) {
      return true;
    }
    return false;
  };

  const register = async () => {
    if (firstName != "" && lastName != "" && email != "" && password != "") {
      if (goodPassword(password)) {
        await auth()
          .createUserWithEmailAndPassword(email, password)
          .catch((error) => {
            console.error(error);
            if (error === "auth/email-already-in-use") {
              Alert.alert(
                "Authentication Error",
                "That email address is already in use."
              );
            }
            if (error.code === "auth/invalid-email") {
              Alert.alert(
                "Authentication Error",
                "That email address is invalid."
              );
            }
            if (error.code === "auth/weak-password") {
              Alert.alert("Bad Password", "Password is too weak.");
            }
          });

        try {
          await auth().currentUser.updateProfile({
            displayName: firstName + " " + lastName,
            photoURL:
              "https://dummyimage.com/100x100/b8b8b8/fff.png&text=" +
              firstName[0] +
              lastName[0],
          });

          createNewUser(auth().currentUser.uid);
          firestore()
            .collection("users")
            .doc(auth().currentUser.uid)
            .get()
            .then((doc) => {
              dispatch(updateUser(doc.data()));
              dispatch(updateLoggedIn(true)); //updates redux data store; logs in user on frontend
            });
        } catch (error) {
          console.error(error);
        }
      } else {
        Alert.alert(
          "Bad Password",
          "Password does not contain between 8 to 25 characters and at least one lowercase letter, one uppercase letter, one digit, and one special character."
        );
      }
    } else {
      Alert.alert("Authentication Error", "One or more fields are empty.");
    }
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
                  placeholder="First Name"
                  placeholderTextColor={"gray"}
                  keyboardAppearance="default"
                  onChangeText={(text) => setFirstName(text)}
                />
                <TextInput
                  autoCorrect={false}
                  style={styles.inputText}
                  placeholder="Last Name"
                  placeholderTextColor={"gray"}
                  keyboardAppearance="default"
                  onChangeText={(text) => setLastName(text)}
                />
                <TextInput
                  autoCorrect={false}
                  style={styles.inputText}
                  placeholder="Email Address"
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

                <TouchableOpacity
                  onPress={() => register()}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </GestureHandlerRootView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};

export default RegistrationEmail;
