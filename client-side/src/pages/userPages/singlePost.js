import React, { useState,useEffect,useCallback } from "react";
import { useGlobalConext } from "../../context";
import Loading from "../loading";
import { Link,useParams } from "react-router-dom";
import axios from 'axios';
import { useLocalState } from "../../utils/alert";
import Alert from "../../components/Alert";

function SinglePostPage(){
    const {isLoading,setIsLoading,isUser} = useGlobalConext();
    const {id} = useParams();
    const {alert,showAlert} = useLocalState()
    const baseURL = `http://localhost:5000/api/v1/blog/${id}`;
    const [post,setPost] = useState(null);

    const fetchPost = useCallback(async() =>{ 
        setIsLoading(true)
        try {
            const dataa = await axios.get(baseURL);
            const {data} = dataa;
            if (data) {
                console.log(data)
                setPost(data.data)
            } else {
                setPost(null)
            }
            setIsLoading(false)
        } catch (error) {
            showAlert(true,[error.response.data.msg],'danger')
            console.log(error)
        }
    },[baseURL,setIsLoading,showAlert]);

    console.log(post)

    useEffect(() =>{
        fetchPost();
        document.title = `thought Log`
    },[fetchPost]);

    if(isLoading){
        return <Loading/>
    }


    return <section>
        Singleposts
        {/* <Comments/> */}
        {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
        <Link to='/' className='btn btn-primary'>
          back home
        </Link>
    </section>
}

export default SinglePostPage;