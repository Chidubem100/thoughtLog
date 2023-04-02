
require('dotenv').config();

const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const expressSanitizer = require('express-sanitizer');
const expressFileUpload = require('express-fileupload');
const app = express();

// OTHER PACKAGES
const connectDB = require('./db/connectDB');
const notFound = require('./middlewares/notFound');
const errMid = require('./middlewares/errorMid');
const userRoute = require('./routes/userRoutes');
const blogRouter = require('./routes/blogRoutes');
const commentRouter = require('./routes/commentRoutes');

// APP CONFIG
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(cookieParser(process.env.CookieSecrete));
app.use(expressSanitizer());
app.use(expressFileUpload({useTempFiles: true}));

// ROUTES
app.use(userRoute);
app.use(blogRouter);
app.use(commentRouter);

const {authenticateUser} = require('./middlewares/authMiddleware')
// Testing route
app.get('/t',(req,res) =>{
    res.render('testing')
});


// 
app.use(notFound);
app.use(errMid);

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