import {signInWithCustomToken } from "firebase/auth";
import Toast from "react-native-toast-message";

const signInWithClerk = async (auth, getToken) => {
    const token = await getToken({ template: "integration_firebase" });
    console.log("yes")
    signInWithCustomToken(auth, token).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Toast.show({
            type: "error",
            text1: "Error" + errorCode,
            text2: errorMessage,
        });
    });
    console.log("yes")
};

export default signInWithClerk;