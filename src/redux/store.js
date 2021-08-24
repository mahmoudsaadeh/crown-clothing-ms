
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

import { persistStore } from "redux-persist";

// we can pass logger directly without spreading it in below, but,
// we may need to modify this array in the future based on certain conditions

/*
Middleware: It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer. People use Redux middleware for logging, crash reporting, talking to an asynchronous API, routing, and more.
*/
const middlewares = [logger]; 

// applyMiddleware takes an infinite number of middlewares (we can use other than logger)
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// this creates a persisted version of our store
export const persistor = persistStore(store);

// export default store;
export default {store, persistor}; // so that we have access to both