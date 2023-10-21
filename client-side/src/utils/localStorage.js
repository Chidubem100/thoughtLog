import axios from "axios";

const addAccessTokenToLocalStorage = (token) =>{
    localStorage.setItem('accessToken', token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const addUserToLocalStorage = (token) =>{
    return localStorage.setItem('refreshToken', token)    
}

const accessToken = () =>{
    return localStorage.getItem('accessToken')
}

const removeUser =()=>{
    localStorage.removeItem('accessToken');
};

export {addUserToLocalStorage,addAccessTokenToLocalStorage,removeUser,accessToken};