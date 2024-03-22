import { useContext, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Switch } from "react-native";
import ThemeContext from "../contexts/ThemeContext";

const ThemeSwitch = (props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleToggleTheme = () => {
    toggleTheme(theme === "light" ? "dark" : "light");
  };

  const [isEnabled, setIsEnabled] = useState(theme === "light" ? false : true);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    handleToggleTheme();
  };

  const { colors } = useTheme();
  return (
    <Switch
      {...props}
      trackColor={{ false: "#d3d3d3", true: "#a9a9a9" }}
      thumbColor={colors.primary}
      ios_backgroundColor={colors.background}
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
};

export default ThemeSwitch;
