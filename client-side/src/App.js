import React, { useEffect, useState } from "react";
import { BrowserRouter,Route,Routes, json } from "react-router-dom";
import HomePage from "./pages/userPages/home";
import LoginPage from "./pages/userPages/login";
import AppNavbar from "./components/Navbar";
import ErrorPage from "./pages/errorPage";
import RegisterPage from "./pages/userPages/register";
import SinglePostPage from "./pages/userPages/singlePost";
import Post from  './pages/adminPages/post';
import ManageComments from "./pages/adminPages/manageComments";
import ManagePosts from "./pages/adminPages/managePost";
import ResetPasswordPage from "./pages/userPages/resetPassword";
import Manageusers from "./pages/adminPages/manageUsers";
import UpdatePosts from "./pages/adminPages/updatePost";
import ForgotPasswordPage from "./pages/userPages/forgotPasssword";
import UnauthorizedPage from "./pages/unauthorizedPage";
import {PrivateRoutes,ProtectedRoute} from "./pages/protectedRoute";
import AdminSidebar from "./components/sideBar";
import { useGlobalConext } from "./pages/context";


function App() {
  const {setUserRole, userRole} = useGlobalConext();
  const user = JSON.parse(localStorage.getItem('user'));  
  
  useEffect(() =>{
    const storedUser = localStorage.getItem('user');  
    if(storedUser){
      const user = JSON.parse(storedUser);
      setUserRole(user.role)
    }
    
  },[]);

  return <BrowserRouter>
    
    {userRole === 'admin'  ? <AdminSidebar/> : <AppNavbar/>}
   
    <Routes>
      <Route exact path='/' element={<HomePage/>}></Route>
      <Route exact path="/signup" element={<RegisterPage/>} ></Route>
      <Route exact path="/login" element={<LoginPage/>} ></Route>
      
      <Route path="/admin/create-post" element={<ProtectedRoute/>}>
          <Route path="" element={<Post/>}/>
      </Route>
      <Route path="/admin/manage-posts" element={<ProtectedRoute/>}>
          <Route path="" element={<ManagePosts/>}/>
      </Route>
      <Route path="/admin/manage-users" element={<ProtectedRoute/>}>
          <Route path="" element={<Manageusers/>}/>
      </Route>
      <Route path="/admin/manage-comments" element={<ProtectedRoute/>}>
          <Route path="" element={<ManageComments/>}/>
      </Route>
      <Route path="/admin/update-post/:postId" element={<ProtectedRoute/>}>
          <Route path="" element={<UpdatePosts/>}/>
      </Route>
      <Route path="/post/:id" element={<SinglePostPage/>}/>
      <Route path='/user/forgot-password' exact element={<ForgotPasswordPage/>}></Route>
      <Route path='/user/reset-password' exact element={<ResetPasswordPage/>} ></Route>
      <Route path="/unauthorized" element={<UnauthorizedPage/>}></Route>
      <Route exact path="*" element={<ErrorPage/>}></Route>
      {/* <Route path="/post/:id" element={<PrivateRoutes/>}>
        <Route path="" element={<SinglePostPage/>}/>
      </Route> */}

      {/* <Route path="/post/:id" element={<PrivateRoutes/>}>
        <Route path="" element={<SinglePostPage/>}/>
      </Route> */}
     
    </Routes>
    
  </BrowserRouter>
}

export default App;
