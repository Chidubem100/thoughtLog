require('dotenv').config();
require('express-async-errors');

const express = require('express');
const ConnectDB = require('./dbConfig/connectdb');
const log = require('./utils/logger');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan')
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/errorMiddleware');
const appRouter = require('../server/component/index');
const starter = require('./seedDB');
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');
const app = express();


// APP CONFIG
// starter();
app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));
// app.use(cors())
app.use(cookieParser(process.env.SECRETE))
app.use(morgan('tiny'));
app.use(express.urlencoded({extended:false}))
app.use("/api/v1",appRouter);
// app.use(cors({origin:'*',credentials:true,optionsSuccessStatus:200}))
app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization', 'Origin', 'Accept')
    // res.setHeader('Access-Control-Allow-Methods', '', 'Authorization')
    next()
})

app.get('/', (req,res) =>{
    console.log(req.signedCookies)
    res.send("thougthLog")
});

app.use(notFound);
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000;
const start = async() =>{
    try {
        await ConnectDB();
        app.listen(port, () =>{
            log.info("Server is running on port " + port) 
        });
    } catch (error) {
        console.log(error)
    }
}

start();