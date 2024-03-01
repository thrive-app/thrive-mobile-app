import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";


function createNewUser (userId) {
  const userRef = firestore().collection("users").doc(userId);
  const user = auth().currentUser;
  const date = new Date();
  

  userRef.get().then((docSnapshot) => {
    if (!docSnapshot.exists) {
      const userName = user.displayName.split(" ");
      let lastName = "";
      for (i = 1; i < userName.length; i++) {
        lastName += userName[i] + " ";
      }
      const userData = {
        userId: user.uid,
        dateCreated: date.getTime(),
        firstName: userName[0],
        lastName: lastName,
        email: user.email,
        profileImage: user.photoURL,
        school: "",
        about: "",
        grade: -1
      };
      userRef.set(userData);
    }
  });
};

export default createNewUser;
