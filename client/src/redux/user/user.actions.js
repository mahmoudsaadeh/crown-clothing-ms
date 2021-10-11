// actions are functions that return objects
// each object is in the correct format that the action is expected to be

// import { UserActionTypes } from "./user.types";
import UserActionTypes from "./user.types";

/*export const setCurrentUser = (user) => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
});*/



export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
});

// email and password are passed as a whole object here
export const emailSignInStart = (emailAndPassword) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

export const signInSuccess = (user) => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = (error) => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
});



// recreating persistence
export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
});


// Sign Out
export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = (error) => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
});



// userCredentials = {email, password, displayName}
export const signUpStart = (userCredentials) => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: userCredentials
});

// we can pass them as a whole object as well, it's a personal preference
// we made like this because it makes it more clear of what data we are passing
export const signUpSuccess = ({ user, additionalData }) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalData }
});

export const signUpFailure = (error) => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: error
});