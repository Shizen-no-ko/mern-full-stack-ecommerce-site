import { publicReq } from "../axiosRequests";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await publicReq.post('auth/login', user);
        dispatch(loginSuccess(res.data));
    }
    catch (err) {
        dispatch(loginFailure());
    }

};