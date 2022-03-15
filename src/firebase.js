import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseApp= firebase.initializeApp({
    apiKey: "AIzaSyDZ3C8sEf9AhKFg-Q1Ix7Mj29WtQPaAMJg",
    authDomain: "messanger-5f4ad.firebaseapp.com",
    projectId: "messanger-5f4ad",
    storageBucket: "messanger-5f4ad.appspot.com",
    messagingSenderId: "915888823237",
    appId: "1:915888823237:web:5d742de6fc11e1ec7489ac",
    measurementId: "G-3NKTDYW3W4"

})
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };