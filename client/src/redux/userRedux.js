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
            state.isFetching = true
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
        }

    }
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;
