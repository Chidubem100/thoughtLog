const ConnectDB = require('./dbConfig/connectdb');
const User = require('./component/auth/auth');


const starter = async () =>{
    try {
        await ConnectDB()
        await User.deleteMany();
        // await Job.create(mockData)
        console.log('success!')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

// start();
module.exports = starter;
