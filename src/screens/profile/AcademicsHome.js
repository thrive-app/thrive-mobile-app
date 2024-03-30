import { Text, View, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import EditBox from "../../components/EditBox";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { updateUser } from "../../redux/state";
import createStyleSheet from "../../styles/screens/Profile";
import EditItem from "../../components/EditItem";
import ReactNativeModal from "react-native-modal";
import PlusSVG from "../../assets/svg/PlusSVG";
import { Ionicons } from "@expo/vector-icons";

export const AcademicsHome = ({ navigation, route }) => {
  const userData = useSelector((sample) => sample.store.value.userData);
  const dispatch = useDispatch();

  const [isModalVisible, setModalVisible] = useState(false);

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
    switch (item.type) {
      case "H":
        return "Honors";
      case "R":
        return "";
      case "AP":
        return "AP";
      default:
        return "";
    }
  }

  return (
    <EditBox>
      <ReactNativeModal isVisible={isModalVisible}>
        <View style={styles.popupContent}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: colors.primary, width: "60%" },
            ]}
            onPress={() =>
              navigation.navigate("CoursesForm", {
                payload: {
                  name: "",
                  type: "",
                  score: "",
                },
                title: "Add Course",
                create: true,
              })
            }
          >
            <Text style={[styles.buttonText, { fontFamily: "DMSansRegular" }]}>
              Add <Text style={{ fontFamily: "DMSansBold" }}>Course</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: colors.primary, width: "60%" },
            ]}
            onPress={() =>
              navigation.navigate("TestScoresForm", {
                payload: {
                  name: "",
                  score: "",
                },
                title: "Add Test Score",
                create: true,
              })
            }
          >
            <Text style={[styles.buttonText, { fontFamily: "DMSansRegular" }]}>
              Add <Text style={{ fontFamily: "DMSansBold" }}>Test Score</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "#c7c8c7", width: "40%" },
            ]}
            onPress={() => setModalVisible(!isModalVisible)}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
      <Text style={[styles.titleText, { flex: 0 }]}>Edit Academics</Text>
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
                  create: false,
                }),
              trash: () => deleteItem(userData.courses, "courses", item),
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
                  create: false,
                }),
              trash: () => deleteItem(userData.testScores, "testScores", item),
            }}
          />
        )}
        keyExtractor={(item) => userData.testScores.indexOf(item)}
      />
      <TouchableOpacity
        style={[
          styles.smallButton,
          {
            backgroundColor: colors.primary,
            right: "20%",
            width: 66,
            height: 66,
            borderRadius: 33,
            left: "0%",
            marginTop: "10%",
          },
        ]}
        onPress={() => setModalVisible(!isModalVisible)}
      >
        <PlusSVG width={36} height={36} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#c7c8c7", top: "10%" }]}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      <View style={{ height: 100 }} />
    </EditBox>
  );
};

export default AcademicsHome;
