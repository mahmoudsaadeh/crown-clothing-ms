// actions are functions that return objects
// each object is in the correct format that the action is expected to be


export const setCurrentUser = user => ({
    type: 'SET_CURRENT_USER',
    payload: user
})