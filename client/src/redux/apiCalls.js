import { loginFailure, loginStart, loginSuccess } from './userRedux';
import { clearCart } from './shoppingCartRedux';
import { success, failure } from './errorRedux';
import { publicReq, userReq } from "../axiosRequests";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        // Uses 'main' param to enable condition in auth login route
        const res = await publicReq.post('auth/login/main', user);
        dispatch(success());
        dispatch(loginSuccess(res.data));
    }
    catch (err) {
        dispatch(failure(err.response.data.errors));
        dispatch(loginFailure());
      
    }
};

export const register = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await publicReq.post('auth/register', user);
        console.log(`res.data is ${res.data}`);
        dispatch(success());
        dispatch(loginSuccess(res.data));
    }
    catch (err) {
        dispatch(failure(err.response.data.errors));
        dispatch(loginFailure()); 
    }
};

export const order = async (dispatch, orderData) => {
    //Token not setting correctly in axiosRequests
    const CURRENT_USER = localStorage.length > 0 ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser : null;
    const TOKEN =  CURRENT_USER ? CURRENT_USER.token : null;
    
    const headers = {
        token: `Bearer ${TOKEN}`
    };

    try{
        const res = await userReq.post('orders/add', orderData, {headers:headers});
        console.log('INSIDE ORDER');
        console.log(res.data);
        dispatch(clearCart());
    }
    catch (err) {
        console.log(err);
        dispatch(failure(err.response.data.errors));
    }
};