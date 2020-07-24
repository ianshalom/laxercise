import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var config = {
  apiKey: "AIzaSyC2J8UGAsdEyQ7t18kQggWsVK1lvEzI34E",
  authDomain: "laxercise-82f65.firebaseapp.com",
  databaseURL: "https://laxercise-82f65.firebaseio.com",
  projectId: "laxercise-82f65",
  storageBucket: "laxercise-82f65.appspot.com",
  messagingSenderId: "387750221738",
  appId: "1:387750221738:web:1d0ec9c9d40457d733fdd3",
};

firebase.initializeApp(config);
export default firebase;
