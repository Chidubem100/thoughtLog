import React, { useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const AppContext = React.createContext();

const AppProvider = ({children})=>{
    
    const [isLoading,setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('accessToken'))
    const [commentArr, setCommentArr] = useState([]);

    console.log(token) // remember to remove b4 pushing to production
    
    const saveUser = (user) =>{
        setUser(user)
    };

    if(!token){
        <Navigate to="/login"/>
    }

    const parseJwt = (token) =>{
        if(!token){
            return null;
        }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('-', '/');
        return JSON.parse(atob(base64))
    }

    const handleTokenExpiration = () =>{
        localStorage.removeItem('accessToken')
        setToken(null)
        axios.defaults.headers.common['Authorization'] = ''
    };

    useEffect(() =>{
        if(token){
            const existingToken = localStorage.getItem('accessToken');
            axios.defaults.headers.common['Authorization'] = `Bearer ${existingToken}`
            const decodedToken = parseJwt(existingToken);
            const expTime = decodedToken.expires * 1000;
            const curTime = Date.now();
            if(curTime > expTime){
                handleTokenExpiration();
            }   
        }else{
            <Navigate to="/login"/>
        }
             
    },[token]);


    return <AppContext.Provider value={{
        isLoading,
        setIsLoading,
        user,
        setUser,
        saveUser,
        token,
        setToken,
        commentArr,
        setCommentArr,
        
    }}>{children}</AppContext.Provider>
}

const useGlobalConext = ()=>{
    return useContext(AppContext)
}

export {AppContext,AppProvider,useGlobalConext}