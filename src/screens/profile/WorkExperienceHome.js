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
import PlusSVG from "../../assets/svg/PlusSVG";

export const WorkExperienceHome = ({ navigation, route }) => {
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

  return (
    <EditBox>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text style={[styles.titleText, { flex: 0 }]}>
          Edit Work Experience
        </Text>
      </View>

      <FlatList
        style={{ flex: 1 }}
        data={userData.workExperience}
        renderItem={({ item }) => (
          <EditItem
            starred={item.starred}
            text={`${item.jobTitle} @ ${item.employer}`}
            options={{
              edit: () =>
                navigation.navigate("WorkExperienceForm", {
                  payload: item,
                  title: "Edit Work Experience",
                  create: false,
                }),
              trash: () =>
                deleteItem(userData.workExperience, "workExperience", item),
            }}
          />
        )}
        keyExtractor={(item) => userData.workExperience.indexOf(item)}
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
            marginVertical: "10%",
          },
        ]}
        onPress={() =>
          navigation.navigate("WorkExperienceForm", {
            payload: {
              starred: false,
              jobTitle: "",
              employer: "",
              startDate: "",
              endDate: "",
              location: "",
              description: "",
            },
            title: "Add Work Experience",
            create: true,
          })
        }
      >
        <PlusSVG width={36} height={36} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#c7c8c7" }]}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      <View style={{ height: 100 }} />
    </EditBox>
  );
};

export default WorkExperienceHome;
