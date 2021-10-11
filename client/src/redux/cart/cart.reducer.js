
//import { addItem } from './cart.actions';
import CartActionTypes from './cart.types';

import { addItemToCart, removeItemFromCart } from './cart.utils';

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
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
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                // spreading out existing cart items first, then getting any added elements to the array
                // it is important to make sure that we return a NEW array, because if we return the same one, React will not re-render the component (so every time, a new array or object should be returned in order to tackle changes)
                cartItems: addItemToCart(state.cartItems, action.payload)
            }
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            }
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                // action.payload: the item that we're trying to remove
                // filter: if condition is false, it will remove the item from the array and return a new array
                cartItems: state.cartItems.filter(cartItem =>
                    cartItem.id !== action.payload.id
                )
            }
        case CartActionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }
        default:
            return state;
    }
};

export default cartReducer;