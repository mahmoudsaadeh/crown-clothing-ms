
import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";

/*
    - A key in this root state represents the individual slices of state 
*/
export default combineReducers({
    user: userReducer
})