
/* Utility functions allow us to keep our files clean and organize functions that we may need in multiple files in 1 location */

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
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem // return existing cartItem because no need to re-render if no changes happened
        );
    }

    // if cartItem not found in our array
    return [...cartItems, {...cartItemToAdd, quantity: 1}]
}