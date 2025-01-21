import { useAuthContext } from "../context/AuthContext"
import axiosConfig from "./accountApi/accountApi";
import { Bounce, toast } from 'react-toastify';




const useAuthService = () =>{
    const {setUser,setToken} = useAuthContext();


    const register = (register_payload) =>{
        return axiosConfig.post("/register" , register_payload)
        .then((response) =>{
            console.log("register response:::" , response)
        })
        .catch((err) =>{
            console.log("register error::::" , err)
        })
    };

    const login = (login_payload) =>{
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
                },33000)
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

    return {
        register,
        login
    };
};

export default useAuthService;