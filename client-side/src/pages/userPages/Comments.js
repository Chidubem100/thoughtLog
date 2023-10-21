import React, {  useState } from "react";
import Form from 'react-bootstrap/Form';
import { useLocalState } from "../../utils/alert";
import Button from 'react-bootstrap/Button';
import Alert from "../../components/Alert";
import { useGlobalConext } from "../context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = 'http://localhost:5000/api/v1/comment/create';


function CreateComment({postId}){    
    const {token, setCommentArr} = useGlobalConext();
    const navigate = useNavigate();
    const {showAlert,loading,setLoading,setSuccess,alert} = useLocalState();
    const [val, setVal] = useState({comment:'',post:postId})
    
    const handleChange = (e) =>{
        setVal({...val, [e.target.name]: e.target.value})
        
    }

    const handleForm = async(e) =>{
        e.preventDefault();
        
        if(!val.comment){
            showAlert(true, "Please provide a text", "danger")
        }
        setLoading(true)
        const {comment,post} = val;
        const newComment = { comment,post};
        

        if(!token){
            setLoading(false)
            showAlert(true, "Please Log-in", "danger")
            navigate('/login')
        }

        axios.post(baseURL,newComment,{
            headers:{
                Authorization: `Bearer ${token}`
            },
        }).then((response) =>{
            if(response.status === 200){
                setSuccess(true)
                setLoading(false)
                setVal({comment: ""})
                setCommentArr(response.data)
                window.location.reload();
            }
            
        })
        .catch(function(error){
            if(error.response.status === 500){
                console.log(error)
                showAlert(true, error.message || "Something went wrong!! Try again.", "danger")
            }
        })
        

        setLoading(false);
    }
   

    return <section className="container">
        <Form className={loading? ' form-loading' : ''} onSubmit={handleForm}>
            {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
            
            <Form.Group className="mb-3">
                <Form.Control 
                    as="textarea" 
                    rows="2"  
                    style={{borderRadius: '7px', border:"solid black 1px", marginTop: '8px'}} 
                    type="text"
                    placeholder="New comment" 
                    name="comment" 
                    onChange={handleChange}
                    value={val.comment}
                />
            </Form.Group>

            <Button className="form-btn" disabled={loading} style={{background:'navy',fontWeight:'bold',color:'#425e16', border:'none'}} type="submit">
                {loading ? 'Please Wait...' : 'create comment'}{/* Submit */}
            </Button>

        </Form>
        
    </section>
}


export {CreateComment}