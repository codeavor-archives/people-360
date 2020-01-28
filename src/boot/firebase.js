import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";
import "firebase/firebase-database";
import "firebase/storage";
import "firebase/firestore";
import "firebase/functions";

import Vue from "vue";
import VueFirestore from "vue-firestore";
Vue.use(VueFirestore, {
  key: "id",
  enumerable: true
});

var firebaseConfig = {
  apiKey: "AIzaSyDJjzQofEuZo2tpwU-1U-7GLu_JXaTG4fQ",
  authDomain: "asset-management-5f4bd.firebaseapp.com",
  databaseURL: "https://asset-management-5f4bd.firebaseio.com",
  projectId: "asset-management-5f4bd",
  storageBucket: "asset-management-5f4bd.appspot.com",
  messagingSenderId: "989375581503",
  appId: "1:989375581503:web:27a2194890eba2b6ee978a",
  measurementId: "G-RZ8E8QG1B9"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = fb.database();
const fc = firebase.functions();
const fs = firebase.firestore();

export { fb, db, fc, fs };
