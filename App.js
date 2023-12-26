import { StyleSheet,useColorScheme} from 'react-native';
import LoginPage from "./screens/LoginPage";
import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { 
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth } from "./firebaseConfig"
import {GOOGLE_ANDROID_CLIENT_ID, GOOGLE_APPLE_CLIENT_ID, GOOGLE_EXPO_CLIENT_ID} from "@env"
import { Constants } from 'expo-constants';

//const EXPO_REDIRECT_PARAMS = { useProxy: true, projectNameForProxy: '@akshayp1/thrive' };
//const NATIVE_REDIRECT_PARAMS = { native: "myapp://" };
//const REDIRECT_PARAMS = Constants.appOwnership === 'expo' ? EXPO_REDIRECT_PARAMS : NATIVE_REDIRECT_PARAMS;
//const redirectUri = AuthSession.makeRedirectUri(REDIRECT_PARAMS);

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const Stack = createNativeStackNavigator();
  const scheme = useColorScheme();
  const DefaultTheme = {
    dark: false,
    colors: {
      primary: 'rgb(140,82,255)', //purple
      background: 'rgb(248,246,253)', //very pale purple
      card: 'rgb(9,6,16)', //purple-tinted black
      text: 'rgb(0,0,0)', //black
      border: 'rgb(9,6,16)', //purple-tinted black
      notification: 'rgb(255,99,71)' //tomato
    }
  }


  const DarkTheme = {
    dark: true,
    colors: {
      primary: 'rgb(140,82,255)', //purple
      background: 'rgb(9,6,16)', //purple-tinted black
      card: 'rgb(248,246,253)', //very pale purple
      text: 'rgb(255,255,255)', //white
      border: 'rgb(248,246,253)', //very pale purple
      notification: 'rgb(255,99,71)' //tomato
    }
  }


  const [userInfo, setUserInfo] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: GOOGLE_APPLE_CLIENT_ID, 
    expoClientId: GOOGLE_EXPO_CLIENT_ID
  });

  useEffect(() => {
    if(response?.type == "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token)
      signInWithCredential(auth, credential);
    }
  }, [response])

  return (
    <LoginPage async={() => {promptAsync()}} theme={scheme === 'dark' ? DarkTheme : DefaultTheme} />
    //<NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      //<Stack.Navigator>
        //<Stack.Screen
          //options={{headerShown: false}}
          //name="Login"
          //component={LoginPage}
          //initialParams={{async: () => {promptAsync()}}} />
      //</Stack.Navigator>
    //</NavigationContainer>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
