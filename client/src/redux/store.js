import { configureStore } from '@reduxjs/toolkit';
import shoppingCartReducer from './shoppingCartRedux';

export default configureStore({
    reducer: {
        cart: shoppingCartReducer,
    }
})
