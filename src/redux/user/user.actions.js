// actions are functions that return objects
// each object is in the correct format that the action is expected to be

import { UserActionTypes } from "./user.types";

export const setCurrentUser = (user) => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
});
