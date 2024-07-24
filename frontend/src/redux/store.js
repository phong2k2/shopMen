import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import authReducer from "./authSlice"
import categoryReducer from "./categorySlice"
import cartReducer from "./cartSlice"
import modalAddressReducer from "./modalAddressSlice"

const authPersistConfig = {
  key: "auth",
  storage
}

const cartPersistConfig = {
  key: "cart",
  storage
}

const persistedReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
  category: categoryReducer,
  modalAddress: modalAddressReducer
})

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export let persistor = persistStore(store)
