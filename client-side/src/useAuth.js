import {useContext,useDebugValue} from "react";
import { useGlobalConext } from "./context";

const useAuth = () =>{
    const {auth} = useGlobalConext();
    return useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
};

export default useAuth;