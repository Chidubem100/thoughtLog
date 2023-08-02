import React,{useState,useEffect} from "react";
import { useGlobalConext } from "../../context";
import axios from "axios";
const baseURL = 'http://localhost:5000/api/v1/register'

function RegisterPage(){
    const [form,setForm] = useState({username:'',email:'',password:''})
    
    
    return <section>
        Register Page
    </section>
}

export default RegisterPage;