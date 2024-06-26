import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
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

export const PerformingArtsHome = ({ navigation, route }) => {
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
        <Text style={styles.titleText}>Edit Performing Arts</Text>
        <View style={{ top: StatusBar.currentHeight }}>
          <HelpSVG />
        </View>
      </View>

      <FlatList
        style={{ flex: 1 }}
        data={userData.performingArts}
        renderItem={({ item }) => (
          <EditItem
            starred={item.starred}
            text={`${item.name}`}
            options={{
              edit: () =>
                navigation.navigate("PerformingArtsForm", {
                  payload: item,
                  title: "Edit Performing Arts",
                  create: false,
                }),
              trash: () =>
                deleteItem(userData.performingArts, "performingArts", item),
            }}
          />
        )}
        keyExtractor={(item) => userData.performingArts.indexOf(item)}
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
          navigation.navigate("PerformingArtsForm", {
            payload: {
              starred: false,
              name: "",
              startDate: "",
              endDate: "",
              location: "",
              description: "",
            },
            title: "Add Performing Arts",
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

export default PerformingArtsHome;
