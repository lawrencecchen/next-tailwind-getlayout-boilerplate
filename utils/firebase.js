import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNy78QOtahv0tUd8GX-buAJa5DR-dPVMU",
  authDomain: "discordstack.firebaseapp.com",
  databaseURL: "https://discordstack.firebaseio.com",
  projectId: "discordstack",
  storageBucket: "discordstack.appspot.com",
  messagingSenderId: "226770896880",
  appId: "1:226770896880:web:c641c5a4f2833eb07b7f35",
  measurementId: "G-W1B859L9JW",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// firebase.analytics();

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { db, storage, auth, firebase };
