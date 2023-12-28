import { 
        API_KEY,
        AUTH_DOMAIN,
        PROJECT_ID,
        STORAGE_BUCKET,
        MESSAGING_SENDER_ID,
        APP_ID,
        MEASUREMENT_ID,
        
} from "@env"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage"
import { useAuth } from "@clerk/clerk-expo";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};


  const { getToken } = useAuth();

  useEffect(() => {
    const signInWithClerk = async () => {
      const auth = getAuth();
      const token = await getToken({ template: "integration_firebase" });
      const userCredentials = await signInWithCustomToken(auth, token);
 
      /**
       * The userCredentials.user object will call the methods of
       * the Firebase platform as an authenticated user.
       */
      console.log("user ::", userCredentials.user);
    };

    signInWithClerk()
}, []);


// Initialize Firebase
//const app = initializeApp(firebaseConfig);

//const auth = getAuth();

const storage = getStorage(app);

export { app, storage, auth }