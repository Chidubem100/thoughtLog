import React from "react";
import { Link } from 'react-router-dom';
import LogoutUtils from "../utils/logoutUtils";
import { useGlobalConext } from "../pages/context";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {LuMenu} from 'react-icons/lu';



function AdminSidebar(){
    
    const {token} = useGlobalConext();
    const {logoutUser} = LogoutUtils();
    const user = JSON.parse(localStorage.getItem('user'));
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    return (
        <>
          <div className="sidebar-div">
                <div className="sidebar-child">
                    <i style={{fontSize:'23px', border:'1px solid #425e16', borderRadius:'5px', fontWeight:'bolder'}} onClick={handleShow}><LuMenu/></i>
                </div>
                <div className="sidebar-child">
                    <h4 style={{textAlign:'center'}}><Link to='/' style={{textDecoration: 'none', fontWeight: 'bold', color: '#e2e0ff'}}> Thought Log</Link></h4>
                </div>

          </div>
           

    
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Admin Panel</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body >
            <div>
             {user && token ? <div>
                <h4>{user.username}</h4>
                 <h6>{user.role}</h6>
                 <div className="sidebar-ul" onClick={handleClose}>
                     <div className="sidebar-li"><Link className="li-link" to='/admin/create-post'>Create Post</Link></div>
                     <div className="sidebar-li"><Link className="li-link" to='/admin/manage-posts'>Manage Posts</Link></div>
                     <div className="sidebar-li"><Link className="li-link" to='/admin/manage-users'>Manage Users</Link></div>
                     <div className="sidebar-li"><Link className="li-link" to='/admin/manage-comments'>Manage Comments</Link></div>
                    <Button style={{marginTop: '5px'}} variant="outline-danger" size='sm' onClick={() =>logoutUser()}>Logout</Button>{' '}
                     
                 </div>
             </div>
                 : 
              window.location.reload()
             }
        </div>
            </Offcanvas.Body>
          </Offcanvas>
        </>
    );

    
}

export default AdminSidebar;


