import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyCmjQ-QuDiTXe3YBU7zJQl0g5q-_mPt9UY",
  authDomain: "disrod.netlify.app",
  databaseURL: "https://disrod.netlify.app",
  projectId: "duygudamlas/discord-clone",
  storageBucket: "disrod.netlify.app",
  messagingSenderId: "265446087212",
  appId: "1:265446087212:web:392811aa65680282680f89",
  measurementId: "G-XQPC1S7QLC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
