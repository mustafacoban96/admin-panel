import axios from "axios";
import { toast } from "react-toastify";


const baseApi = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, // we can replace our baseurl
    headers: {
        'Content-Type': 'application/json' // change header type our needs
    }
});


baseApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if(token){
            config.headers.Authorization = `Bearer ${token}` // set Authorization in header
        }
        return config;
    },
    (err) =>{
        return Promise.reject(err);
    }
);

baseApi.interceptors.response.use(
    (response) =>{
        return response;
    },
    (err) =>{
        return Promise.reject(err);
    }
)

export default baseApi;