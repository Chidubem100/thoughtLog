
const asyncWrapper = require('../middlewares/asyncWrapper');
const Blog = require('../models/blogModel');
const multer = require('multer')
const path = require('path');
// const { post } = require('../routes/userRoutes');

let storage = multer.diskStorage({
    destination: function(req,file,callback){
        callback(null, './uploads')
    },
    filename:function(req,file,callback){
        console.log(file)
        callback(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const getAllPosts = asyncWrapper(async(req,res) =>{
    const blog = await Blog.find({});
    var context = {
        blog: blog,

    }
    // console.log(blog)
    if(blog){
        res.render('post/homePage', context)
    }
    
});

const createPost = asyncWrapper(async(req,res) =>{
    res.render('post/createPage')
});

const createPosts = asyncWrapper(async(req,res) =>{
    const {bod,title} = req.body;
    if(bod === ''){
        throw new Error('Cant make an empty post')
    }

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
        console.log('No file was uploaded')
    }else{
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
        uploadPath = path.join(__dirname, '../public/uploads/' + `${newImageName}`);
        imageUploadFile.mv(uploadPath, function(err){
            if(err) return res.status(500).send(err)
        });
    }

    const newPost = new Blog({
        title: req.body.title,
        bod: req.body.bod,
        image: newImageName
    });

    console.log(newPost);
    await newPost.save();

    res.redirect('/')

})

const editPost = asyncWrapper(async(req,res) =>{
    
    const blog = await Blog.findOne({_id: req.params.id})
    if(blog){
        res.render('post/updatePage', {blog})
    }
});

const editPosts = asyncWrapper(async(req,res) =>{
    req.body.blog.body = req.sanitize(req.body.blog.body)
   
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body.blog,{
        new:true,
        runValidators: true
    });
    // console.log(blog)
    if(blog){
        res.redirect('/blog/' + req.params.id)
    }
});

const getSinglePost  = asyncWrapper(async(req,res) =>{
   const blog = await Blog.findOne({_id: req.params.id})
    
    if(blog){
        res.render('post/showPage', {blog})
    }
    console.log(blog)
});

const deletePost = asyncWrapper(async(req,res) =>{
    
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if(blog){
        console.log('deleted successfully')
        res.redirect('/')
    }
});

const uploadImage = asyncWrapper(async(req,res) =>{
    let upload = multer({
        storage: storage,
        fileFilter: function(req,file,callback){
            let ext = path.extname(file.originalname)
            if(ext !== '.png' && ext !== '.jpg' && ext !== 'gif' && ext !== '.jpeg'){
                return callback(res.end('Only images are allowed'), null)
            }
            callback(null, true)
        }
    }).single('userFile');
    upload(req,res, function(err){
        console.log('done')
    })
});




module.exports = {
    createPost,
    createPosts,
    getAllPosts,
    getSinglePost,
    editPost,
    editPosts,
    uploadImage,
    deletePost
}