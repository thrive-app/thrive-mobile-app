import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { useTheme } from "@react-navigation/native";
import ThemeSwitch from "../components/ThemeSwitch";
import ThemeContext from "../contexts/ThemeContext";
import auth from "@react-native-firebase/auth"
import { useDispatch } from "react-redux";
import { getData } from "../redux/store";

export const Settings = ({ navigation }) => {
  const dispatch = useDispatch()
  const { theme } = useContext(ThemeContext);
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    text: {
      color: colors.text,
      fontSize: 24,
      fontFamily: "DMSansBold",
      paddingLeft: "18%",
      paddingRight:"5%",
      textAlign: "center",
      alignSelf: "center",
    },
    container: {
      alignContent: "center",
      justifyContent: "center",
      flex: 0,
    },
    backButton: {
      backgroundColor: colors.primary,
      borderRadius: 25,
      width: "10%",
      marginLeft: 20,
      margin: 75,
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontFamily: "DMSansBold",
      textAlign: "center",
      fontSize: 16,
    },
    button: {
      backgroundColor: "red",
      width: "80%",
      borderRadius: 25,
      height: 50,
      marginVertical: "50%",
      marginHorizontal: "8%",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
  });

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Welcome")}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={{ flex: 0, flexDirection: "row" }}>
          <Text style={styles.text}>Theme:</Text>
          <Ionicons
            name="sunny-outline"
            size={30}
            color="gray"
            style={{ alignSelf: "center", position: "relative" }}
          />
          <ThemeSwitch style={{ marginHorizontal: 10, alignSelf: "center" }} />
          <Ionicons
            name="moon-outline"
            size={25}
            color="gray"
            style={{ alignSelf: "center", position: "relative" }}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dispatch(getData(false))
            auth().signOut()
          }}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
