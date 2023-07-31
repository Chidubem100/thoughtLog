import React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import HomePage from "./pages/home";
import ErrorPage from "./pages/errorPage";

function App() {
  return <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<HomePage/>}></Route>

      <Route exact path="*" element={<ErrorPage/>}></Route>
    </Routes>
  </BrowserRouter>
}

export default App;
