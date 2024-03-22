import { StyleSheet } from "react-native";

const createStyleSheet = (colors) => {
  return StyleSheet.create({
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
}

export default createStyleSheet;