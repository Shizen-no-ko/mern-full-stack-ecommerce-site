import axios from 'axios';



const BASE_URL = 'http://localhost:5000/api';
// const CURRENT_USER = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser;
// const TOKEN =  CURRENT_USER ? CURRENT_USER.token : null;
const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.token;

console.log('TOKEN IS')
console.log(TOKEN);


export const publicReq = axios.create({
    baseURL: BASE_URL
});

export const userReq = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` } 
})