import React, {  createContext, useContext, useEffect, useState } from 'react'
import useAuthService from '../services/auth-service';
import { jwtDecode } from "jwt-decode";
import { Bounce, toast } from "react-toastify";



const AuthContext = createContext({
    user:null,
    token:null,
    setUser: () =>{},
    setToken: () =>{}
})


export const AuthProvider = ({children}) =>{
    const [user, _setUser] = useState(null);
    const [token, _setToken] = useState(null);
    const {logoutApi} = useAuthService();
    const [checkToken,setCheckToken] = useState(false);
    
   
    

    useEffect(() => {
        const storedUser = localStorage.getItem("USER");
        const storedToken = localStorage.getItem("ACCESS_TOKEN");

        if (storedUser) _setUser(JSON.parse(storedUser));
        if (storedToken) {
            _setToken(storedToken);
           
        }
    }, []);

    useEffect(() => {
        if (!token) return;

        const checkTokenExpiry = () => {
           try {
            const decodedToken = jwtDecode(token);
            const expirationTime = decodedToken.exp 
            const currentTime = Math.floor(Date.now() / 1000); //saniye cinsinden
            console.log("dec",expirationTime);
            console.log("cur",currentTime);
            console.log(currentTime - expirationTime)
            console.log(currentTime <= expirationTime)
            if(expirationTime <= currentTime){
                setCheckToken(true);
            }
           } catch (error) {
                console.error("Token çözümleme hatası:", error);
           }
        };
        const intervalId = setInterval(checkTokenExpiry, 21600000); // 21600 sn = 5 saat
        if(checkToken){
            toast.warning("Oturum süreniz doldu, 20 saniye sonra oturum sonlanacaktır.", {
                position: "top-right",
                autoClose: 20000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Bounce,
            });
            const clearLocalStorage = () => {
                return new Promise((resolve) => {
                    localStorage.removeItem("USER");
                    localStorage.removeItem("ACCESS_TOKEN");
                    setUser(null);
                    setToken(null);
                    resolve();
                   });
            }
            setTimeout(() => {
                clearLocalStorage().then(() =>{
                    window.location.reload();
                }); // Oturumu kapat
                 // Sayfayı yeniden yükle
            }, 20000); // 20 saniye (20000 milisaniye)
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
        
    }, [token,checkToken,logoutApi]);



    const setToken = (token) =>{
        _setToken(token);

        if(token){
            localStorage.setItem('ACCESS_TOKEN',token)
            //monitorTokenExpiration(token);
        }
        else{
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    const setUser = (user) =>{
        _setUser(user)
        if(user){
            localStorage.setItem('USER',JSON.stringify(user))
        }
        else{
            localStorage.removeItem('USER')
        }
    }

    return(
        <AuthContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken
            }}>
                {children}
            </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);