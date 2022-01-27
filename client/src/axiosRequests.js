import axios from 'axios';


const BASE_URL = 'http://localhost:5000/api';
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.token;

const CURRENT_USER = localStorage.length > 0 ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser : null;
const TOKEN =  CURRENT_USER ? CURRENT_USER.token : null;


export const publicReq = axios.create({
    baseURL: BASE_URL
});

export const userReq = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` } 
})