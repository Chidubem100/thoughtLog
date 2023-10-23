import React, { useEffect, useState } from "react";
import Loading from "../loading";
import { useGlobalConext } from "../context";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useLocalState } from "../../utils/alert";
import Alert from "../../components/Alert";
const baseURL = 'http://localhost:5000/api/v1/admin/allComment'


function ManageComments(){
    const {isLoading,setIsLoading,token} = useGlobalConext();
    const {showAlert,setSuccess,alert} = useLocalState();
    const [comments, setComments] = useState([]);
    const navigate  = useNavigate();

    if(!token){
        navigate('/login')
    }

    const handleDelete = async(commentId) =>{
        
        const updatedComments = comments.filter((com) => com.id !== commentId)
        setComments(updatedComments)
        await axios.delete(`http://localhost:5000/api/v1/admin/${commentId}/deleteComment`).then((resp) =>{
            if(resp){
                showAlert(true,"Comment have been deleted successfully", "danger")
            }
            // window.location.reload()
        }).catch((err) =>{
            setComments(comments)
            console.log(err)
        })
    
    }

    useEffect(() =>{
        axios.get(baseURL,{
            headers:{
                Authorization: `Bearer ${token}`
            },
        }).then((resp) =>{
            if(resp){
                setComments(resp.data.data)
                console.log(resp.data)
                setIsLoading(false)
                setSuccess(true)
            }
        }).catch((err) =>{
            console.log(err)
        })
    },[])

    if(isLoading){
        <Loading/>
    }

    return <section className="container">
        <div className="column">
            <h4 style={{textAlign:'center'}}>Manage Comments</h4>
            <div className="row">
                {!comments ? <h5>No comments available</h5> :
                <table>
                    <thead>
                        <tr>
                            
                            <th>Comments</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {
                           
                            comments.map((c) =>{
                            
                                return <tr key={c.id}>
                                    
                                    <td>{c.comment}</td>
                                    <td><button onClick={()=>handleDelete(c.id)}>Delete</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>}
            </div>
        </div>
    </section>
}


export default ManageComments;