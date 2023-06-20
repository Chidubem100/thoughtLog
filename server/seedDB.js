const ConnectDB = require('./dbConfig/connectdb');
const User = require('./component/auth/auth');
const Post = require('./component/post/post');
const Comment = require('./component/comment/comment');

const starter = async () =>{
    try {
        await ConnectDB()
        // await User.deleteMany();
        await Post.deleteMany();
        await Comment.deleteMany();
        console.log('success!')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

// start();
module.exports = starter;
