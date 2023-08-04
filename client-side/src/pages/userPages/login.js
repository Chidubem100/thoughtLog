import React,{useState,useEffect} from "react";
import { useGlobalConext } from "../../context";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate} from "react-router-dom";
import { useLocalState } from "../../utils/alert";
import Alert from "../../components/Alert";
const baseURL = 'http://localhost:5000/api/v1/auth/login';

function LoginPage(){
    const navigate = useNavigate();
    const {saveUser} = useGlobalConext()
    const {showAlert,loading,setLoading,setSuccess,alert} = useLocalState();
    const [val,setVal] = useState({email:'',password:''})
    

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
            const {data} = await axios.post(baseURL,loginUser);
            console.log(data.user)
            saveUser(data.user)
            setSuccess(true)
            setLoading(false)
            setVal({email:"",password:""});
            
            
            showAlert({
                text: `Welcome, ${data.username}.`,
                type: 'success',
            });
            navigate('/', {replace: true})
             
        } catch (error) {
            const { data } = error.response;
            setLoading(false);
            showAlert( true,  [data.msg]||'There was an error','danger' );
            console.log(error)
        }
    }
    
    useEffect(() =>{
        document.title = 'Login'
    },[]);

    return <section className="form-main container">   
    
                <Form className={loading? 'sect-form form-loading' : 'sect-form'} onSubmit={handleForm}>
                    {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
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
            
                    <Button className="form-btn" disabled={loading} style={{background:'#e2e0ff',fontWeight:'bold',color:'#425e16', border:'none'}} type="submit">Submit</Button>

                    <div style={{marginTop:'7px'}}>
                        <p>Not a user? <Link to='/signup' style={{color:'#e2e0ff',textDecoration:'none'}}>Sign Up here</Link></p>
                    </div>
                    <p>
                        Forgot your password?{' '}
                        <Link to='/user/forgot-password' style={{color:'#e2e0ff'}} >
                            Reset Password
                        </Link>
                    </p>
                </Form>
    </section>
}

export default LoginPage;