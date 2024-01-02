import { StyleSheet, View } from 'react-native'
import LightLogoSVG from '../assets/LightLogoSVG'
import DarkLogoSVG from '../assets/DarkLogoSVG'
import SettingsSVG from '../assets/SettingsSVG'
import { useTheme } from '@react-navigation/native'
import { useContext } from 'react'
import ThemeContext from '../contexts/ThemeContext'
import { DarkTheme } from '../themes'

export const Header = ({props}) => {
    const theme = useTheme()

    const logoToUse = theme === DarkTheme ? <DarkLogoSVG width={130} height={50}/> : <LightLogoSVG width={130} height={50} />

    const styles = StyleSheet.create({
        container: {
            width:"100%",
            height:"10%",
            borderBottomColor: "#d9d7d7",
            flexDirection: "row",
            flex: 0,
            borderWidth: 1,
            borderLeftColor: theme.colors.background,
            borderRightColor: theme.colors.background,
            borderTopColor: theme.colors.background,
            padding: 10
        },
        settings: {
            position: "relative",
            marginLeft: "50%",
            marginTop: "2%"
        }
    })
    return (
        <View style={styles.container} >
            {logoToUse}
            <SettingsSVG
                {...props}
                width={40}
                height={40}
                style={styles.settings} />
        </View>
    )
}

export default Header