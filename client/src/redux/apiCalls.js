import { publicReq } from "../axiosRequests";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await publicReq.post('auth/login', user);
        dispatch(loginSuccess(res.data));
    }
    catch (err) {
        dispatch(loginFailure(err.response.data.errors));
      
    }
};

export const register = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await publicReq.post('auth/register', user);
        console.log(`res.data is ${res.data}`)
        dispatch(loginSuccess(res.data));
    }
    catch (err) {
        dispatch(loginFailure(err.response.data.errors)); 
    }
};