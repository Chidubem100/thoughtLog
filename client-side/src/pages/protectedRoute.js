import React from "react";
import {Navigate,Outlet} from "react-router-dom";

const user = JSON.parse(localStorage.getItem('user'));
const accessToken = localStorage.getItem('accessToken');

const PrivateRoutes = () => {
  
  return accessToken ? <Outlet/> : <Navigate to="/login"/>
};

const ProtectedRoute = () =>{
  
  if(accessToken && user.role === 'admin'){

    return <Outlet/>

  }else{
    
    return <Navigate to="/unauthorized"/>  
  }
};

export  {ProtectedRoute,PrivateRoutes};