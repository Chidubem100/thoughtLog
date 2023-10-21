import React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import HomePage from "./pages/userPages/home";
import LoginPage from "./pages/userPages/login";
import Navbar from "./components/Navbar";
import ErrorPage from "./pages/errorPage";
import RegisterPage from "./pages/userPages/register";
import SinglePostPage from "./pages/userPages/singlePost";
import Post from  './pages/adminPages/post';
import ResetPasswordPage from "./pages/userPages/resetPassword";
import ForgotPasswordPage from "./pages/userPages/forgotPasssword";
import UnauthorizedPage from "./pages/unauthorizedPage";
import {PrivateRoutes,ProtectedRoute} from "./pages/protectedRoute";


function App() {
  

  return <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={<HomePage/>}></Route>
      <Route exact path="/signup" element={<RegisterPage/>} ></Route>
      <Route exact path="/login" element={<LoginPage/>} ></Route>
      
      <Route path="/admin/create-post" element={<ProtectedRoute/>}>
          <Route path="" element={<Post/>}/>
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
