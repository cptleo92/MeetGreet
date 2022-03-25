import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger"
import thunk from "redux-thunk"
import rootReducer from "../reducers/root_reducer";

export const configureStore = (preloadedState = {}) => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, logger)
)

// sloppy way of exporting types for now
const store = configureStore();
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
