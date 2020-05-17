import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { restListReducer, userReducer } from "./Reducers/restListReducer";

const rootReducer = combineReducers({
  restListReducer,
  userReducer
});
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(
  // applyMiddleware(axiosMiddleware(client,middlewareConfig)),
  applyMiddleware(thunk)
);
export const store = createStore(rootReducer, enhancer);
