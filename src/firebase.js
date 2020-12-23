import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyCmjQ-QuDiTXe3YBU7zJQl0g5q-_mPt9UY",
  authDomain: "discrod.netlify.app",
  databaseURL: "discrod.netlify.app",
  projectId: "",
  storageBucket: "discrod.netlify.app",
  messagingSenderId: "265446087212",
  appId: "98c73a2e-bc83-4b4e-a5c5-f22f0eb5a09e",
  measurementId: "G-XQPC1S7QLC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
