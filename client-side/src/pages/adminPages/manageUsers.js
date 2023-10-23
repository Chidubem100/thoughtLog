import React, { useEffect, useState } from "react";
import Loading from "../loading";
import { useGlobalConext } from "../context";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useLocalState } from "../../utils/alert";
import Alert from "../../components/Alert";
const baseURL = 'http://localhost:5000/api/v1/admin/users'



function Manageusers(){
    const {isLoading,setIsLoading,token} = useGlobalConext();
    const {showAlert,setSuccess,alert} = useLocalState();
    const [users, setUsers] = useState([]);
    const navigate  = useNavigate();
    


    if(!token){
        navigate('/login')
    }

    const handleDelete = async(userId) =>{
        
        const updatedUsers = users.filter((user) => user.id !== userId)
        setUsers(updatedUsers)
        await axios.delete(`http://localhost:5000/api/v1/admin/${userId}/deleteUser`).then((resp) =>{
            if(resp){
                showAlert(true,"User have been deleted successfully", "danger")
            }
            window.location.reload()
        }).catch((err) =>{
            setUsers(users)
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
                setUsers(resp.data.data)
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
            <h4 style={{textAlign:'center'}}>Manage Users</h4>
            <div>
                <p>There are <b>{users.length}</b> registered users</p>
            </div>
            <div className="row">
                <table>
                    <thead>
                        <tr>
                            <th>
                                Username
                            </th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) =>{
                            
                            return <tr key={u._id}>
                                <td>{u.username}</td>
                                <td>{u.email}</td>
                                <td><button onClick={()=>handleDelete(u._id)}>Delete</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </section>
}


export default Manageusers;