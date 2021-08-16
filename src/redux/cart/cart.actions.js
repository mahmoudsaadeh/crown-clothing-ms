

import { CartActionTypes } from "./cart.types";


/*
payload is an optional property in our action object
*/
export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
});