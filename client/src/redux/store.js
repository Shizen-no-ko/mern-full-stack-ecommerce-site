import { configureStore, combineReducers } from '@reduxjs/toolkit';
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
import errorReducer from './errorRedux';

// Exclude 'error' from Persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['error', 'errorMessage']
}

// Combine reducers into rootReducer
const rootReducer = combineReducers({ user: userReducer, cart: shoppingCartReducer, error: errorReducer });

// Apply persistConfig to rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store with persist
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// Initial store
// export const store = configureStore({
//     reducer: {
//         cart: shoppingCartReducer,
//         user: persistedReducer
//     }
// })

export let persistor = persistStore(store)
