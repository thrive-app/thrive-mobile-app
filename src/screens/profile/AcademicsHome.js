import { Text, View, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import EditBox from "../../components/EditBox";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { updateUser } from "../../redux/state";
import createStyleSheet from "../../styles/screens/Profile";
import EditItem from "../../components/EditItem";

export const AcademicsHome = ({ navigation, route }) => {
  const userData = useSelector((sample) => sample.store.value.userData);
  const dispatch = useDispatch();

  const { colors } = useTheme();
  const styles = createStyleSheet(colors);

  //figure out how to close window at same time
  function deleteItem(data, fieldName, item) {
    const index = data.indexOf(item);
    dataCopy = [...data];
    dataCopy.splice(index, 1);
    let payload = {};
    payload[fieldName] = dataCopy;
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
          .then(() => navigation.navigate("Profile"));
      });
  }

  function typeSwitch(item) {
    switch(item.type) {
        case 'H':
            return 'Honors'
        case 'R':
            return ''
        case 'AP':
            return 'AP'
        default:
            return ""
    }
  }

  return (
    <EditBox>
      <Text style={[styles.titleText, { flex: 0 }]}>Edit Courses</Text>
      <Text style={styles.subheading2Text}>Courses</Text>
      <FlatList
        style={{ flex: 1 }}
        data={userData.courses}
        renderItem={({ item }) => (
          <EditItem
            text={`${typeSwitch(item)} ${item.name}`}
            options={{
              edit: () =>
                navigation.navigate("CoursesForm", {
                  payload: item,
                  title: "Edit Courses",
                }),
              trash: () =>
                deleteItem(userData.courses, "courses", item),
            }}
          />
        )}
        keyExtractor={(item) => userData.courses.indexOf(item)}
      />
      <Text style={styles.subheading2Text}>Test Scores</Text>
      <FlatList
        style={{ flex: 1 }}
        data={userData.testScores}
        renderItem={({ item }) => (
          <EditItem
            text={`${item.name}`}
            options={{
              edit: () =>
                navigation.navigate("TestScoresForm", {
                  payload: item,
                  title: "Edit Test Scores",
                }),
              trash: () =>
                deleteItem(userData.testScores, "testScores", item),
            }}
          />
        )}
        keyExtractor={(item) => userData.testScores.indexOf(item)}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary, top: "10%" }]}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      <View style={{ height: 100 }} />
    </EditBox>
  );
};

export default AcademicsHome;
