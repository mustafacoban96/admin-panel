import { useAuthContext } from "../context/AuthContext"
import axiosConfig from "./accountApi/accountApi";





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
                console.log("login response::" ,response)
            })
            .catch((err) =>{
                console.log("login error:::", err)
            })
    }

    return {
        register,
        login
    };
};

export default useAuthService;