import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger"
import thunk from "redux-thunk"
import rootReducer from "../reducers/root_reducer";
import { composeWithDevTools } from "@redux-devtools/extension"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['session']
}

const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  // must use 'require' (import only allowed at top of file)
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const configureStore = (preloadedState = {}) => {
  let store = createStore(
    persistedReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  )
  let persistor = persistStore(store)
  return { store, persistor }
}

export const configureTestStore = (preloadedState = {}) => {
  let testStore = createStore(
    persistedReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
  )
  const origDispatch = testStore.dispatch
  testStore.dispatch = jest.fn(origDispatch)
  return testStore
}

// sloppy way of exporting types for now
const store = configureStore().store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

