const log = require('../utils/logger');
const mongoose = require('mongoose');



async function ConnectDB(){
    const dburi = process.env.DBUri;
    try {
       await mongoose.connect(dburi);
       log.info("Database connected")
    } catch (error) {
        process.exit(1);     
    }
}


module.exports = ConnectDB;