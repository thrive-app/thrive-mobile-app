import { View } from "react-native";
import { useTheme } from "@react-navigation/native";

//import RN stylesheet from separate file; functions similar to CSS
import createStyleSheet from "../styles/components/ContentBox";
import EditIconSVG from "../assets/svg/EditIconSVG";
import HelpSVG from "../assets/svg/HelpSVG";

//reusable custom RN component for each section of the profile

const ContentBox = (props) => {
  const { colors } = useTheme();
  const styles = createStyleSheet(colors);
  return (
    <View style={styles.box}>
      <View>
          <HelpSVG onPress={props.onPressHelp} />
        </View>
      <View style={styles.edit}>
        <EditIconSVG color="#cecece" onPress={props.onPress} />
      </View>
      {
        // returns whatever is enclosed between the <ContextBox> tags
        props.children
      }
    </View>
  );
};

export default ContentBox;



