
import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
    // an array of our input selectors (we can omit using an array here)
    [selectUser],
    // a function that gets the return of the input selector (which is the user reducer in our case)
    (user) => user.currentUser
);

