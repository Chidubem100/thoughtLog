import React, { useState,useEffect} from "react";
import { useGlobalConext } from "../context";
import Loading from "../loading";
import { useNavigate,useParams } from "react-router-dom";
import axios from 'axios';
import { useLocalState } from "../../utils/alert";
import { CreateComment } from "./Comments";


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
        return <section className="container-fluid">
        
            <h3>{postTitle}</h3>
            <span>{postDate.slice(0,10)}</span>
            <div>
                <img src={postImage} alt={postTitle}/>
            </div>
            <p>{postBody}</p>

            <article style={{border:'solid black 2px'}} >
                <h4>Comments</h4>
                {
                    postComment.length < 1 ? (<p>No Comment Available Now!</p>) : 
                    (
                        
                        postComment.map((c) =>{
                            const {id,comment,username} = c;
                           
                          return  <div key={id} className="column" style={{border:'solid blue 1px'}}>
                                    {editComment.id === id ? <div>
                                        <input 
                                            type="text" 
                                            name="comment" 
                                            value={editComment.comment}
                                            onChange={handleEditCommentChange}
                                        />
                                        <button onClick={handleSaveComment}>Save</button>
                                    </div> 
                                        : 
                                    <div>
                                            <h6>{username}</h6> 
                                            <span>{comment}</span>
                                            <br/>
                                            {accessT && user.username === username? <button className="btn btn-primary" onClick={() =>handleCommentEdit(id,comment)} >Edit Comment</button> : ''} 

                                    </div>
                                
                                }

                                
                                
                            </div>
                        })
                    
                    )

                    
                }
                <CreateComment postId={postId} />
            </article>
        </section>
    }
    
}

export default SinglePostPage;