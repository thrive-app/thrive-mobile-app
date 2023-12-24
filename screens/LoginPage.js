import { StyleSheet,
         Text,
         View,
         SafeAreaView,
         Image,
         useColorScheme,
         useWindowDimensions,
         TouchableOpacity} from 'react-native'
import React from 'react'
import {useTheme} from '@react-navigation/native'
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons"


const LoginPage = () => {
  const {height, width, scale, fontScale} = useWindowDimensions();
  const dark_logo = "../app_assets/dark_logo.png"
  const light_logo = "../app_assets/light_logo.png"
  const scheme = useColorScheme();
  const { colors } = useTheme();
  console.log(scheme === "dark" ? dark_logo : light_logo)

  const styles = StyleSheet.create({
    text: {
        color: colors.text,
        paddingLeft: width/4 - 7
    },
    buttonText : {
        color: "white",
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignContent: "center",
        justifyContent: "center"
      },
    button: {
        backgroundColor: colors.primary,
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
        padding: 10
    },
})


  return (
    <View style={styles.container}>
         <Image
        source={
          require(light_logo)
        }
      />
      <Text style={styles.text}>Your future at your fingertips.</Text>
      
      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="email-outline" size={32} color="white"/>
        <Text style={styles.buttonText}>Register with Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <SimpleLineIcons name="social-google" size={32} color="white"/>
        <Text style={styles.buttonText}>Register with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <SimpleLineIcons name="social-linkedin" size={32} color="white"/>
        <Text style={styles.buttonText}>Register with LinkedIn</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginPage

