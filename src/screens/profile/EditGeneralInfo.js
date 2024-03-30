import { Text, View, TouchableOpacity, TextInput } from "react-native";
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

export const EditGeneralInfo = ({ navigation }) => {
  const userData = useSelector((sample) => sample.store.value.userData);
  const dispatch = useDispatch();
  const [grade, setGrade] = useState(userData.grade);
  const [about, setAbout] = useState(userData.about ? userData.about : "");
  const [school, setSchool] = useState(userData.school);

  const { colors } = useTheme();
  const styles = createStyleSheet(colors);
  const onSubmitForm = (payload) => {
    //update only affected DB fields (REST API PATCH)
    firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .update(payload)
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

  return (
    <EditBox>
      <GestureHandlerRootView>
        <ScrollView style={{ bottom: 8 }}>
          <Text style={styles.titleText}>Edit General Info</Text>
          <Text style={styles.subheading2Text}>
            School<Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            autoCorrect={false}
            style={styles.inputText}
            placeholder="School"
            defaultValue={userData.school}
            placeholderTextColor={"gray"}
            keyboardAppearance="default"
            onChangeText={(text) => setSchool(text)}
            maxLength={50}
          />
          <Text style={styles.subheading2Text}>
            Grade/Class<Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            autoCorrect={false}
            inputMode="numeric"
            keyboardType="number-pad"
            style={styles.inputText}
            placeholder="Grade"
            defaultValue={String(userData.grade)}
            placeholderTextColor={"gray"}
            keyboardAppearance="default"
            onChangeText={(text) => setGrade(parseInt(text))}
            maxLength={2}
            multiline={false}
          />
          <Text style={styles.subheading2Text}>About</Text>
          <TextInput
            autoCorrect={true}
            inputMode="text"
            keyboardType="default"
            style={styles.inputText}
            placeholder="About"
            defaultValue={userData.about}
            placeholderTextColor={"gray"}
            keyboardAppearance="default"
            onChangeText={(text) => setAbout(text)}
            maxLength={1000}
            multiline={true}
            spellCheck={true}
            scrollEnabled={true}
            autoCapitalize="sentences"
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() =>
              onSubmitForm({
                school: school,
                grade: grade,
                about: about ? about : "",
              })
            }
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#c7c8c7" }]}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
          <View style={{ height: 100 }} />
        </ScrollView>
      </GestureHandlerRootView>
    </EditBox>
  );
};

export default EditGeneralInfo;
