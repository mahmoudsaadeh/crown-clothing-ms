
import CartActionTypes from './cart.types';

const INITIAL_STATE = {
    hidden: true
};

// here we are not returning an object as in user, we are just toggling the initial state
// so no need to provide payload in cart actions js file
const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        default:
            return state;
    }
};

export default cartReducer;