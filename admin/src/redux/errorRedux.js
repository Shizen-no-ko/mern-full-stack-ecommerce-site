import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
    name: 'error',
    initialState: {
        error: false,
        errorMessage:null

    },
    reducers: {
        success: (state) => {
            state.error = false;
            state.errorMessage = null
        },
        failure: (state, action) => {
            state.error = true;
            state.errorMessage = action.payload
        }
    }
});

export const { success, failure } = errorSlice.actions;
export default errorSlice.reducer;
