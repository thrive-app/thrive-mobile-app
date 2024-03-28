import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
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

  export const VolunteerWorkForm = ({ navigation, route }) => {
    const userData = useSelector((sample) => sample.store.value.userData);
    const dispatch = useDispatch();
  
    const { colors } = useTheme();
    const styles = createStyleSheet(colors);
  
    const { payload, title } = route.params;
  
    const [starred, setStarred] = useState(payload.starred);
    const [jobTitle, setJobTitle] = useState(payload.jobTitle);
    const [employer, setEmployer] = useState(payload.employer);
    const [startDate, setStartDate] = useState(payload.startDate);
    const [endDate, setEndDate] = useState(payload.endDate);
    const [location, setLocation] = useState(payload.location);
    const [description, setDescription] = useState(payload.description ? payload.description : "");
  
    const onSubmitForm = (data) => {
      const userDataCopy = [...userData.volunteerWork];
      const index = userDataCopy.indexOf(payload);
      userDataCopy[index] = data;
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
          .update({ volunteerWork: userDataCopy })
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
    return (
      <EditBox>
        <Text style={[styles.titleText, { flex: 0 }]}>{title}</Text>
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
                Job Title<Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                autoCorrect={false}
                style={styles.inputText}
                placeholder="Job Title"
                defaultValue={payload.jobTitle}
                placeholderTextColor={"gray"}
                keyboardAppearance="default"
                onChangeText={(text) => setJobTitle(text)}
                maxLength={100}
              />
              <Text style={styles.subheading2Text}>
                Employer<Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                autoCorrect={false}
                style={styles.inputText}
                placeholder="Employer"
                defaultValue={payload.employer}
                placeholderTextColor={"gray"}
                keyboardAppearance="default"
                onChangeText={(text) => setEmployer(text)}
                maxLength={75}
              />
              <Text style={styles.subheading2Text}>
                Start Date<Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                autoCorrect={false}
                style={styles.inputText}
                placeholder="Start Date (mm/yyyy)"
                defaultValue={payload.startDate}
                placeholderTextColor={"gray"}
                keyboardAppearance="default"
                keyboardType="phone-pad"
                onChangeText={(text) => setStartDate(text)}
                maxLength={10}
              />
              <Text style={styles.subheading2Text}>
                End Date<Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                autoCorrect={false}
                style={styles.inputText}
                placeholder="End Date"
                defaultValue={payload.endDate}
                placeholderTextColor={"gray"}
                keyboardAppearance="default"
                keyboardType="default"
                onChangeText={(text) => setEndDate(text)}
                maxLength={10}
              />
              <Text style={styles.subheading2Text}>
                Location<Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                autoCorrect={false}
                style={styles.inputText}
                placeholder="Location"
                defaultValue={payload.location}
                placeholderTextColor={"gray"}
                keyboardAppearance="default"
                onChangeText={(text) => setLocation(text)}
                maxLength={150}
              />
              <Text style={styles.subheading2Text}>
                Description
              </Text>
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
                  onPress={() => navigation.navigate("VolunteerWorkHome")}
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
                  onSubmitForm({
                    starred: starred,
                    jobTitle: jobTitle,
                    employer: employer,
                    startDate: startDate,
                    endDate: endDate,
                    location: location,
                    description: description ? description : "",
                  });
                  navigation.navigate("Profile");
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

  export default VolunteerWorkForm