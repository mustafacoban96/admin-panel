import axios from "axios";

const axiosConfig = axios.create({
    baseURL: process.env.REACT_APP_AUTH_BASE_URL,
    headers:{
        'Content-Type': 'application/json',
    }
});


axios.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem('ACCESS_TOKEN'); // store access token
        if(token){
            config.headers.Authorization = `Bearer ${token}` // set in header
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error);
    }
);

axiosConfig.interceptors.response.use(
    (response) =>{
        return response;
    },
    async (error) =>{
        
        return Promise.reject(error);
    }
);

export default axiosConfig;