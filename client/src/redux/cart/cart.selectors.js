
import { createSelector } from "reselect";

/*
    - 2 types of selectors: input selectors that do not use createSelector, and output selectors which use input and createSelector to build themselves
    - input selector is a function that takes the whole state and just returns a slice of it
*/

// the input selector (the state is the one big state we have - in the Store)
const selectCart = (state) => state.cart;

// this is a memoized selector since it uses createSelector to make this selector
export const selectCartItems = createSelector(
    // the first argument is a collection of input selectors defined by an array
    // we can write multiple input selectors separated by commas and without the array symbol
    [selectCart],
    // the 2nd argument is a function that returns the value we want out of this selector
    // in its arguments, we will get the output of every input selector in the array
    (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity
        , 0)
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity * cartItem.price
        , 0)
);

