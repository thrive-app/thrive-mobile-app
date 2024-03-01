import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import EditIconSVG from "../assets/svg/EditIconSVG";

export const ContentBox = (props) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    box: {
      width: "95%",
      flex: 1,
      alignSelf: "center",
      flexDirection: "column",
      borderRadius: 30,
      borderColor: colors.primary,
      borderWidth: 1,
      paddingVertical: 30,
      marginTop: 15,
      paddingHorizontal: 15,
    },
    edit: {
      position: "relative",
      alignSelf: "flex-end",
      width: 24,
      height: 24,
    },
  });
  return (
    <View style={styles.box}>
      <View style={styles.edit}>
        <EditIconSVG onPress={props.onPress}/>
      </View>
      {props.children}
    </View>
  );
};

export default ContentBox;
