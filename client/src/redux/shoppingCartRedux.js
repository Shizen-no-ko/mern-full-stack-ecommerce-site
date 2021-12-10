import { createSlice } from '@reduxjs/toolkit';

const shoppingCartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        itemCount: 3,
        totalPrice: 0
    },
    reducers: {
        addProduct:(state, action) => {
            state.itemCount += 1;
            state.products.push(action.payload.product);
            state.total += action.payload.price;
        }
    }
});

export const { addProduct } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer; 