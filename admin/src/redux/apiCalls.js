import { publicReq } from "../axiosRequests";
import { loginFailure, loginStart, loginSuccess } from './userRedux';
import { success, failure } from './errorRedux';

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await publicReq.post('auth/login-admin', user);
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
