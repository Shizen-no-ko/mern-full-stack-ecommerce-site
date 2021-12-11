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
            state.products.push(action.payload);
            state.totalPrice += action.payload.price*action.payload.amount;
        },
        decreaseItemAmount: (state, action) => {
            state.products[action.payload.index].amount -= 1;
            state.itemCount -=1;
            state.totalPrice -= state.products[action.payload.index].price*state.products[action.payload.index].amount;
        },
        increaseItemAmount: (state, action) => {
            state.products[action.payload.index].amount += 1;
            state.itemCount +=1;
            state.totalPrice -= state.products[action.payload.index].price*state.products[action.payload.index].amount;

        }
    }
});

export const { addProduct, decreaseItemAmount, increaseItemAmount } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer; 