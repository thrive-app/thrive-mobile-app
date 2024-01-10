import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
  Button,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HatSVG from "../assets/svg/HatSVG";
import {
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

const LoginEmail = ({ navigation, route }) => {
  const { height, width, scale, fontScale } = useWindowDimensions();
  const hat_logo = "../assets/hat.png";
  const { colors } = useTheme();

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
      color: colors.text,
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
                />

                <TextInput
                  textContentType="password"
                  secureTextEntry={true}
                  autoCorrect={false}
                  style={styles.inputText}
                  placeholder="Password"
                  placeholderTextColor={"gray"}
                  keyboardAppearance="default"
                />

                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Login</Text>
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
