import { StyleSheet } from "react-native";

const createStyleSheet = (colors) => {
  return StyleSheet.create({
    image: {
      alignSelf: "center",
      padding: "20%",
      marginTop: "10%",
    },
    text: {
      color: colors.text,
      fontSize: 18,
      fontFamily: "DMSansBold",
      padding: "5%",
      textAlign: "center",
      alignSelf: "center",
    },
    buttonText: {
      color: "white",
      fontFamily: "DMSansMedium",
      textAlign: "center",
      fontSize: 16,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignContent: "center",
      justifyContent: "center",
    },
    button: {
      backgroundColor: colors.primary,
      width: "80%",
      borderRadius: 25,
      height: 50,
      marginTop: 10,
      marginBottom: 10,
      marginHorizontal: "8%",
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "center",
      padding: 10,
      gap: 15,
    },
    logo: {
      left: "2%",
    },
    icons: {
      position: "relative",
      paddingRight: 10,
    },
    tabView: {
      backgroundColor: colors.background,
      marginBottom: 15,
    },
    popupContent: {
      backgroundColor: colors.background,
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
      borderColor: colors.primary,
      height: "60%"
    },
    description: {
      fontFamily: "DMSansMedium",
      fontSize: 14,
      flex: 1,
      flexWrap: "wrap",
      color: colors.subheading,
      marginLeft: 10,
      marginBottom: 5,
      flexWrap: "wrap"
    },
  });
};

export default createStyleSheet;
