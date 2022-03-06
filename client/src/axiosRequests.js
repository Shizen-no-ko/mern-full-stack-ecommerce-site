import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';


// User requests
const userReq = axios.create({ baseURL: BASE_URL });
// Handle condition of whether Current User is set in Redux store, or not, 
//and set token accordingly using axios interceptors
userReq.interceptors.request.use(
    async (config) => {
        const CURRENT_USER = localStorage.length > 0 ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser : null;
        const TOKEN = CURRENT_USER ? CURRENT_USER.token : 'null';
        config.headers = {
            token: `Bearer ${TOKEN}`,
        };
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

// Public requests
const publicReq = axios.create({
    baseURL: BASE_URL
});


export { publicReq, userReq }