import React,{useState,useEffect} from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate,useLocation} from "react-router-dom";
import { useLocalState } from "../../utils/alert";
import Alert from "../../components/Alert";
const baseURL = 'http://localhost:5000/api/v1/auth/reset-password';

function useQuery(){
    return new URLSearchParams(useLocation().search)
}

function ResetPasswordPage(){
    const {loading,showAlert,alert,setSuccess,setLoading} = useLocalState()
    const query = useQuery();
    const navigate = useNavigate();
    const [val,setVal] = useState({password:'', confirmPassword:''});

    function handleChange(e){
        setVal({...val, [e.target.name]:e.target.value})
    }

    async function handleForm(e){
        e.preventDefault();
        if(!val.password || !val.confirmPassword){
            showAlert(true,"Please input the needed values",'danger')
        }

        const {password,confirmPassword} = val;
        const u = {password,confirmPassword}
        setLoading(true)
        try {
            const {data} = await axios.post(baseURL,{
                u,
                email: query.get('email'),
                token: query.get('token'),
            });
            console.log(data)
            setLoading(false)
            setSuccess(true)
            showAlert(true,"Redirecting you to login page....","success")
            setTimeout(() =>{
                navigate('/login',{replace:true})
            },3000);
        } catch (error) {
            console.log(error)
            setLoading(false)
            showAlert(true,[error.response.data.msg]||"Error Occurred!!","danger")
        }
    }

    useEffect(() =>{
        document.title = 'Reset password'
    },[])

    return <section className="form-main container">   
    
    <Form onSubmit={handleForm} className={loading? 'sect-form form-loading' : 'sect-form'} >
        {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
        <h4>Reset password</h4>
        <Form.Group className="mb-3" >
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" placeholder="Enter New Password"  name="password"  value={val.password} onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" >
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Confirm Password" name="confirmPassword" value={val.confirmPassword} onChange={handleChange}/>
        </Form.Group>
        <Button className="form-btn" disabled={loading} style={{background:'#e2e0ff',fontWeight:'bold',color:'#425e16', border:'none'}} type="submit">
        {loading ? 'Please Wait...' : 'Reset Password'}
        </Button>

    </Form>
</section>
}

export default ResetPasswordPage;