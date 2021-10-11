
import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

import { persistReducer } from "redux-persist";
// I want to use local storage as my default storage
import storage from 'redux-persist/lib/storage';

/* The JSON object that represents the possible configurations that we want for redux persist to use */
const persistConfig = {
    // at what point inside of our reducer object we want to start storing everything
    key: 'root',
    storage,
    // the reducers we want to persist in string
    // we don't need to persist user because this is handled by firebase auth
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);
/*
    - A key in this root state represents the individual slices of state 
*/
/*export default combineReducers({
    user: userReducer,
    cart: cartReducer
});*/