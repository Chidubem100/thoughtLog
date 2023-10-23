import React, { useEffect, useState } from "react";
import Loading from "../loading";
import { useGlobalConext } from "../context";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useLocalState } from "../../utils/alert";
import Alert from "../../components/Alert";
const baseURL = 'http://localhost:5000/api/v1/blog/';



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
            // window.location.reload()
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
                console.log(resp.data)
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
                <table>
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
                                    <td><button onClick={()=>{navigate(`/admin/update-post/${p.id}`)}}>Update</button></td>
                                    <td><button onClick={()=>handleDelete(p.id)}>Delete</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>}
            </div>
        </div>
    </section>
}


export default ManagePosts;