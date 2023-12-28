import {
    StyleSheet,
    Text,
    View,
    Image,
    useWindowDimensions,
    TouchableOpacity,
    TextInput,
    Button
} from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'


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
                    require(hat_logo)
                }
            />
            
                
            <TextInput placeholder="Email" placeholderTextColor={"gray"} />
            <TextInput placeholder="Password" placeholderTextColor={"gray"} />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Button title="Go back" onPress={() => {navigation.navigate("Login")}} />
        </View>
    )

}

export default LoginEmail