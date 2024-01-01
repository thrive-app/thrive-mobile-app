import {
    StyleSheet,
    Text,
    View,
    Image,
    useWindowDimensions,
    TouchableOpacity,
    TextInput,
    Button,
    SafeAreaView
} from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'; 
import HatSVG from '../assets/HatSVG'


const LoginEmail = ({ navigation, route }) => {
    const { height, width, scale, fontScale } = useWindowDimensions();
    const hat_logo = "../assets/hat.png"
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        text: {
            color: colors.text,
            paddingLeft: width / 4 - 7
        },
        buttonText: {
            color: "white",
            fontFamily: "DMSansBold",
            fontSize: 16
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
        inputText: {
            fontFamily: "DMSansRegular",
            fontSize: 16
        }
    })

    return (
      <>
      <TouchableOpacity style={{
            backgroundColor: colors.primary,
            borderRadius: 25,
            width: "10%",
            marginTop: 75,
            alignItems: "center"
        }} onPress={() => navigation.navigate("Login")}>
            <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>  
      <SafeAreaView style={styles.container}>
        
        <View className="flex items-center mx-4 space-y-4">
            <HatSVG />
            <View className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput  style={styles.inputText} placeholder="Email" placeholderTextColor={"gray"} />
            </View>

            <View className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput style={styles.inputText} placeholder="Password" placeholderTextColor={"gray"} />
            </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
      </SafeAreaView> 
      </>

    
    )

}

export default LoginEmail