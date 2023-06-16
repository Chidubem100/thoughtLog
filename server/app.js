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
const starter = require('./seedDB');
const app = express();


// APP CONFIG
// starter();
app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.SECRETE))
app.use(morgan('tiny'));
app.use(fileUpload());


app.use("/api/v1",appRouter);

app.get('/', (req,res) =>{
    console.log(req.signedCookies)
    res.send("thougthLog")
});

app.use(notFound);
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000;
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