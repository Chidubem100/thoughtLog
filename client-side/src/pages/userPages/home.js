import React, { useState,useEffect,useCallback } from "react";
import { useGlobalConext } from "../context";
import Loading from "../loading";
import axios from 'axios';
import { Link} from "react-router-dom";
const baseURL = 'http://localhost:5000/api/v1/blog'


function HomePage(){
    const {isLoading,setIsLoading} = useGlobalConext();
    // const {username} = user;
    const [posts, setPosts] = useState([])

    const fetchData = useCallback(async(str) =>{
        setIsLoading(true)
        try {
            const dataa = await axios.get(str);
            const {data} = dataa;
            if (data) {
                setPosts(data.data)
            } else {
                setPosts([])
            }
            setIsLoading(false)
        } catch (error) {
            
            setIsLoading(false)
            console.log(error)
        }
    },[setIsLoading]);

    
    useEffect(() =>{
        fetchData(baseURL)
        document.title = 'thought Log'
    },[fetchData])

    if(isLoading){
        return<Loading/>
    }

    return <section>
        {

            posts.map((p) =>{
                const {id,title,body,createdAt} = p;
                return <article key={id} className="container  sect-contain">
                    <div className="row">
                        <div className="column">
                            <h3>{title}</h3>
                            <div className="post-div">
                                <p>Created on: {createdAt.slice(0,10)}</p>
                                <p>{body.slice(0,150)}...<Link className="btnn" to={`post/${id}`}>Read more</Link></p>
                            </div>
                        </div>
                    </div>
                </article>
            })
        }
    </section>
}

export default HomePage;