import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import EditIconSVG from "../assets/EditIconSVG";


export const ContentBox = ({ props, children }) => {
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
      paddingHorizontal: 15
    },
    edit: {
      position: "relative",
      alignSelf: "flex-end",
    },
  });
  return (
    <View {...props} style={styles.box}>
      <View style={styles.edit}>
        <EditIconSVG />
      </View>
      {children}
    </View>
  );
};

export default ContentBox;
