import { StyleSheet } from "react-native";

const createStyleSheet = (colors) => {
  return StyleSheet.create({
    box: {
      width: "100%",
      height: "100%",
      flex: 0,
      alignSelf: "center",
      flexDirection: "column",
      //borderTopColor: colors.primary,
      //borderBottomColor: colors.background,
      //borderLeftColor: colors.background,
      //borderRightColor: colors.background,
      //borderTopWidth: 10,
      //borderTopStartRadius: 30,
      //borderTopEndRadius: 30,
      paddingVertical: 30,
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