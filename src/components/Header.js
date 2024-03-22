import { View } from "react-native";
import LightLogoSVG from "../assets/svg/LightLogoSVG";
import DarkLogoSVG from "../assets/svg/DarkLogoSVG";
import { useTheme } from "@react-navigation/native";
import { DarkTheme } from "../themes";
import createStyleSheet from "../styles/components/Header";

export const Header = (props) => {
  const theme = useTheme();
  const styles = createStyleSheet(theme.colors)

  const logoToUse =
    theme === DarkTheme ? (
      <DarkLogoSVG width={130} height={50} />
    ) : (
      <LightLogoSVG width={130} height={50} />
    );

  
  return (
    <View style={styles.container}>
      {logoToUse}
      {props.children}
    </View>
  );
};

export default Header;
