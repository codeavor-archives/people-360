import firestore from "firebase/app";

import "firebase/auth";
import "firebase/database";
import "firebase/firebase-database";
import "firebase/storage";
import "firebase/firestore";
import "firebase/functions";

var firebaseConfig = {
  apiKey: "AIzaSyBpIhGX6btKyiYTs9VDRkW7wmvl1Sm9NnY",
  authDomain: "people360-6f049.firebaseapp.com",
  databaseURL: "https://people360-6f049.firebaseio.com",
  projectId: "people360-6f049",
  storageBucket: "people360-6f049.appspot.com",
  messagingSenderId: "523808914777",
  appId: "1:523808914777:web:dd4d1b88d325d44d236048"
};
// Initialize Firebase
const fsfb = firestore.initializeApp(firebaseConfig);
const fsdb = fb.database();
const fsfc = firestore.functions();

export { fsfb, fsdb, fsfc };
