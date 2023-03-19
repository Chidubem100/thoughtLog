
const DB = {
    Host: "Localhost",
    Port: 27017,
    DBName: "thoughtLogDB"
}

const mongoose = require('mongoose');

const connectDB = () =>{
    mongoose.connect(`mongodb://${DB.Host}:${DB.Port}/${DB.DBName}`, {

    }).then(() =>{
        console.log(`db connected have started`)
    }).catch(err =>{
        console.error('connection Error', err);
        process.exit();
    }) 
}



module.exports = connectDB;