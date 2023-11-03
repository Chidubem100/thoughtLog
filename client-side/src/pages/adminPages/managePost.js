import React, { useEffect, useState } from "react";
import { useGlobalConext } from "../context";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useLocalState } from "../../utils/alert";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
const baseURL = 'http://localhost:5000/api/v1/admin/blog/';



function ManagePosts(){
    const {isLoading,setIsLoading,token} = useGlobalConext();
    const {showAlert,setSuccess,alert} = useLocalState();
    const [posts, setPosts] = useState([]);
    const navigate  = useNavigate();

    if(!token){
        navigate('/login')
    }

    const handleDelete = async(postId) =>{
        const updatedPost = posts.filter((p) =>p.id !== postId)
        setPosts(updatedPost)
        await axios.delete(`http://localhost:5000/api/v1/admin/${postId}`).then((resp) =>{
            if(resp){
                showAlert(true,"User have been deleted successfully", "danger")
            }
            
        }).catch((err) =>{
            setPosts(posts)
            console.log(err)
        })
    }


    useEffect(() =>{
        axios.get(baseURL, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then((resp) =>{
            if(resp){
                setPosts(resp.data.data)
                
                setIsLoading(false)
                setSuccess(true)
            }
        }).catch((err) =>{
            console.log(err)
        })
    },[]);

    return <section className="container">
        <div className="column">
            <h4 style={{textAlign:'center'}}>Manage Posts</h4>
            <p>{posts.length} Blog posts</p>
            <div className="row">
                {!posts ? <h5>No post available</h5> :
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                Body
                            </th>
                            <th>Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map((p) =>{
                                return <tr key={p.id}>
                                    <td>{p.body}</td>
                                    <td>{p.title}</td>
                                    <td><Button variant="outline-primary" size="sm" onClick={()=>{navigate(`/admin/update-post/${p.id}`)}}>Update</Button></td>
                                    <td><Button variant="outline-danger" size="sm" onClick={()=>handleDelete(p.id)}>Delete</Button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>}
            </div>
        </div>
    </section>
}


export default ManagePosts;