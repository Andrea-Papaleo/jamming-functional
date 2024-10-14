import { configureStore, Middleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { rootReducer } from "./rootReducer";

import { listenerMiddleware } from "./midleware";

let middleware: Middleware[] =
  process.env.NODE_ENV !== "production" &&
  process.env.REACT_APP_LOG_LEVEL === "2"
    ? [listenerMiddleware.middleware, thunk]
    : [listenerMiddleware.middleware, thunk];

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const productionStore = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: middleware,
});

export const persistor = persistStore(productionStore);
