import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDgcpf6Q4Czp0beQlc0tCn8e8qJFHbkfXI",
    authDomain: "crown-clothing-db-3eef9.firebaseapp.com",
    projectId: "crown-clothing-db-3eef9",
    storageBucket: "crown-clothing-db-3eef9.appspot.com",
    messagingSenderId: "445281452779",
    appId: "1:445281452779:web:f0f2f8dc2272c73e8034ae",
    measurementId: "G-ZKC6DEE04Z"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// setting up the google authentication utility
// this gives us access to this new GoogleAuthProvider class from the auth library
const provider = new firebase.auth.GoogleAuthProvider();
// we want to always trigger the google popup whenever we use this GoogleAuthProvider
// for sign in and authentication
provider.setCustomParameters({prompt: 'select_account'});


export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;