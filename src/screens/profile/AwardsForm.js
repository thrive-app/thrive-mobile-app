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

export const AwardsForm = ({ navigation, route }) => {
  const userData = useSelector((sample) => sample.store.value.userData);
  const dispatch = useDispatch();

  const { colors } = useTheme();
  const styles = createStyleSheet(colors);

  const { payload, title, create } = route.params;

  const [starred, setStarred] = useState(payload.starred);
  const [itemTitle, setItemTitle] = useState(payload.title);
  const [provider, setProvider] = useState(payload.provider);
  const [year, setYear] = useState(payload.year);
  const [description, setDescription] = useState(
    payload.description ? payload.description : ""
  );

  const onSubmitForm = (data) => {
    let userDataCopy = [];
    if (userData.awards) {
      userDataCopy = [...userData.awards];
    } else {
      userDataCopy = [];
    }
    if (!create) {
      const index = userDataCopy.indexOf(payload);
      userDataCopy[index] = data;
    } else {
      userDataCopy.push(data);
    }
    Promise.all(
      userDataCopy.map((e) =>
        data.starred && userDataCopy.indexOf(e) != userDataCopy.indexOf(data)
          ? (e.starred = false)
          : (e.starred = e.starred)
      )
    ).then(
      //update only affected DB fields (REST API PATCH)
      firestore()
        .collection("users")
        .doc(auth().currentUser.uid)
        .update({ awards: userDataCopy })
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
        })
    );
  };
  const submitForm = () => {
    onSubmitForm({
      starred: starred,
      title: itemTitle,
      provider: provider,
      year: year,
      description: description ? description : "",
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
            <View
              style={{
                flexDirection: "row",
                width: "35%",
              }}
            >
              <Text style={styles.subheading2Text}>Starred?</Text>
              <CheckBox
                style={{ position: "relative", top: 10, left: 15 }}
                value={starred}
                onValueChange={setStarred}
                color={starred ? colors.primary : undefined}
              />
            </View>

            <Text style={styles.subheading2Text}>
              Title<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              autoCorrect={false}
              style={styles.inputText}
              placeholder="Title"
              defaultValue={payload.title}
              placeholderTextColor={"gray"}
              keyboardAppearance="default"
              onChangeText={(text) => setItemTitle(text)}
              maxLength={150}
            />
            <Text style={styles.subheading2Text}>
              Award Provider<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              autoCorrect={false}
              style={styles.inputText}
              placeholder="Provider"
              defaultValue={payload.provider}
              placeholderTextColor={"gray"}
              keyboardAppearance="default"
              onChangeText={(text) => setProvider(text)}
              maxLength={75}
            />
            <Text style={styles.subheading2Text}>
              Year Recieved<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              autoCorrect={false}
              style={styles.inputText}
              placeholder="Year (yyyy)"
              defaultValue={String(payload.year)}
              placeholderTextColor={"gray"}
              keyboardAppearance="default"
              keyboardType="numeric"
              onChangeText={(text) => setYear(parseInt(text))}
              maxLength={4}
            />
            <Text style={styles.subheading2Text}>Description</Text>
            <TextInput
              autoCorrect={true}
              inputMode="text"
              keyboardType="default"
              style={styles.inputText}
              placeholder="Description"
              defaultValue={payload.description ? payload.description : ""}
              placeholderTextColor={"gray"}
              keyboardAppearance="default"
              onChangeText={(text) => setDescription(text)}
              maxLength={1000}
              multiline={true}
              spellCheck={true}
              scrollEnabled={true}
              autoCapitalize="sentences"
            />
          </KeyboardAvoidingView>
          <View style={styles.smallButtonContainer}>
            <TouchableOpacity
              style={[styles.smallButton, { backgroundColor: "#c7c8c7" }]}
              onPress={() => navigation.navigate("AwardsHome")}
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
            onPress={() => {
              !(itemTitle && provider && year)
                ? Alert.alert(
                  "Submission Error",
                  "Please make sure that you filled in all of the required fields."
                )
                : String(year).length != 4
                ? Alert.alert(
                  "Submission Error",
                  "The year is not in the correct format (YYYY). "
                ) 
                : submitForm()
            }}
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </ScrollView>
      </GestureHandlerRootView>
    </EditBox>
  );
};

export default AwardsForm;
