import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GOOGLE_WEB_CLIENT_ID } from "@env"
import createNewUser from "./createNewUser";
import auth from "@react-native-firebase/auth"
GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID
})

async function onGoogleButtonPress() {
    //check if device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

    //get the user's ID token
    const { idToken } = await GoogleSignin.signIn()

    //create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    return auth().signInWithCredential(googleCredential)

}
export default onGoogleButtonPress
