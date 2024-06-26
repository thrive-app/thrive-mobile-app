import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GOOGLE_WEB_CLIENT_ID } from "@env";
import auth from "@react-native-firebase/auth";
import createNewUser from "./createNewUser";

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
});

const onGoogleButtonPress = async () => {
  //check if device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

  //get the user's ID token
  const { idToken } = await GoogleSignin.signIn();

  //create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  await auth().signInWithCredential(googleCredential);

  createNewUser(auth().currentUser.uid);
};
export default onGoogleButtonPress;
