import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useGlobalConext } from "../pages/context";
import LogoutUtils from "../utils/logoutUtils";

function Navbar(){
    // const {logoutUser} = useGlobalConext();
    const {logoutUser} = LogoutUtils();

    // const userRole = localStorage.getItem('userRole');
    // const accessToken = localStorage.getItem('accessToken');
    // if(accessToken){
    //     const user = localStorage.getItem('user');
    //     const u = JSON.parse(user);
    //     const ux = u.username;
    // }
    return<nav>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Register</Link></li>
            <button className="btn-danger" onClick={() => logoutUser()}>
                Logout
            </button>
        </ul>
        {/* {userRole === 'admin' && (<li><Link to='/admin/create-post'>Create post</Link></li>)}
        {!accessToken && (<ul><li><Link to='/login'>Login</Link></li> <li><Link to='/signup'>Register</Link></li></ul>)}
        {/* {accessToken && (<ul><div>{ux}</div><li><Link to='/logout'>Logout</Link></li></ul>)} */}
        {/* <div>{ux}</div> */}
         {/* */} 
    </nav> 
}

export default Navbar;