import Modal from "react-native-modal";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";

const EditBox = (props) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    box: {
      width: "95%",
      height: "85%",
      flex: 0,
      alignSelf: "center",
      flexDirection: "column",
      borderRadius: 30,
      borderColor: colors.primary,
      borderWidth: 2,
      paddingVertical: 30,
      marginTop: 15,
      paddingHorizontal: 15,
      backgroundColor: colors.background,
    },
    edit: {
      position: "relative",
      alignSelf: "flex-end",
      width: 24,
      height: 24,
    },
  });
  const { type, children, ...other } = props;
  return (
    <Modal {...other}>
      <View style={styles.box}>{children}</View>
    </Modal>
  );
};

export default EditBox;
