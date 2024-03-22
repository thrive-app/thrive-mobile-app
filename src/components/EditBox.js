import Modal from "react-native-modal";
import { View } from "react-native";
import createStyleSheet from "../styles/components/EditBox";
import { useTheme } from "@react-navigation/native";

const EditBox = (props) => {
  const { colors } = useTheme();
  const styles = createStyleSheet(colors);

  const { type, children, ...other } = props;
  return (
    <Modal {...other}>
      <View style={styles.box}>{children}</View>
    </Modal>
  );
};

export default EditBox;
