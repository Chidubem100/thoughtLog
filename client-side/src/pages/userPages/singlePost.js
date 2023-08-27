import React, { useState,useEffect,useCallback } from "react";
import { useGlobalConext } from "../../context";
import Loading from "../loading";
import { Link,useParams } from "react-router-dom";
import axios from 'axios';
import { useLocalState } from "../../utils/alert";
import Alert from "../../components/Alert";
// import {} from 'bootstrap/dist/';

function SinglePostPage(){
    const {isLoading,setIsLoading,user} = useGlobalConext();
    const {id} = useParams();
    const {alert,showAlert} = useLocalState()
    const baseURL = `http://localhost:5000/api/v1/blog/${id}`;
    const [post,setPost] = useState(null);
    console.log(post)
    
    const fetchSinglePost = async() =>{
        setIsLoading(true)
        try {
            const resp = await fetch(baseURL)
            const data = await resp.json();
            setPost(data)
            setIsLoading(false)
            console.log(data)
        } catch (error) {
            
        }
        setIsLoading(false)
    }

    useEffect(() =>{
        // setIsLoading(true)
        const u = async() =>{
            setIsLoading(true)
            try {
                const resp = await fetch(baseURL)
                const data = await resp.json()
                setPost(data)
                setIsLoading(false)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false)
        }
        u();   
    });

    // useEffect(() =>{
    //     fetchSinglePost()
    //     document.title = 'thought log'
    // },[fetchSinglePost])
    
    if(isLoading){
        return <Loading/>
    }

    return <section className="container">
        {/* {console.log(post)} */}
        <div className="row">
            <h3>single post</h3>
            <div className="column">
                {/* <div>{post.title}</div> */}
            </div>
        </div>
        {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
        
        <Link to='/' className='btn btn-primary'>
          back home
        </Link>
    </section>
}

export default SinglePostPage;