require('dotenv').config();
require('express-async-errors');


const express = require('express');
const ConnectDB = require('./dbConfig/connectdb');
const log = require('./utils/logger');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan')
const fileUpload = require('express-fileupload');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/errorMiddleware');
const appRouter = require('../server/component/index');
const app = express();


// APP CONFIG
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use((_req,res,next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*')
    next();
});



app.use("/api/v1",appRouter);

app.get('/', (req,res) =>{
    res.send("")
});


// NOT FOUND MIDDDLEWARE
app.use(notFound);
// ERROR HANDLER MIDDLEWARE
// app.use(errorHandlerMiddleware)



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