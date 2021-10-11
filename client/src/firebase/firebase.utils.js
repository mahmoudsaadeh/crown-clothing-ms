
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

    // A Document Reference
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    // console.log(userRef);

    // A Collection Reference
    /*const collectionRef = firestore.collection('users');*/

    // A Document Snapshot
    const snapshot = await userRef.get();
    // console.log(snapshot);
    // console.log(snapshot.data());

    // A Collection Snapshot
    /*const collectionSnapshot = await collectionRef.get();
    console.log({ collectionSnapshot });
    console.log({ collection: collectionSnapshot.docs.map(doc => doc.data()) });*/


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
};

// moving shop data to firebase. This method can be used to add any new collection and/or docs to our db PROGRAMMATICALLY!
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    //console.log(collectionRef);

    const batch = firestore.batch();
    /* forEach is the same as .map(), except this does not return a new array as .map() */
    objectsToAdd.forEach(obj => {
        // we want it to get the doc at an empty string. What this will do is that firebase will give me a new document reference in this collection and randomly generate an id for me
        const newDocRef = collectionRef.doc();
        // we can use the title instead of the id, but to ensure unique keys, we'll use an id
        // const newDocRef = collectionRef.doc(obj.title);
        // console.log(newDocRef);
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

// we want to convert the snapshot to an object instead of the array that we're going to get back
export const convertCollectionsSnapshotToMap = (collections) => {
    // here we store the array of objects that we get from firebase
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        // the returned value (object) will be stored as an element in the transformedCollection array
        return {
            /* encodeURI returns a string that is good to be passed in a url (it removes spaces or any other characters that a url cannot read) */
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });

    // console.log(transformedCollection);

    /*
        - change our array we got into an object to store in our reducer
        - the initial value of the accumulator is an empty object
    */
    return transformedCollection.reduce((accumulator, collection) => {
        // in our case, we have 5 collection titles
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});

};

// we are just mimicking functionality that you may encounter when you don't have firebase as the backend - we will use a promise oriented solution that our sagas can yield for
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// setting up the google authentication utility
// this gives us access to this new GoogleAuthProvider class from the auth library
// const provider = new firebase.auth.GoogleAuthProvider(); // before saga
export const googleProvider = new firebase.auth.GoogleAuthProvider();


// we want to always trigger the google popup whenever we use this GoogleAuthProvider
// for sign in and authentication
//provider.setCustomParameters({ prompt: 'select_account' }); // before saga
googleProvider.setCustomParameters({ prompt: 'select_account' });

// export const signInWithGoogle = () => auth.signInWithPopup(provider); // before saga
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);


export default firebase;