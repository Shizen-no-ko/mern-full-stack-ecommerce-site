import axios from 'axios';


const BASE_URL = 'http://localhost:5000/api';

// Handle condition of whether Current User is set in Redux store, or not, and set token accordingly
const CURRENT_USER = localStorage.length > 0 ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser : null;
const TOKEN = CURRENT_USER ? CURRENT_USER.token : 'null';

// Public requests
export const publicReq = axios.create({
    baseURL: BASE_URL
});

// User requests
export const userReq = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` }
})