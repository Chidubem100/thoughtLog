import React from "react";
import {useLocation,Navigate} from "react-router-dom";
import { getUserFromLocalStorgae,getTokenFromLocalStorage } from "../utils/localStorage";


const PrivateRoute = ({children,...rest}) =>{
    const location = useLocation();
    
    const token = getTokenFromLocalStorage();
    const u = getUserFromLocalStorgae();
    if(token || u){
        return children    
    }else{
        return <Navigate to='/login' state={{ from: location }} replace/>
    }
}

const ProtectedRoute = ({children,...rest}) =>{
    
    const x = getUserFromLocalStorgae();
    console.log(x)
    // const h = x.role;
// const {username,role} = x;
//     // console.log(h)
//     // console.log(`${username}, ${role}`)
//     // const 
//     return {x.role:"admin"} ? children : <Navigate to='/unauthorized'/>;
//     // if({role:"admin"}){
    //     console.log(role)
    //     return children
    // }else{
    //     return <Navigate to='/unauthorized'/>
    // }    
    
};

export  {ProtectedRoute,PrivateRoute};