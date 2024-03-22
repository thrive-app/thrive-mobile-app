import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
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
