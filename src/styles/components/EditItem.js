import { StyleSheet } from "react-native";

const createStyleSheet = (colors) => {
  return StyleSheet.create({
    box: {
      width: "75%",
      alignSelf: "center",
      height: "8%",
      flexDirection: "row",
      flex: 0,
      borderRadius: 10,
      borderColor: "#a6a6a6",
      borderWidth: 1,
      marginTop: 15,
      paddingHorizontal: 15,
      position: "relative",
    },
    star: {
      position: "relative",
      alignSelf: "flex-start",
      width: "10%",
      height: "10%",
      top: "4%",
      flex: 0,
    },
    text: {
      fontSize: 13,
      fontFamily: "DMSansBold",
      color: colors.text,
      bottom: 15,
      position: "relative",
    },
    textContainer: {
      alignSelf: "center",
      alignItems: "flex-start",
      flex: 0,
      width: "70%",
      left: "50%",
      top: "10%",
    },
    menuContainer: {
      flex: 1,
      position: "relative",
    },
    menu: {
      left: "65%",
      top: "20%",
      position: "absolute",
      backgroundColor: colors.background,
    },
    popupContent: {
      backgroundColor: colors.background,
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
      borderColor: colors.primary,
    },
    buttonText: {
      color: "white",
      fontFamily: "DMSansBold",
      textAlign: "center",
      fontSize: 16,
    },
    button: {
      width: "60%",
      borderRadius: 25,
      height: 40,
      marginVertical: 5,
      paddingHorizontal: "8%",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
    smallButton: {
      width: 44,
      borderRadius: 22,
      height: 44,
      marginHorizontal: "5%",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      flex: 0,
    },
    smallButtonContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: "15%",
    },
    titleText: {
      fontFamily: "DMSansRegular",
      fontSize: 18,
      margin: 10,
      flexWrap: "wrap",
      color: colors.text,
      textAlign: "center",
    },
  });
};

export default createStyleSheet;
