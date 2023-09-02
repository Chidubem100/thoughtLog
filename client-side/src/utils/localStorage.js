const addUserToLocalStorage = (user) =>{
    return localStorage.setItem('user', JSON.stringify(user));
}
const addToken = (token) =>{
    return localStorage.setItem('token',JSON.stringify(token))
}
const getUserFromLocalStorgae = () =>{
   const result = localStorage.getItem('user');
    const user = result ? JSON.parse(result) : null;
    return user
};

const getTokenFromLocalStorage = () =>{
    const userToken = localStorage.getItem('token');
    // const userToken = x ? JSON.parse(x) : null
    return userToken;
};

const removeUser =()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

export {getUserFromLocalStorgae,addUserToLocalStorage,getTokenFromLocalStorage,removeUser,addToken};