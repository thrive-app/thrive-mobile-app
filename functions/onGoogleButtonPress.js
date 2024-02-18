import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GOOGLE_WEB_CLIENT_ID } from "@env"
import { useDispatch } from "react-redux";
import { getData } from "../redux/store";
import auth from "@react-native-firebase/auth"
import createNewUser from "./createNewUser";

GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID
})

const onGoogleButtonPress = async() => {
    //const dispatch = useDispatch();
    //check if device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

    //get the user's ID token
    const { idToken } = await GoogleSignin.signIn()

    //create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    await auth().signInWithCredential(googleCredential)

    createNewUser(auth().currentUser.uid)

    //dispatch(getData(true))
}
export default onGoogleButtonPress
