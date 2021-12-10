import { createSlice } from '@reduxjs/toolkit';

const shoppingCartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        itemCount: 0,
        totalPrice: 0
    },
    reducers: {
        addProduct:(state, action) => {
            state.itemCount += action.payload.amount;
            state.products.push(action.payload.product);
            state.totalPrice += action.payload.price;
        }
    }
});

export const { addProduct } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer; 