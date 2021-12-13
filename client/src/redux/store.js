import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage';

  import shoppingCartReducer from './shoppingCartRedux';
import userReducer from './userRedux';

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, userReducer)



export const store = configureStore({
    reducer: {
        cart: shoppingCartReducer,
        user: persistedReducer
    }
})

export let persistor = persistStore(store)
