import { createStore, applyMiddleware, compose } from "redux";
import { logger } from "redux-logger";
// import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from "./RootReducer";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    RootReducer,
    composeEnhancers(applyMiddleware(logger))
);

export default store;