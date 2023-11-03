import React, { useState,useEffect} from "react";
import { useGlobalConext } from "../context";
import Loading from "../loading";
import { useNavigate,useParams } from "react-router-dom";
import axios from 'axios';
import { useLocalState } from "../../utils/alert";
import { CreateComment } from "./Comments";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";

function SinglePostPage(){
    const navigate = useNavigate();
    const {isLoading,setIsLoading,token, setCommentArr} = useGlobalConext();
    const [post,setPost] = useState(null);
    const [editComment, setEditComment] = useState({id:null,comment: '' });
    const [isEditing, setIsEditing] = useState(false);
    const {id} = useParams();
    const {showAlert} = useLocalState();
    const baseUrl = `http://localhost:5000/api/v1/comment/${editComment.id}`;
    const baseURL = `http://localhost:5000/api/v1/blog/${id}`;
    
    const user = JSON.parse(localStorage.getItem('user'));
    const accessT = localStorage.getItem('accessToken');

    const handleCommentEdit = async(commentId, commentText) =>{
        setIsEditing(true)
        setEditComment({id:commentId, comment:commentText})
    };

    const handleSaveComment = async() =>{
        if(!token){
            navigate('/login')
        }
        try {
            const resp = await axios.patch(baseUrl, {comment:editComment.comment},{
                headers:{
                    Authorization: `Bearer ${token}`
                },
            });
            setCommentArr((p) => p.map((c) =>{
                if(c.id === editComment.id){
                    return {...c, comment: editComment.comment}
                }
                return c;
            }))
            window.location.reload();
            setEditComment({id:null, comment:""})
        } catch (error) {
            console.log("Error occurred", error)
        }
    };
    const handleEditCommentChange = (e) =>{
        setEditComment({...editComment, comment:e.target.value})
    }


    const fetchData = async() =>{
        
        setIsLoading(true)
        try {
            const resp = await fetch(baseURL, {
                method:"GET",
                mode: "cors"
            });
            
            if(resp.ok){
                setIsLoading(false)
                const data = await resp.json();
                
                if(data){
                    const {
                        id: postId,
                        title: postTitle,
                        body: postBody,
                        image: postImage,
                        comment: postComment,
                        createdAt: postDate,
                    } = data.data;

                    const details = {
                        postTitle,
                        postBody,
                        postImage,
                        postComment,
                        postDate,
                        postId
                    }
                    
                    setPost(details)
                    setCommentArr(postComment)
                    
                }


               
            }else{
                setIsLoading(false)
                const data = await resp.json();
                
                showAlert(true, data.msg || "An error ocurred!! Try again.")
            }


        } catch (error) {
            console.log(error.message)
            setIsLoading(false)
            showAlert(true, error.message|| "Something went wrong!! Try again", 'danger')
        }
    }

    useEffect(() =>{
        fetchData();
    },[]);

    
    if(isLoading){
        return <Loading/>
    }

    if(!post){
        return <h2>No Post found!!</h2> 
    }else{
        const {postId,postTitle,postBody,postComment,postDate,postImage} = post;
        return <section >
            
            <Card className="container" style={{marginTop:'6px',border:'1px solid #425e16'}}>
                <Card.Header style={{backgroundColor: 'rgb(91,133,26)',color: '#e2e0ff', textAlign:'center',fontWeight:'Bold'}}>{postTitle}</Card.Header>
                {postImage !== 'null' ? <Card.Img variant="top" src={postImage} ></Card.Img> : ' '}
                <Card.Body>
                    {postBody}
                    {/* <Card.Text style={{textAlign: 'center'}} >{postBody}</Card.Text> */}
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Posted on: {postDate.slice(0,10)}</small>
                    
                </Card.Footer>
            
                <Card.Body>            
                
                    
                    {
                    postComment.length < 1 ? (<p>No Comment Available Now!</p>) : 
                    (
                        
                        postComment.map((c) =>{
                            const {id,comment,username} = c;
                           
                          return  <Card key={id} style={{border:'solid #425e16 1px'}} >
                                        

                                    {editComment.id === id ? <Form>
                                        <h5 style={{textAlign:'center'}}>Edit Commment</h5>
                                        <Form.Group>
                                            <Form.Control 
                                                
                                                type="text"
                                                name="comment" 
                                                value={editComment.comment}
                                                onChange={handleEditCommentChange}
                                                
                                            />
                                        </Form.Group>
                                        <Button style={{backgroundColor: '#425e16', color:'#e2e0ff'}} onClick={handleSaveComment}>Save</Button>
                                        
                                    </Form> 
                                        : 
                                        
                                    <Card style={{border:'1px #425e16 solid', borderRadius:'7px'}}>
                                        {/* <Card.Title style={{textAlign:'center'}}>Comments</Card.Title> */}
                                        
                                        <Card.Body>
                                            <Card.Subtitle style={{textTransform:'capitalize'}} className="mb-2 text-muted">{username}</Card.Subtitle>
                                            <Card.Text>{comment}</Card.Text>
                                            
                                            {accessT && user.username === username? <Button variant="outline-primary" size="sm" onClick={() =>handleCommentEdit(id,comment)} >Edit Comment</Button> : ''} 
                                        </Card.Body>
                                        

                                    </Card>
                                
                                }

                                
                                
                            </Card>
                        })
                    
                    )
                    
                }
                 {accessT && user ? <CreateComment postId={postId} /> : ''}
            
                </Card.Body>
            
                
            </Card>
            
        </section>
    }
    
}

export default SinglePostPage;