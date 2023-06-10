require('dotenv').config();
require('express-async-errors');


const express = require('express');
const ConnectDB = require('./dbConfig/connectdb');
const log = require('./utils/logger');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const app = express();


// APP CONFIG
app.use(express.json());
app.use(cors());


// NOT FOUND MIDDDLEWARE
// ERROR HANDLER MIDDLEWARE




const port = process.env.PORT || 3000;
const start = async() =>{
    try {
        await ConnectDB();
        app.listen(port, () =>{
            log.info("Server is running on port " + port) 
        });
    } catch (error) {
        
    }
}

start();