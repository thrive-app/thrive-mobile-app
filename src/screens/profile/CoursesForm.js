import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  StatusBar
} from "react-native";
import CheckBox from "expo-checkbox";
import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import EditBox from "../../components/EditBox";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { updateUser } from "../../redux/state";
import createStyleSheet from "../../styles/screens/Profile";
import { Ionicons } from "@expo/vector-icons";
import HomeSVG from "../../assets/svg/HomeSVG";
import HelpSVG from "../../assets/svg/HelpSVG";

export const CoursesForm = ({ navigation, route }) => {
  const userData = useSelector((sample) => sample.store.value.userData);
  const dispatch = useDispatch();

  const { colors } = useTheme();
  const styles = createStyleSheet(colors);

  const { payload, title, create } = route.params;

  const [name, setName] = useState(payload.name);
  const [type, setType] = useState(payload.type);
  const [isScore, setIsScore] = useState(
    payload.score === -1 || payload.score === 0 || payload.score === ""
      ? false
      : true
  );
  const [score, setScore] = useState(payload.score);

  function setTypeSwitch(val) {
    switch (val) {
      case "Regular":
        setType("R");
        break;
      case "Honors":
        setType("H");
        break;
      case "AP":
        setType("AP");
        break;
      case "IB":
        setType("IB");
        break;
      case "1":
        setType("R");
        break;
      case "2":
        setType("H");
        break;
      case "3":
        setType("AP");
        break;
      case "4":
        setType("IB");
        break;
      default:
        setType("R");
        break;
    }
  }

  function reverseTypeSwitch(val) {
    switch (val) {
      case "R":
        return "Regular";
      case "H":
        return "Honors";
      case "AP":
        return "AP";
      case "IB":
        return "IB";
      default:
        return "Regular";
    }
  }

  function findObj(val) {
    const str = reverseTypeSwitch(val);
    for (let i = 0; i < data.length; i++) {
      if (data[i].value === str) {
        return data[i];
      }
    }
  }
  const data = [
    { key: "1", value: "Regular" },
    { key: "2", value: "Honors" },
    { key: "3", value: "AP" },
    { key: "4", value: "IB" },
  ];

  const onSubmitForm = (data) => {
    let userDataCopy = [];
    if (userData.courses) {
      userDataCopy = [...userData.courses];
    } else {
      userDataCopy = [];
    }
    if (!create) {
      const index = userDataCopy.indexOf(payload);
      userDataCopy[index] = data;
    } else {
      userDataCopy.push(data);
    }

    //update only affected DB fields (REST API PATCH)
    firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .update({ courses: userDataCopy })
      .then(() => {
        //GET updated user data
        firestore()
          .collection("users")
          .doc(auth().currentUser.uid)
          .get()
          .then((doc) => {
            //update Redux (business layer) in-memory data store
            dispatch(updateUser(doc.data()));
          })
          //close window
          .then(() => navigation.navigate("Profile"));
      });
  };

  const submitForm = () => {
    onSubmitForm({
      name: name,
      type: type,
      score: score ? score : -1,
    });
    navigation.navigate("Profile");
  };
  return (
    <EditBox>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.titleText}>{title}</Text>
        <View style={{ top: StatusBar.currentHeight }}>
          <HelpSVG />
        </View>
      </View>
      <GestureHandlerRootView>
        <ScrollView>
          <KeyboardAvoidingView>
            <Text style={styles.subheading2Text}>
              Course Name<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              autoCorrect={false}
              style={styles.inputText}
              placeholder="Course Name"
              defaultValue={payload.name}
              placeholderTextColor={"gray"}
              keyboardAppearance="default"
              onChangeText={(text) => setName(text)}
              maxLength={100}
            />
            <Text style={styles.subheading2Text}>
              What type of course is this?
            </Text>
            <SelectList
              setSelected={(val) => setTypeSwitch(val)}
              data={data}
              save="value"
              search={false}
              fontFamily="DMSansRegular"
              defaultOption={findObj(payload.type)}
              boxStyles={{
                marginVertical: 10,
                paddingVertical: "2%",
                width: "90%",
              }}
            />
            <Text style={styles.subheading2Text}>
              Do you have a test score associated with this course?
            </Text>
            <CheckBox
              style={{ left: "3%", marginVertical: 5 }}
              value={isScore}
              onValueChange={setIsScore}
              color={isScore ? colors.primary : undefined}
            />

            <Text
              style={[styles.subheading2Text, { color: colors.subheading }]}
            >
              Test Score
            </Text>
            <TextInput
              autoCorrect={false}
              style={styles.inputText}
              placeholder="Test Score"
              defaultValue={payload.score != -1 ? String(payload.score) : ""}
              placeholderTextColor={"gray"}
              keyboardAppearance="default"
              keyboardType="default"
              onChangeText={(text) => setScore(parseInt(text))}
              maxLength={10}
              editable={isScore}
            />
          </KeyboardAvoidingView>
          <View style={styles.smallButtonContainer}>
            <TouchableOpacity
              style={[styles.smallButton, { backgroundColor: "#c7c8c7" }]}
              onPress={() => navigation.navigate("AcademicsHome")}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.smallButton, { backgroundColor: "#c7c8c7" }]}
              onPress={() => navigation.navigate("Profile")}
            >
              <HomeSVG color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={
              name
                ? submitForm()
                : Alert.alert(
                    "Submission Error",
                    "Please make sure that you filled in all of the required fields."
                  )
            }
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </ScrollView>
      </GestureHandlerRootView>
    </EditBox>
  );
};

export default CoursesForm;
