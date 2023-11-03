import React, { useState,useEffect,useCallback } from "react";
import { useGlobalConext } from "../context";
import Loading from "../loading";
import axios from 'axios';
import { Link} from "react-router-dom";
import Card from 'react-bootstrap/Card';
const baseURL = 'http://localhost:5000/api/v1/blog';


function HomePage(){
    const {isLoading,setIsLoading} = useGlobalConext();
    const [posts, setPosts] = useState([]);

    const fetchData = useCallback(async(str) =>{
        setIsLoading(true)
        try {
            const dataa = await axios.get(str);
            const {data} = dataa;
            if (data) {
                setPosts(data.data)
                console.log(data.data)
            } else {
                setPosts([])
            }
            setIsLoading(false)
        } catch (error) {
            
            setIsLoading(false)
            
        }
    },[setIsLoading]);

    
    useEffect(() =>{
        fetchData(baseURL)
        document.title = 'thought Log'
    },[fetchData])

    if(isLoading){
        return<Loading/>
    }

    return <section >
        {

            posts.map((p) =>{
            const {id,title,body,createdAt,image} = p;
            return <Card style={{marginTop:'6px', border:'1px solid #425e16'}} className="container" border="#425e16" key={id}>
                    <Card.Header style={{fontWeight:'bold'}}>{title}</Card.Header>
                
                    {image !== 'null' ? <Card.Img variant="top" src={image} ></Card.Img> : ' '}
                
                    <Card.Body>
                        <Card.Text>{body.slice(0,150)}...<Link className="btnn" style={{backgroundColor: '#425e16', color:'#e2e0ff'}} to={`post/${id}`}>Read more</Link></Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Created on: {createdAt.slice(0,10)}</small>
                    
                    </Card.Footer>
                   
            </Card>
            })
        };
    </section>



    
}

export default HomePage;