import React, { useState,useEffect,useCallback } from "react";
import { useGlobalConext } from "../../context";
import Loading from "../loading";
import { Link,useParams } from "react-router-dom";
import axios from 'axios';
import { useLocalState } from "../../utils/alert";
import Alert from "../../components/Alert";

function SinglePostPage(){
    const {isLoading,setIsLoading,user} = useGlobalConext();
    const {id} = useParams();
    const {alert,showAlert} = useLocalState()
    const baseURL = `http://localhost:5000/api/v1/blog/${id}`;
    const [post,setPost] = useState(null);
    console.log(post)
    
    return <section>
        <h3>singlePost</h3>
    </section>
}

export default SinglePostPage;