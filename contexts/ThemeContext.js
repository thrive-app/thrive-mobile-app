import { createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDarkMode } from "../redux/state";


const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const oldTheme = useSelector((state) => state.store.value.darkMode)
  const [theme, setTheme] = useState(oldTheme);
  const dispatch = useDispatch()


  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    dispatch(updateDarkMode(theme))
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
