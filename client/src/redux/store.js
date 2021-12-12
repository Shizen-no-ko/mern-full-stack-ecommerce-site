import { configureStore } from '@reduxjs/toolkit';
import shoppingCartReducer from './shoppingCartRedux';
import userReducer from './userRedux';

export default configureStore({
    reducer: {
        cart: shoppingCartReducer,
        user: userReducer
    }
})
