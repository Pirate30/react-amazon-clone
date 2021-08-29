// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyA12Ncjjl6Bcc5KwFCYXdRAYzJV5P_erNU",
    authDomain: "react-2341b.firebaseapp.com",
    projectId: "react-2341b",
    storageBucket: "react-2341b.appspot.com",
    messagingSenderId: "689338418640",
    appId: "1:689338418640:web:d80adccf3bc8e8380325d5",
    measurementId: "G-T7KGHDDKX2"
  };

// creating the app
const firebaseApp = firebase.initializeApp(firebaseConfig);

// making db
const db = firebaseApp.firestore();

// making auth
const auth = firebaseApp.auth();

export {db,auth};