
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

import { persistStore } from "redux-persist";

// import thunk from "redux-thunk";

import createSagaMiddleware from "@redux-saga/core";

// import { fetchCollectionsStart } from "./shop/shop.sagas";

import rootSaga from "./root-saga";

// we can pass logger directly without spreading it in below, but,
// we may need to modify this array in the future based on certain conditions

/*
Middleware: It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer. People use Redux middleware for logging, crash reporting, talking to an asynchronous API, routing, and more.
*/
//const middlewares = [logger]; 

// const middlewares = [];

// const middlewares = [thunk];

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

// show logger messages in console only in development mode
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

// applyMiddleware takes an infinite number of middlewares (we can use other than logger)
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// sagaMiddleware.run(fetchCollectionsStart);
sagaMiddleware.run(rootSaga);

// this creates a persisted version of our store
export const persistor = persistStore(store);

// export default store;
const final_object = {store, persistor};
export default final_object; // so that we have access to both