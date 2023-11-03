import React,{useState,useEffect} from "react";
import { useGlobalConext } from "../context"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link,useNavigate, useLocation} from "react-router-dom";
import { useLocalState } from "../../utils/alert";
import Alert from "../../components/Alert";
import { addAccessTokenToLocalStorage } from "../../utils/localStorage";
const baseURL = 'http://localhost:5000/api/v1/auth/login';

function LoginPage(){
    let navigate = useNavigate();
    const location = useLocation();
    const {from} = location.state || {from :{pathname: '/'}}
    const {setUser,setToken} = useGlobalConext();
    const {showAlert,loading,setLoading,setSuccess,alert} = useLocalState();
    const [val,setVal] = useState({email:'',password:''});
    
    function handleChange(e){
        setVal({...val, [e.target.name]: e.target.value})
    }

    async function handleForm(e){
        e.preventDefault();
        
        if(!val.email || !val.password){
            showAlert(true,'Provide the needed values', 'danger')
        }
        setLoading(true)
        const {email,password} = val;
        const loginUser = {email,password};
        
        try {
            const response = await fetch(baseURL, {
                method: 'POST',
                mode: "cors",
                body: JSON.stringify(loginUser),
                headers:{
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            
            
            if(response.ok){
                    
                const data = await response.json();
                const {accessToken} = data;
                
                const user = JSON.stringify(data.userPayload)
                localStorage.setItem('user', user)
                addAccessTokenToLocalStorage(accessToken);

                setToken(accessToken)
                setUser(data.userPayload);
                
                setSuccess(true)
                setVal({email:"",password:""});
                showAlert(true,'successfully logged in!!', 'success');
                
                navigate(from,{replace:true})
                window.location.reload()    
            }else{
                const data = await response.json();
                showAlert(true, data.msg||'Login-in failed', 'danger');
                console.log('error occurred!')
            }
            
            
        } catch (error) {
            console.log(error)
            showAlert(true,'Something went wrong. Try again!!', 'danger');
        }
        setLoading(false)
       
    }
    
    useEffect(() =>{
        document.title = 'Login'
        const storedToken = localStorage.getItem('accessToken');
        if(storedToken){
            setToken(storedToken)
        }
    },[setToken]);

    return <section className="form-main container">   
    
                <Form className={loading? 'sect-form form-loading' : 'sect-form'} onSubmit={handleForm}>
                    {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
                
                    <h4>Login</h4>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email address:</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={val.email} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={val.password} onChange={handleChange}/>
                    </Form.Group>
            
                    <Button className="form-btn" disabled={loading} style={{fontSize:'18px',width: '100%',background:'#e2e0ff',fontWeight:'bold',color:'#425e16', border:'none'}} type="submit">
                        {loading ? 'Please Wait...' : 'Submit'}{/* Submit */}
                    </Button>

                    <div style={{marginTop:'7px', textAlign:'center'}}>
                        <p>Not a user? <Link to='/signup' style={{color:'#e2e0ff',textDecoration:'none'}}>Sign Up here</Link></p>
                    </div>
                    <p style={{textAlign:'center'}}>
                        Forgot your password?{' '}
                        <Link to='/user/forgot-password' style={{color:'#e2e0ff'}} >
                            Reset Password
                        </Link>
                    </p>
                </Form>
    </section>
}

export default LoginPage;