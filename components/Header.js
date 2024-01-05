import { StyleSheet, View, TouchableOpacity } from "react-native";
import LightLogoSVG from "../assets/svg/LightLogoSVG";
import DarkLogoSVG from "../assets/svg/DarkLogoSVG";
import SettingsSVG from "../assets/svg/SettingsSVG";
import { useTheme } from "@react-navigation/native";
import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";
import { DarkTheme } from "../themes";

export const Header = ({ props, children }) => {
  const theme = useTheme();

  const logoToUse =
    theme === DarkTheme ? (
      <DarkLogoSVG width={130} height={50} />
    ) : (
      <LightLogoSVG width={130} height={50} />
    );

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "12%",
      borderBottomColor: "#d9d7d7",
      flexDirection: "row",
      flex: 0,
      borderWidth: 1,
      borderLeftColor: theme.colors.background,
      borderRightColor: theme.colors.background,
      borderTopColor: theme.colors.background,
      padding: 10,
    },
  });
  return (
    <View style={styles.container}>
      {logoToUse}
      {children}
    </View>
  );
};

export default Header;
