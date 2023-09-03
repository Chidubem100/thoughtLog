import React, {useCallback, useContext, useEffect, useState} from 'react';
import axios from 'axios';
const baseURL = 'http://localhost:5000/api/v1/auth/showMe';
const showURL = 'http://localhost:5000/api/v1/auth/showMe'
const AppContext = React.createContext();

const AppProvider = ({children})=>{
    
    const [isLoading,setIsLoading] = useState(true)
    const [auth, setAuth] = useState({});
    const [user, setUser] = useState(null);

    const saveUser = (user) =>{
        setUser(user)
    }

    const fetchUser = async() =>{
        try {
            const {data} = await axios.get(showURL);
            console.log(data.user)
            saveUser(data.user)            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        fetchUser();
    },[fetchUser]);

    console.log(auth)
    // const removeUser = () =>{
    //     setUser(null)
    // }


    return <AppContext.Provider value={{
        isLoading,
        setIsLoading,
        auth,
        setAuth,
        user,
        saveUser,
        
    }}>{children}</AppContext.Provider>
}

const useGlobalConext = ()=>{
    return useContext(AppContext)
}

export {AppContext,AppProvider,useGlobalConext}