import React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import HomePage from "./pages/userPages/home";
import LoginPage from "./pages/userPages/login";
import Navbar from "./components/Navbar";
import ErrorPage from "./pages/errorPage";
import RegisterPage from "./pages/userPages/register";
import SinglePostPage from "./pages/userPages/singlePost";
import Post from  './pages/adminPages/post';
import VerifyPage from "./pages/userPages/verifyEmail";
import ResetPasswordPage from "./pages/userPages/resetPassword";
import ForgotPasswordPage from "./pages/userPages/forgotPasssword";
import { CreateComment, Comments } from "./pages/userPages/Comments";

function App() {
  
  return <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={<HomePage/>}></Route>
      <Route exact path="/signup" element={<RegisterPage/>} ></Route>
      <Route exact path="/login" element={<LoginPage/>} ></Route>
      <Route exact path="/post/:id" element={<SinglePostPage/>}></Route>
      <Route exact path="/create-comment" element={<CreateComment/>}></Route>
      <Route exact path="/comments/:id" element={<Comments/>}></Route>
      <Route exact path="/admin/create-post" element={<Post/>}></Route>
      <Route path='/user/forgot-password' exact element={<ForgotPasswordPage/>}></Route>
      <Route path='/user/verify-email' exact element={<VerifyPage/>} ></Route>
      <Route path='/user/reset-password' exact element={<ResetPasswordPage/>} ></Route>
      <Route exact path="*" element={<ErrorPage/>}></Route>
    </Routes>
  </BrowserRouter>
}

export default App;
