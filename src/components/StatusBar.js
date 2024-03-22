import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";

export const BetterStatusBar = () => {
    const { theme } = useContext(ThemeContext)
    return (
        <StatusBar style={theme === "dark" ? "light" : "dark"} />
    )
}

export default BetterStatusBar