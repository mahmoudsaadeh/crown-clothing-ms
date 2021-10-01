
import { takeLatest, put, all, call } from "redux-saga/effects";
import UserActionTypes from "./user.types";
import {
    auth,
    googleProvider,
    createUserProfileDocument,
    getCurrentUser
} from "../../firebase/firebase.utils";
import {
    signInFailure,
    signInSuccess,
    signOutFailure,
    signOutSuccess,
    signUpFailure,
    signUpSuccess
} from "./user.actions";


// additionalData: it is an optional parameter as in firebase.utils
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        // same as: const userRef = createUserProfileDocument(user);
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        yield put(signInFailure(error));
    }
}


// The worker saga is running all the side effects it was meant to do
// Worker Sagas
export function* signInWithGoogle() {
    try {
        // we called signInWithPopup here instead from in firebase.utils file because we want to access the returned value
        const { user } = yield auth.signInWithPopup(googleProvider);
        // a generator function can call another generator function as the case here
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        // the error here is kept because signInWithPopup might also fail
        yield put(signInFailure(error));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        // a generator function can call another generator function as the case here
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        // the error here is kept because signInWithEmailAndPassword might also fail
        yield put(signInFailure(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();

        if (!userAuth) {
            return;
        }
        //else {
        yield getSnapshotFromUserAuth(userAuth);
        //}
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, additionalData: { displayName } }));
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

// OR: signUpSuccess
export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapshotFromUserAuth(user, additionalData);
}


// Watcher saga sees every action that is dispatched to the redux store; if it matches the action it is told to handle, it will assign it to its worker saga
// The watcher saga is typically the root saga to export and mount on the store
// Watcher Sagas
export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}



export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
};