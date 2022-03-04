import { createSlice } from '@reduxjs/toolkit';

const shoppingCartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        previousCartItems: [],
        itemCount: 0,
        freeDeliveryLevel: 70,
        subtotal: 0,
        totalPrice: 0,
        deliveryCharge: 4.99
    },
    reducers: {
        // Add product to cart, with amount, calculate delivery charge and total price
        addProduct: (state, action) => {
            state.itemCount += action.payload.amount;
            state.products.push(action.payload);
            state.subtotal += action.payload.price * action.payload.amount;
            state.totalPrice = (state.subtotal + (state.subtotal < state.freeDeliveryLevel && state.subtotal > 0 ? state.deliveryCharge : 0)).toFixed(2);
        },
        decreaseItemAmount: (state, action) => {
            // Find item in cart by id
            const index = state.products.findIndex((item) => item._id === action.payload.id);
            // If item in cart, reduce by one, deduct item price from subtotal
            if (state.products[index].amount > 0) {
                state.products[index].amount -= 1;
                state.itemCount -= 1;
                state.subtotal -= state.products[index].price;
                state.totalPrice = (state.subtotal + (state.subtotal < state.freeDeliveryLevel && state.subtotal > 0 ? state.deliveryCharge : 0)).toFixed(2);
            }
        },
        increaseItemAmount: (state, action) => {
            // Find item in card by id
            const index = state.products.findIndex((item) => item._id === action.payload.id);
            // If item in cart, increase by one, add item price to subtotal
            state.products[index].amount += 1;
            state.itemCount += 1;
            state.subtotal += state.products[index].price;
            state.totalPrice = (state.subtotal + (state.subtotal < state.freeDeliveryLevel && state.subtotal > 0 ? state.deliveryCharge : 0)).toFixed(2);
        },
        deleteItem: (state, action) => {
            // Remove item from cart and recalculate total price
            const index = state.products.findIndex((item) => item._id === action.payload.id);
            if (!state.previousCartItems.find(item => item._id === action.payload.id)) { state.previousCartItems.push(state.products[index]); }
            state.itemCount -= 1;
            state.subtotal -= state.products[index].price * state.products[index].amount;
            state.totalPrice = (state.subtotal + (state.subtotal < state.freeDeliveryLevel && state.subtotal > 0 ? state.deliveryCharge : 0)).toFixed(2);
            state.products.splice(index, 1);
        },
        clearCart: (state) => {
            state.products = [];
            state.itemCount = 0;
            state.subtotal = 0;
            state.totalPrice = 0;
            state.deliveryCharge = 4.99;
        }
    }
});

export const { addProduct, decreaseItemAmount, increaseItemAmount, deleteItem, clearCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer; 