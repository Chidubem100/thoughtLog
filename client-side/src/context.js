import React, {useCallback, useContext, useEffect, useState} from 'react';
import axios from 'axios';
const baseURL = 'http://localhost:5000/api/v1//auth/showMe';
const AppContext = React.createContext();

const AppProvider = ({children})=>{
    // const {showAlert} =useLocalState()
    const [isLoading,setIsLoading] = useState(true)
    const [isUser, setIsUser] = useState(null);

    const saveUser = (user) =>{
        setIsUser(user)
    }

    const removeUser = () =>{
        setIsUser(null)
    }

    const fetchUser = useCallback( async(str) =>{
        try {
            const {data} = await axios.get(str);
            setIsUser(data.user)
        } catch (error) {
            removeUser()
        }
        setIsLoading(false)
    },[])

    const  logoutUser = async(str) =>{
        try {
            await axios.get(str)
            removeUser()
        } catch (error) {
            return <p>Error occured!!</p>
        }
    }

    useEffect(() =>{
        fetchUser(baseURL)
    },[fetchUser]);

    return <AppContext.Provider value={{
        isLoading,
        setIsLoading,
        saveUser,
        isUser,
        logoutUser
    }}>{children}</AppContext.Provider>
}

const useGlobalConext = ()=>{
    return useContext(AppContext)
}

export {AppContext,AppProvider,useGlobalConext}