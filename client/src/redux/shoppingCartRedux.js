import { createSlice } from '@reduxjs/toolkit';

const shoppingCartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        previousCartItems: [],
        itemCount: 0,
        freeDeliveryLevel: 80,
        subtotal: 0,
        totalPrice: 0,
        deliveryCharge: 5.99
    },
    reducers: {
        addProduct:(state, action) => {
            state.itemCount += action.payload.amount;
            state.products.push(action.payload);
            state.subtotal += action.payload.price*action.payload.amount;
            state.totalPrice = state.subtotal + (state.subtotal < state.freeDeliveryLevel && state.subtotal > 0 ? state.deliveryCharge : 0);
        },
        decreaseItemAmount: (state, action) => {
            const index = state.products.findIndex((item) => item._id === action.payload.id);
            if (state.products[index].amount > 0){
                state.products[index].amount -= 1;
                state.itemCount -=1;
                state.subtotal -= state.products[index].price;
                state.totalPrice = state.subtotal + (state.subtotal < state.freeDeliveryLevel && state.subtotal > 0 ? state.deliveryCharge : 0);
            }
        },
        increaseItemAmount: (state, action) => {
            const index = state.products.findIndex((item) => item._id === action.payload.id);
            state.products[index].amount += 1;
            state.itemCount +=1;
            state.subtotal += state.products[index].price;
            state.totalPrice = state.subtotal + (state.subtotal < state.freeDeliveryLevel && state.subtotal > 0 ? state.deliveryCharge : 0);
        },
        deleteItem: (state, action) => {
            const index = state.products.findIndex((item) => item._id === action.payload.id);
            state.previousCartItems.push(state.products[index]);
            state.subtotal -= state.products[index].price * state.products[index].amount;
            state.totalPrice = state.subtotal + (state.subtotal < state.freeDeliveryLevel && state.subtotal > 0 ? state.deliveryCharge : 0);
            state.products.splice(index, 1);
          }
     }
});

export const { addProduct, decreaseItemAmount, increaseItemAmount, deleteItem } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer; 