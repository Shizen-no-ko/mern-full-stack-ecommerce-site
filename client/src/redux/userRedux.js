import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        errorMessage:null

    },
    reducers: {
        loginStart: (state) =>  {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
            state.errorMessage = null
        },
        loginFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.errorMessage = action.payload
        },
        clearErrors: (state) => {
            state.error = false;
            state.errorMessage = null
        }
        // ,
        // logout: (state) => {
        //     state.currentUser = null;
        //     state.error = false;
        //     state.errorMessage = null;
        // }
    }
});

export const { loginStart, loginSuccess, loginFailure, clearErrors } = userSlice.actions;
export default userSlice.reducer;
