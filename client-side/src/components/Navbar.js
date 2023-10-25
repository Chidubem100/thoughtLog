import React from "react";
import { Link} from 'react-router-dom';
import LogoutUtils from "../utils/logoutUtils";
import { useGlobalConext } from "../pages/context";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function AppNavbar(){ 
    
    const {token} = useGlobalConext();
    const {logoutUser} = LogoutUtils();
    const user = JSON.parse(localStorage.getItem('user'));
    
    return (
        <Navbar collapseOnSelect expand="lg" sticky="top" style={{backgroundColor:'#425e16', color: '#e2e0ff'}}>
          <Container >
            <Navbar.Brand href="/" style={{color: '#e2e0ff',fontSize:'23px', fontWeight:'bold'}}>Thought Log</Navbar.Brand>
            <Navbar.Toggle style={{backgroundColor:'#e2e0ff', color: '#e2e0ff'}} aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              {user && token ? (
                <Nav >
                    <Navbar.Text className="me-auto" style={{color: '#e2e0ff', fontSize:'15px'}}>Signed in as :{user?user.username:''}</Navbar.Text>

                    <Nav.Link href="/" style={{color: '#e2e0ff', fontSize:'18px'}}>Home</Nav.Link>
                    <Button variant="outline-danger" size='sm' onClick={() =>logoutUser()}>Logout</Button>{' '}
                    {/* <button onClick={() => logoutUser()}>LogOut</button> */}
                </Nav>
              ) : (
                
                <Nav>
                    <Nav.Link href="/" style={{color: '#e2e0ff', fontSize:'18px'}}>Home</Nav.Link>
                    <Nav.Link href="/login" style={{color: '#e2e0ff', fontSize:'18px'}}>Login</Nav.Link>
                    <Nav.Link href="/signup" style={{color: '#e2e0ff', fontSize:'18px'}}>Register</Nav.Link>
                </Nav>
              )
              
                
                }

              
              
              
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
    
    
     
}

export default AppNavbar;

