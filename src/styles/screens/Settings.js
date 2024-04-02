import { StyleSheet } from "react-native";

const createStyleSheet = (colors) => {
  return StyleSheet.create({
    text: {
      color: colors.text,
      fontSize: 24,
      fontFamily: "DMSansBold",
      paddingLeft: "18%",
      paddingRight: "5%",
      textAlign: "center",
      alignSelf: "center",
    },
    container: {
      alignContent: "center",
      justifyContent: "center",
      flex: 0,
    },
    backButton: {
      backgroundColor: colors.primary,
      borderRadius: 25,
      width: "10%",
      marginLeft: 20,
      margin: 75,
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontFamily: "DMSansBold",
      textAlign: "center",
      fontSize: 16,
    },
    button: {
      backgroundColor: "red",
      width: "80%",
      borderRadius: 25,
      height: 50,
      marginVertical: "50%",
      marginHorizontal: "8%",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
    inputText: {
      fontSize: 12,
      width: "75%",
      left: 10,
      color: colors.text,
      fontFamily: "DMSansRegular",
      padding: 5,
      borderRadius: 16,
      marginTop: "10%",
      marginBottom: 10,
      borderColor: "#ececec",
      borderWidth: 1,
      flex: 0,
    },
    button2: {
      width: "90%",
      borderRadius: 25,
      height: 40,
      marginVertical: 5,
      marginHorizontal: "8%",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
  });
};

export default createStyleSheet;
