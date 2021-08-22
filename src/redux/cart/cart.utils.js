
/* Utility functions allow us to keep our files clean and organize functions that we may need in multiple files in 1 location */
/*
    They are mostly used when using dispatch in our components (when we want to alter our state based on specific conditions or user interactions)
*/

// cartItems: all the existing items in our array right now
// cartItemToAdd: used to check the the item we want to add already exists
export const addItemToCart = (cartItems, cartItemToAdd) => {
    // cartItem: represents every existing item in our array, we then compare it with the item we want to add
    // if condition is true, it will set the cartItem value to our const, else, will return undefined
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    // this block will not run if we add an item for the 1st time
    if (existingCartItem) {
        // we use map() because we want to return a new array (new versions of our state) so that our components re-render
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id
            // check spread operator meaning in my notes
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem // return existing cartItem because no need to re-render if no changes happened
        );
    }

    // if cartItem not found in our array
    return [...cartItems, {...cartItemToAdd, quantity: 1}]
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    return cartItems.map(cartItem => 
        cartItem.id === cartItemToRemove.id ?
        { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    )
};