import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// https://react-firebase-js.com/docs/react-firebase-auth/getting-started

const config = {
    apiKey: "AIzaSyDgcpf6Q4Czp0beQlc0tCn8e8qJFHbkfXI",
    authDomain: "crown-clothing-db-3eef9.firebaseapp.com",
    projectId: "crown-clothing-db-3eef9",
    storageBucket: "crown-clothing-db-3eef9.appspot.com",
    messagingSenderId: "445281452779",
    appId: "1:445281452779:web:f0f2f8dc2272c73e8034ae",
    measurementId: "G-ZKC6DEE04Z"
};

// is will be an async action because we're making an API request
export const createUserProfileDocument = async (userAuth, additionalData) => {
    // if user is not signed in (does not exist OR null), then leave this func
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    //console.log(snapshot);

    // if snapshot doesn't exits -> no data found, so we will add some
    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date(); // returns current date and time

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// setting up the google authentication utility
// this gives us access to this new GoogleAuthProvider class from the auth library
const provider = new firebase.auth.GoogleAuthProvider();
// we want to always trigger the google popup whenever we use this GoogleAuthProvider
// for sign in and authentication
provider.setCustomParameters({ prompt: 'select_account' });


export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;