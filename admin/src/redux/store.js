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

import userReducer from './userRedux';
import errorReducer from './errorRedux';


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['error', 'errorMessage']
}

const rootReducer = combineReducers({ user: userReducer, error: errorReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })

// export const store = configureStore({
//     reducer: {
//         cart: shoppingCartReducer,
//         user: persistedReducer
//     }
// })

export let persistor = persistStore(store)
