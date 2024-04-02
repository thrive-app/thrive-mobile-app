import ReactNativeModal from "react-native-modal";
import { View } from "react-native";
import createStyleSheet from "../styles/components/EditBox";
import { useTheme } from "@react-navigation/native";

const EditBox = (props) => {
  const { colors } = useTheme();
  const styles = createStyleSheet(colors);

  const { type, children, ...other } = props;
  return (
    
      <View {...other} style={styles.box}>{children}</View>
      
  );
};

export default EditBox;
