import { loginFailure, loginStart, loginSuccess, updateUser } from './userRedux';
import { clearCart } from './shoppingCartRedux';
import { success, failure } from './errorRedux';
import { publicReq, userReq } from "../axiosRequests";


// Login
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        // Uses 'main' param to enable condition in auth login route for main webpage
        // as opposed to 'admin' for admin webpage
        const res = await publicReq.post('auth/login/main', user);
        dispatch(success());
        dispatch(loginSuccess(res.data));
    }
    catch (err) {
        dispatch(failure(err.response.data.errors));
        dispatch(loginFailure());

    }
};


// Register
export const register = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicReq.post('auth/register', user);
        dispatch(success());
        dispatch(loginSuccess(res.data));
    }
    catch (err) {
        dispatch(failure(err.response.data.errors));
        dispatch(loginFailure());
    }
};


// For updating user in like button functionality
export const update = async (dispatch, user) => {
    dispatch(updateUser());
    try {
        const res = await userReq.get(`users/updateCurrent/${user.user._id}`);
        dispatch(updateUser(res.data));
    }
    catch (err) {
        dispatch(failure(err.response.data.errors));
    }
};

// Add order to DB and clear shopping cart
export const order = async (dispatch, orderData) => {
    try {
        const res = await userReq.post('orders/add', orderData);
        dispatch(clearCart());
    }
    catch (err) {
        dispatch(failure(err.response.data.errors));
    }
};