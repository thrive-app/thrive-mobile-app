import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  TextInput
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import ThemeSwitch from "../components/ThemeSwitch";
import auth from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import { updateLoggedIn, updateUser } from "../redux/state";
import createStyleSheet from "../styles/screens/Settings";

export const Settings = ({ navigation }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const styles = createStyleSheet(colors);

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Profile")}
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
        <Text style={[styles.text, {fontSize: 20, right: "6%", top: "9%"}]}>Report Issue: </Text>
        <TextInput
              autoCorrect={false}
              style={[styles.inputText, {left: "12%", top: "5%"}]}
              placeholder="Description (how to recreate the issue)"
              placeholderTextColor={"gray"}
              keyboardAppearance="default"
              maxLength={100}
              numberOfLines={5}
            />
        <TouchableOpacity style={[styles.button2, {backgroundColor: colors.primary, top: "5%", width: "75%"}]}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dispatch(updateUser({}))
            auth().signOut()
            dispatch(updateLoggedIn(false))
          }}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
