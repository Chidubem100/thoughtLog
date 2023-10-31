import React,{useState,useEffect} from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link} from "react-router-dom";
import { useLocalState } from "../../utils/alert";
import Alert from "../../components/Alert";
const baseURL = 'http://localhost:5000/api/v1/auth/forgot-password';

function ForgotPasswordPage(){
    const {loading,setLoading,setSuccess,alert,showAlert} = useLocalState()
    const [val, setVal] = useState({email:""});


    const handleChange = (e) =>{
        setVal({...val, [e.target.name]:e.target.value})
    }

    const handleForm = async(e) =>{
        e.preventDefault();
        if(!val.email){
            showAlert(true,"Please provide a valid email", 'danger')
        }

        setLoading(true)
        const {email} = val;
        const u = {email}
        
        try {
            const {data} = await axios.post(baseURL,u);
            setSuccess(true)
            setLoading(false)
            setVal({email:""})
            showAlert(true, [data.msg], "success")
        } catch (error) {
            setVal({email:""})
            showAlert(true,"Error occured.Try again", 'danger')
            setLoading(false)
        }
    }

    useEffect(() =>{
        document.title = 'forgot password'
    },[]);

    return <section className="form-main container">   
    
    <Form onSubmit={handleForm} className={loading? 'sect-form form-loading' : 'sect-form'} >
        {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
        <h4>Forgot password</h4>
        <Form.Group className="mb-3" >
            
            <Form.Control type="email" placeholder="Enter email" value={val.email} name="email" onChange={handleChange}/>
        </Form.Group>

        <Button className="form-btn" disabled={loading} style={{background:'#e2e0ff',fontWeight:'bold',color:'#425e16', border:'none'}} type="submit">
        {loading ? 'Please Wait...' : 'Get Reset Password Link'}
        </Button>

        <p>
            Already a have an account?
            <Link to='/login' style={{color:'#e2e0ff'}}>
              Log In
            </Link>
        </p>
    </Form>
</section>
}

export default ForgotPasswordPage;