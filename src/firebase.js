import firebase from "firebase";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDCa3x6mqXYJeZOdfMZ5G9-WrO-a-6_Ax0",
    authDomain: "disney-clone-2b7ed.firebaseapp.com",
    projectId: "disney-clone-2b7ed",
    storageBucket: "disney-clone-2b7ed.appspot.com",
    messagingSenderId: "205768991968",
    appId: "1:205768991968:web:023e4e15d2d329e875dc85",
    measurementId: "G-DDLCY58TV1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage }

export default db;