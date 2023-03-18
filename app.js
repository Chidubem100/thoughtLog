
require('dotenv').config();

const express = require('express');
const app = express();


// APP CONFIG

// ROUTES


app.get('/', (req,res) =>{
    res.send('thought log')
});


const port = 2000 || process.env.PORT;
app.listen(port, () =>{
    console.log('Server have started on ' + port +'!!')
});