
// used to maintained consistency that may be threatened by typos

/*
// before using sagas
export const UserActionTypes = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}*/

// using promises instead of observer pattern to sign in
/*const UserActionTypes = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
    GOOGLE_SIGN_IN_START: 'GOOGLE_SIGN_IN_START',
    GOOGLE_SIGN_IN_SUCCESS: 'GOOGLE_SIGN_IN_SUCCESS',
    GOOGLE_SIGN_IN_FAILURE: 'GOOGLE_SIGN_IN_FAILURE',
    EMAIL_SIGN_IN_START: 'EMAIL_SIGN_IN_START',
    EMAIL_SIGN_IN_SUCCESS: 'EMAIL_SIGN_IN_SUCCESS',
    EMAIL_SIGN_IN_FAILURE: 'EMAIL_SIGN_IN_FAILURE'
};*/

// refactoring because the the success and failure saga code for both sign in methods is the same
const UserActionTypes = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
    GOOGLE_SIGN_IN_START: 'GOOGLE_SIGN_IN_START',
    EMAIL_SIGN_IN_START: 'EMAIL_SIGN_IN_START',
    SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
    SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',
    CHECK_USER_SESSION: 'CHECK_USER_SESSION',
    SIGN_OUT_START: 'SIGN_OUT_START',
    SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
    SIGN_OUT_FAILURE: 'SIGN_OUT_FAILURE',
    SIGN_UP_START: 'SIGN_UP_START',
    SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
    SIGN_UP_FAILURE: 'SIGN_UP_FAILURE'
};

export default UserActionTypes;