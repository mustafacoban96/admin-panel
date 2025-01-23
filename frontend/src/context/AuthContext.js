import React, {  createContext, useContext, useEffect, useState } from 'react'



const AuthContext = createContext({
    user:null,
    token:null,
    setUser: () =>{},
    setToken: () =>{}
})


export const AuthProvider = ({children}) =>{
    const [user, _setUser] = useState(null);
    const [token, _setToken] = useState(null);

    useEffect(() => {
        // LocalStorage'dan verileri başlangıçta çekiyoruz.
        const storedUser = localStorage.getItem('USER');
        const storedToken = localStorage.getItem('ACCESS_TOKEN');
    
        if (storedUser) _setUser(JSON.parse(storedUser));
        if (storedToken) _setToken(storedToken);
      }, []);


    const setToken = (token) =>{
        _setToken(token);

        if(token){
            localStorage.setItem('ACCESS_TOKEN',token)
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