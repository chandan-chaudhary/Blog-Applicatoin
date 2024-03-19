import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
// import { createStore } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from "redux-persist";
// import rootReducer from "./rootReducers";
import { combineReducers } from "@reduxjs/toolkit";
// import persistReducer from 'redux-persist/es/persistReducer';

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
export default configureStore({
  reducer: persistedReducer,
  //  allows non-serilaizibility into parsing
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
// export const persistor = persistStore(store);
