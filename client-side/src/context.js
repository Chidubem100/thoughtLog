import React, {useCallback, useContext, useEffect, useState} from 'react';
import axios from 'axios';
const baseURL = 'http://localhost:5000/api/v1/auth/showMe';
const AppContext = React.createContext();

const AppProvider = ({children})=>{
    
    const [isLoading,setIsLoading] = useState(true)
    const [auth, setAuth] = useState({});

    // const saveUser = (user) =>{
    //     setUser(user)
    // }

    // const removeUser = () =>{
    //     setUser(null)
    // }


    return <AppContext.Provider value={{
        isLoading,
        setIsLoading,
        auth,
        setAuth
        
    }}>{children}</AppContext.Provider>
}

const useGlobalConext = ()=>{
    return useContext(AppContext)
}

export {AppContext,AppProvider,useGlobalConext}