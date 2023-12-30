import { 
    createContext,
    useState,
    useEffect
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert, useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const colorScheme = useColorScheme()
    const [theme, setTheme] = useState(colorScheme || 'light')

    useEffect(() => {
        //load saved theme from async storage
        const getTheme = async() => {
            try {
                const savedTheme = await AsyncStorage.getItem('theme')
                if (savedTheme) {
                    setTheme(savedTheme)
                }
            } catch (error) {
                Alert.alert('Error', 'Theme could not be loaded')
            }
        }
        getTheme()
    }, [])

    useEffect(() => {
        //set theme to system theme
        if(colorScheme) {
            setTheme(colorScheme)
        }
    }, [colorScheme])

    const toggleTheme = (newTheme) => {
        setTheme(newTheme);
        AsyncStorage.setItem('theme', newTheme)
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>

    )
}

export default ThemeContext 

