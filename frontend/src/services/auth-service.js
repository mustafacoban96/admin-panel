import { useState } from "react";
import { useAuthContext } from "../context/AuthContext"
import axiosConfig from "./accountApi/accountApi";
import { Bounce, toast } from 'react-toastify';




const useAuthService = () =>{
    const {setUser,setToken} = useAuthContext();
    const [confirm_password, setConfirmPassword] = useState(false);


    const registerApi = (register_payload) =>{
        
        if(register_payload.password != register_payload.confirm_password){
            setConfirmPassword(true);
            toast.error("Password didn't macth it", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
                setConfirmPassword(false);
                return;
        }
        
        return axiosConfig.post("/register" , register_payload)
        .then((response) =>{
            response = response.data
            let user = {username: response.username,email:response.email}
            let token = response.token
            toast.success("Register is successful", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
            setTimeout(() =>{
                setUser(user);
                setToken(token)
            },3300)
        })
        .catch((err) =>{
            let statusCode = err.status
            console.log("errrrr::::",err)
            if(statusCode == 500){
                toast.error("inputs are not valid", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            }
            if(statusCode == 400){
                let errMessage = err.response.data
                toast.error(errMessage, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            }

            
        })
    };

    const loginApi = (login_payload) =>{
        return axiosConfig.post("/login",login_payload)
            .then((response) =>{
                response = response.data
                let user = {username: response.username,email:response.email}
                let token = response.token
                //console.log("login response::" ,response)

                toast.success("Login is successful", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
                setTimeout(() =>{
                    setUser(user);
                    setToken(token)
                },3300)
            })
            .catch((err) =>{
                
                let errorFor400 = err.response?.data?.errors;
                let error = err.response?.data;
                let statusCode = err.response?.status;
                // console.log("login error:::", err)
                // console.log("login error:::", statusCode)
                // console.log('aaa:',errorFor400)
                if(statusCode == 401){
                    toast.error(error, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                        });
                }
                if(statusCode == 400){
                    
                    toast.error("Please enter the required field...", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }
               
            })
    }
    const logoutApi = () => {
        return new Promise((resolve) => {
            localStorage.removeItem("USER");
            localStorage.removeItem("ACCESS_TOKEN");
            setUser(null);
            setToken(null);
            toast.success("Logout is successful", {
                position: "top-right",
                autoClose: 2000,
                theme: "light",
            });
            resolve();
        });
    };

    return {
        registerApi,
        loginApi,
        logoutApi
    };
};

export default useAuthService;