import React,{useState,useEffect} from "react";
import { useGlobalConext } from "../context"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams} from "react-router-dom";
import { useLocalState } from "../../utils/alert";
import Alert from "../../components/Alert";
import axios from "axios";

function UpdatePost({match}){
    const {postId} = useParams();
    const {token} = useGlobalConext();
    const navigate = useNavigate();  
    const {showAlert,loading,setLoading,setSuccess,alert} = useLocalState();
    const [post, setPost] = useState({title:'', body:'', image:null})
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() =>{
        axios.get(`http://localhost:5000/api/v1/blog/${postId}`).then((resp) =>{
            setPost(resp.data.data)
        }).catch((e) =>{
            console.log(e)
        })
    },[postId])

    const handleImage = (e) =>{
        setPost({...post, image:e.target.files[0]})
    };
    
    const handleChange = (e) =>{
        setPost({...post, [e.target.name]: e.target.value})
    }

    const handleForm = async(e) =>{
        e.preventDefault();
        setIsSubmitting(true)
        const formData = new FormData();
        formData.append('title', post.title)
        formData.append('body', post.body)
        formData.append('image', post.image)
        
        if(!token){
            setLoading(false)
            navigate('/login')
        }

        await axios.patch(`http://localhost:5000/api/v1/admin/${postId}`, formData,{
            headers:{
                'Content-Type': 'multipart/form-data',                  
                Authorization: `Bearer ${token}`
    
            },
        }).then((response) =>{
            if(response){
                setSuccess(true)
                setLoading(false)
                setPost({title:"", body: "", image:null})
                navigate("/admin/manage-posts")
                console.log(response.data)
            }
            if(response.status === 400){
                showAlert(true, "Please provide the needed values","danger")
            }
        }).catch((err) =>{
            showAlert("true", err.message||"Something went wrong. Try again!", "danger")
            console.log(err.message)
        }).finally(() =>{
            setIsSubmitting(false)
        })

       
    }
    useEffect(() =>{
        document.title = 'update post'
    },[]);

    return <section className="form-main container">   
    
                <Form className={loading? 'sect-form form-loading' : 'sect-form'} onSubmit={handleForm}>
                    {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
                    
                    <h4>Edit post</h4>
                    <Form.Group className="mb-3" >
                        <Form.Label>Title: </Form.Label>
                        <Form.Control 
                            style={{border:'none'}} 
                            type="text" 
                            placeholder="Enter Post Title" 
                            name="title"
                            value={post.title}
                            onChange={handleChange}
                             
                        />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Image:</Form.Label>
                        <Form.Control type="file" accept="image/*" name="image" onChange={handleImage}/>
                    </Form.Group>
            
                    <Form.Group className="mb-3">
                        <Form.Label>Body:</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={5} 
                            type="text" 
                            placeholder="Body" 
                            name="body" 
                            value={post.body}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button className="form-btn" disabled={loading} style={{background:'#e2e0ff',fontWeight:'bold',color:'#425e16', border:'none'}} type="submit">
                        {loading ? 'Please Wait...' : 'Submit'}{/* Submit */}
                    </Button>

                   
                </Form>
    </section>
}

export default UpdatePost;