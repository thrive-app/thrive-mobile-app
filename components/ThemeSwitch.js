import { useContext, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Switch } from 'react-native'
import ThemeContext from "../contexts/ThemeContext";

const ThemeSwitch = () => {
    const { theme, toggleTheme }  = useContext(ThemeContext)

    const handleToggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        toggleTheme(newTheme)
    }

    const [isEnabled, setIsEnabled] = useState(false)

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
        handleToggleTheme()
    }

    const { colors } = useTheme();
    return (
        <Switch 
          trackColor={{false: "#d3d3d3", true: "#a9a9a9"}}
          thumbColor={colors.primary}
          ios_backgroundColor={colors.background}
          onValueChange={toggleSwitch}
          value={isEnabled}
          />
    )
}

export default ThemeSwitch