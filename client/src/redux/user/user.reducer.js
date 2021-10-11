
// import { UserActionTypes } from "./user.types"; // importing a normal exported object

import UserActionTypes from './user.types'; // importing a default exported object

const INITIAL_STATE = {
    currentUser: null,
    error: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    // if-else statements can be used also
    switch (action.type) {
        // stacking cases with common return statement
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            }
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
};

export default userReducer;


/*
const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    // if-else statements can be used also
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
};

export default userReducer;
*/

/*
    - The state is gonna be something that the redux Store is going to pass to this reducer whenever an action fires. The state will be whatever the state is currently when that actions gets fired.
    - When the App first initializes, there will be no state. When an action gets fired, there gonna be no state, so we should set an initial state. (as in the default state in React)
    - If state is undefined, we set it to an initial value. (this is a new feature in ES6)
    - Every single reducer gets every single action that gets fired even if the actions are not related to this reducer. So the reason for the default returned state is because if non of the action types match inside of our switch statement about the ones that we care about, then we return the current state.
    - ...state: we spread in everything on the state because we only want to modify the values that we care about
*/