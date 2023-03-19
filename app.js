
require('dotenv').config();

const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();

// OTHER PACKAGES
const connectDB = require('./db/connectDB');
const notFound = require('./middlewares/notFound');

// APP CONFIG
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ROUTES


// Testing route
app.get('/t', (req,res) =>{
    res.render('testing')
});


// 
app.use(notFound);


const port = 2000 || process.env.PORT;

const start = async() =>{
    try {
        await connectDB();
        app.listen(port, () =>{
            console.log('Server have started on ' + port +'!!')
        });
    } catch (error) {
        console.error(error);
    }
};

start();