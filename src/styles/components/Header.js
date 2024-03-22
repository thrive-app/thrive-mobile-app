import { StyleSheet } from "react-native";

const createStyleSheet = (colors) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      height: "12%",
      borderBottomColor: "#d9d7d7",
      flexDirection: "row",
      flex: 0,
      borderWidth: 1,
      borderLeftColor: colors.background,
      borderRightColor: colors.background,
      borderTopColor: colors.background,
      padding: 10,
    },
  });
};

export default createStyleSheet;
