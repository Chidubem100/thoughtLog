import React from "react";
import {useLocation,Navigate} from "react-router-dom";
import { useGlobalConext } from "../context";

const PrivateRoute = ({children,...rest}) =>{
    const location = useLocation();
    const {user} = useGlobalConext();
    
    
    return user ? children : <Navigate to='/login' state={{ from: location }} replace/>

    
}

const ProtectedRoute = ({children,...rest}) =>{
    const {user} = useGlobalConext();
    console.log(user)
    // if(user.role = 'admin'){
    //     return user ? children : <Navigate to='/unauthorized'/>
    // }
    // user.role = 'admin'
    // return user ? children : <Navigate to='/unauthorized'/>
}

export  {ProtectedRoute,PrivateRoute};