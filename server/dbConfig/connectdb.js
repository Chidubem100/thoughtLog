const log = require('../utils/logger');
const mongoose = require('mongoose');



async function ConnectDB(uri){
    // const dburi = process.env.DBUri;
    try {
       await mongoose.connect(uri);
       log.info("Database connected")
    } catch (error) {
        console.log(error)
        process.exit(1);     
    }
}


module.exports = ConnectDB;