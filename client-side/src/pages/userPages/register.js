import React,{useState,useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import { useLocalState } from "../../utils/alert";
import Alert from "../../components/Alert";
import {addAccessTokenToLocalStorage } from "../../utils/localStorage";
import { useGlobalConext } from "../context";
const baseURL = 'http://localhost:5000/api/v1/auth/signup';

function RegisterPage(){
    const {setUser, setToken} = useGlobalConext();
    const {showAlert,alert,loading,setLoading,setSuccess} = useLocalState();
    const [val,setVal] = useState({username:'',email:'',password:''})
    
    function handleChange(e){
        setVal({...val, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault();
        if(!val.username || !val.email || !val.password){
            showAlert(true,'Provide the needed values', 'danger')
        }

        setLoading(true)
        const {email,username,password} = val;
        const newUser = {email,username,password};

        try {
            const response = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser),
            });
            if(response.ok){
                const data = await response.json();
                const {accessToken} = data;

                const user = JSON.stringify(data.userPayload);
                localStorage.setItem('user', user);
                addAccessTokenToLocalStorage(accessToken);

                setToken(accessToken)
                setUser(data.userPayload);
                
                setSuccess(true);
                setVal({username:'',email:'',password:''});
                showAlert(true,'Registration successful!!', 'success');

                window.location.href = '/'
                
            }else{
                const data = await response.json();
                showAlert(true, data.msg||'Sign-up failed', 'danger');
                console.log('error occurred!')
            }
            
        } catch (error) {
            console.log(error)
            showAlert(true,'Something went wrong. Try again!!', 'danger');
        }
        setLoading(false)
    }

    useEffect(() =>{
        document.title = 'Sign-up'
        const storedToken = localStorage.getItem('accessToken');
        if(storedToken){
            setToken(storedToken)
        }
    },[setToken]);
    
    return <section className="form-main container">   
   
            
            
                <Form className={loading? 'sect-form form-loading' : 'sect-form'} onSubmit={handleSubmit} >
                    {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
                    <h4>Sign up</h4>
                
                    <Form.Group className="mb-3" >
                        <Form.Label>Email address:</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={val.email} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" name="username" value={val.username} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={val.password} onChange={handleChange}/>
                    </Form.Group>
            
                    <Button className="form-btn" disabled={loading} style={{background:'#e2e0ff',fontWeight:'bold',color:'#425e16', border:'none'}} type="submit">Submit</Button>

                    <div style={{marginTop:'7px'}}>
                        <p>Already a user? <Link to='/login' style={{color:'#e2e0ff',textDecoration:'none'}}>Login here</Link></p>
                    </div>
                
                </Form>
            
    </section>
}

export default RegisterPage;