import { StyleSheet } from "react-native";

const createStyleSheet = (colors, width) => {
  return StyleSheet.create({
    text: {
      color: colors.text,
      paddingLeft: width / 4 - 7,
    },
    buttonText: {
      color: "white",
      fontFamily: "DMSansBold",
      fontSize: 16,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    button: {
      backgroundColor: colors.primary,
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
      marginBottom: 10,
      alignSelf: "center",
    },
    inputText: {
      fontSize: 13,
      color: "#000000",
      fontFamily: "DMSansRegular",
      backgroundColor: "#ececec",
      width: "100%",
      padding: 8,
      borderRadius: 16,
      marginTop: 8,
      marginBottom: 10,
    },
    image: {
      alignSelf: "center",
      margin: "5%",
    },
  })
};

export default createStyleSheet;
