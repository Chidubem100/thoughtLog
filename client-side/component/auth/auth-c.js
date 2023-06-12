// alert("auth-c page")

const formDomm = document.querySelector('.formm');
const formDom = document.querySelector('.form');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const formAlert = document.querySelector('.form-alert');
const btnDom = document.querySelector('.btn');


formDom.addEventListener('submit', async(e) =>{
    formAlert.classList.remove('text-success');

    e.preventDefault();
    let formDataa = {
        email: emailInput.value,
        password: passwordInput.value
    }

    try {
        const response = await fetch('http://localhost:3000/api/v1/auth/login', {
            method: 'POST',
            headers:{
                "Content-type": "application/json",
            },
            body: JSON.stringify(formDataa)
        });
        const result = await response.json();
        console.log(result)

        formAlert.classList.add('text-success')
        usernameInput.value = ''
        passwordInput.value = ''

    } catch (error) {
        console.log(error)        
    }
});


// formDomm.addEventListener('submit', async(e) =>{
//     formAlert.classList.remove('text-success');

//     e.preventDefault();
//     let formDataa = {
//         username: usernameInput.value,
//         email: emailInput.value,
//         password: passwordInput.value
//     }

//     try {
//         const response = await fetch('http://localhost:3000/api/v1/auth/signup', {
//             method: 'POST',
//             headers:{
//                 "Content-type": "application/json",
//             },
//             body: JSON.stringify(formDataa)
//         });
//         const result = await response.json();
//         console.log(result)

//         formAlert.classList.add('text-success')
//         usernameInput.value = ''
//         passwordInput.value = ''

//     } catch (error) {
//         console.log(error)        
//     }
// });

// const data = {
//             username: usernameInput.value,
//             email: emailInput.value,
//             password: passwordInput.value
// }

// async function userLogin(data){
//     try {
//         const response = await fetch('http://localhost:3000/api/v1/auth/login', {
//             method: 'POST',
//             headers:{
//                 "Content-type": "application/json",
//             },
//             body: JSON.stringify(data)
//         });
//         const result = await response.json();
//         console.log(result)
//     } catch (error) {
//         console.log(error)        
//     }
// }

// const data = {
//     username: usernameInput.value,
//     email: emailInput.value,
//     password: passwordInput.value
// }
// userLogin(data);