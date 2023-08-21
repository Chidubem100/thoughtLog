import React from "react";
import {Routes,redirect,Navigate} from "react-router-dom";
import { useGlobalConext } from "../context";

const PrivateRoute = ({children,...rest}) =>{
    const {user} = useGlobalConext();
    
    
    return user ? children : <Navigate to='/login'/>

    
}

export default PrivateRoute;