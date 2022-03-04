import { createSlice } from "@reduxjs/toolkit";

// updateUser for updating likedProducts for like-button functionality
const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isFetching: false,

    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
        },
        updateUser: (state, action) => {
            state.currentUser.user.likedProducts = action.payload;
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, updateUser } = userSlice.actions;
export default userSlice.reducer;
