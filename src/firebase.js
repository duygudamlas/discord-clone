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
  appId: "1:e6e3c9f1-e6d6-46c9-8219-4aec55f8b868",
  measurementId: "G-XQPC1S7QLC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
