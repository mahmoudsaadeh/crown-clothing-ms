
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

// we can pass logger directly without spreading it in below, but,
// we may need to modify this array in the future based on certain conditions

/*
Middleware: It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer. People use Redux middleware for logging, crash reporting, talking to an asynchronous API, routing, and more.
*/
const middlewares = [logger]; 

// applyMiddleware takes an infinite number of middlewares (we can use other than logger)
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;