const addUserToLocalStorage = (user) =>{
    return localStorage.setItem('user', JSON.stringify(user));
}

const getUserFromLocalStorgae = () =>{
   const result = localStorage.getItem('user');
    const user = result ? JSON.parse(result) : null;
    return user
};

export {getUserFromLocalStorgae,addUserToLocalStorage};