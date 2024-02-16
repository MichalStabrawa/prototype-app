import 'fast-text-encoding';

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyBeUJ8vZecdYx2XhqNN6RLJydTjQ39N_2M",
  //  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: "budget-app-1a588",
  //   storageBucket: 'YOUR_STORAGE_BUCKET',
  //  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  //  appId: 'YOUR_APP_ID',
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

export { auth, database };
; // Export this if you're using Realtime Database