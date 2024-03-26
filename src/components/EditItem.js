import { View, Text, Button, TouchableOpacity, FlatList } from "react-native";
import { useState } from "react";
import { useTheme } from "@react-navigation/native";
import StarSVG from "../assets/svg/StarSVG";
import createStyleSheet from "../styles/components/EditItem";
import ReactNativeModal from "react-native-modal";
import VerticalDotMenuSVG from "../assets/svg/VerticalDotMenu";
import TrashSVG from "../assets/svg/TrashSVG";
import EditIconSVG from "../assets/svg/EditIconSVG";
import { Ionicons } from "@expo/vector-icons";


const EditItem = ({ starred, text, options }) => {
  const { colors } = useTheme();
  const styles = createStyleSheet(colors);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <View style={styles.box}>
        <View style={styles.star}>
          {starred ? <StarSVG width={20} height={20} /> : null}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text} numberOfLines={1}>
            {text}
          </Text>
        </View>
        <View style={styles.menuContainer}>
          <VerticalDotMenuSVG style={styles.menu} onPress={toggleModal} />
          <ReactNativeModal isVisible={isModalVisible}>
            <View style={styles.popupContent}>
              <Text style={styles.titleText}>
                What would you like to do with "
                {<Text style={{ fontFamily: "DMSansBold" }}>{text}</Text>}"?
              </Text>
              <View style={styles.smallButtonContainer}>
              <TouchableOpacity style={[styles.smallButton, { backgroundColor: "red" }]}>
                <TrashSVG width={30} height={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.smallButton, { backgroundColor: "#cecece" }]}>
                <EditIconSVG width={30} height={30} color="white" />
              </TouchableOpacity>
              </View>
              <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={toggleModal}>
              <Text style={styles.buttonText}>Go Back</Text>
              </TouchableOpacity>
            </View>
          </ReactNativeModal>
        </View>
      </View>
    </>
  );
};

export default EditItem;
