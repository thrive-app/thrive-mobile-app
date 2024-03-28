import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
  } from "react-native";
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

  export const TestScoresForm = ({ navigation, route }) => {
    const userData = useSelector((sample) => sample.store.value.userData);
    const dispatch = useDispatch();
  
    const { colors } = useTheme();
    const styles = createStyleSheet(colors);
  
    const { payload, title } = route.params;
  
    const [name, setName] = useState(payload.name)
    const [score, setScore] = useState(payload.score)
  
    const onSubmitForm = (data) => {
      const userDataCopy = [...userData.testScores];
      const index = userDataCopy.indexOf(payload);
      userDataCopy[index] = data;
      
        //update only affected DB fields (REST API PATCH)
        firestore()
          .collection("users")
          .doc(auth().currentUser.uid)
          .update({ testScores: userDataCopy })
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
      
    };
    return (
      <EditBox>
        <Text style={[styles.titleText, { flex: 0 }]}>{title}</Text>
        <GestureHandlerRootView>
          <ScrollView>
            <KeyboardAvoidingView>
              
  
              <Text style={styles.subheading2Text}>
                Test<Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                autoCorrect={false}
                style={styles.inputText}
                placeholder="Test"
                defaultValue={payload.name}
                placeholderTextColor={"gray"}
                keyboardAppearance="default"
                onChangeText={(text) => setName(text)}
                maxLength={100}
              />
              <Text style={styles.subheading2Text}>
              Score<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              autoCorrect={false}
              style={styles.inputText}
              placeholder="Score"
              defaultValue={String(payload.score)}
              placeholderTextColor={"gray"}
              keyboardAppearance="default"
              keyboardType="phone-pad"
              onChangeText={(text) => setScore((text))}
              maxLength={10}
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
                onPress={() => {
                  onSubmitForm({
                    name: name,
                    score: score
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

  export default TestScoresForm