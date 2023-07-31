import React, {useContext, useState} from 'react';

const AppContext = React.createContext()

const AppProvider = ({children})=>{

    const [isLoading,setIsLoading] = useState(true)


    return <AppContext.Provider value={{
        isLoading,
        setIsLoading,
    }}>{children}</AppContext.Provider>
}

const useGlobalConext = ()=>{
    return useContext(AppContext)
}

export {AppContext,AppProvider,useGlobalConext}