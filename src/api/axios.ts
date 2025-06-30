import axios from 'axios';
const BASE_URL = "https:/reqres.in/api";  // Can move to env later
const APP_KEY = "reqres-free-v1";

const axiosInstance = axios.create({  
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "x-api-key": APP_KEY
    },
});

//add token from localstorage to each request
axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

//handle 401 globally
axiosInstance.interceptors.response.use(
    (response)=> response,
    (error) =>{
        if(error.response?.status === 401){
            console.warn("Unathorized - Maybe log out user!!!");
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;