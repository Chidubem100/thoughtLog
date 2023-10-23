import React from "react";
import { Link} from 'react-router-dom';
import LogoutUtils from "../utils/logoutUtils";
import { useGlobalConext } from "../pages/context";

function Navbar(){
    
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
                <ul>
                    <li><Link to='/'>Home</Link></li>
            
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

        {/* <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Register</Link></li>
            <button className="btn-danger" onClick={() => logoutUser()}>
                Logout
            </button>
        </ul> */}
         
    </nav> 
}

export default Navbar;