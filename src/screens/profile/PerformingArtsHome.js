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
      <Text style={[styles.titleText, { flex: 0 }]}>Edit Performing Arts</Text>

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
                }),
              trash: () =>
                deleteItem(userData.performingArts, "performingArts", item),
            }}
          />
        )}
        keyExtractor={(item) => userData.performingArts.indexOf(item)}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      <View style={{ height: 100 }} />
    </EditBox>
  );
};

export default PerformingArtsHome;
