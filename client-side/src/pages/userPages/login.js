import React,{useState,useEffect} from "react";
import { useGlobalConext } from "../../context";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
const baseURL = 'http://localhost:5000/api/v1/login';

function LoginPage(){
    // const [form,setForm] = useState({username:'',email:'',password:''})
    
    
    return <section className="form-main container">   
    
                <Form className="sect-form">
                    <h4>Login</h4>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email address:</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
            
                    <Button className="form-btn" style={{background:'#e2e0ff',fontWeight:'bold',color:'#425e16', border:'none'}} type="submit">Submit</Button>

                    <div style={{marginTop:'7px'}}>
                        <p>Not a user? <Link to='/signup' style={{color:'#e2e0ff',textDecoration:'none'}}>Sign Up here</Link></p>
                    </div>
                
                </Form>
    </section>
}

export default LoginPage;