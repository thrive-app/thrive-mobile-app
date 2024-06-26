import { Text, View, TouchableOpacity, FlatList, StatusBar } from "react-native";
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
import HelpSVG from "../../assets/svg/HelpSVG";

export const VolunteerWorkHome = ({ navigation, route }) => {
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
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.titleText}>Edit Volunteer Work</Text>
        <View style={{ top: StatusBar.currentHeight }}>
          <HelpSVG />
        </View>
      </View>

      <FlatList
        style={{ flex: 1 }}
        data={userData.volunteerWork}
        renderItem={({ item }) => (
          <EditItem
            starred={item.starred}
            text={`${item.jobTitle} @ ${item.employer}`}
            options={{
              edit: () =>
                navigation.navigate("VolunteerWorkForm", {
                  payload: item,
                  title: "Edit Volunteer Work",
                }),
              trash: () =>
                deleteItem(userData.volunteerWork, "volunteerWork", item),
            }}
          />
        )}
        keyExtractor={(item) => userData.volunteerWork.indexOf(item)}
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
          navigation.navigate("VolunteerWorkForm", {
            payload: {
              starred: false,
              jobTitle: "",
              employer: "",
              startDate: "",
              endDate: "",
              location: "",
              description: "",
            },
            title: "Add Volunteer Work",
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

export default VolunteerWorkHome;
