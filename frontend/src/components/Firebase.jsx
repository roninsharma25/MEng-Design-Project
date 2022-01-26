import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDMnbOnzFADuB_guQU2pC2KtGtS-iQAgiU",
    authDomain: "letmeout-51bc0.firebaseapp.com",
    projectId: "letmeout-51bc0",
    storageBucket: "letmeout-51bc0.appspot.com",
    messagingSenderId: "1059319004976",
    appId: "1:1059319004976:web:5ec991d1baa1a0391952f5",
    measurementId: "G-HX69S0DZG2"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
