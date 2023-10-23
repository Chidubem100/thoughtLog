import React from "react";
import { Link } from 'react-router-dom';
import LogoutUtils from "../utils/logoutUtils";
import { useGlobalConext } from "../pages/context";

function AdminSidebar(){
    
    const {token} = useGlobalConext();
    const {logoutUser} = LogoutUtils();
    const user = JSON.parse(localStorage.getItem('user'));
    
    
    return<nav>

        <div>
            <strong>Thought Log</strong>
        </div>

        <div>
            {user && token ? <div>
                <h5>{user.username}</h5>
                <p>{user.role}</p>
                <ul>
                    <li><Link to='/admin/create-post'>Create Post</Link></li>
                    <li><Link to='/admin/manage-posts'>Manage Posts</Link></li>
                    <li><Link to='/admin/manage-users'>Manage Users</Link></li>
                    <li><Link to='/admin/manage-comments'>Manage Comments</Link></li>
                    <button className="btn-danger" onClick={() => logoutUser()}>
                        Logout
                    </button>
                </ul>
            </div>
                : 
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/signup'>Register</Link></li>
            </ul>}
        </div>

        
         
    </nav> 
}

export default AdminSidebar;