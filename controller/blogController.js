
const asyncWrapper = require('../middlewares/asyncWrapper');
const Blog = require('../models/blogModel');


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
    req.body.blog.body = req.sanitize(req.body.blog.body);
    // req.body.blog.createdBy = req.user;

    const blog = await Blog.create(req.body.blog);
    console.log(blog)
    if(blog){
        res.redirect("/" + req.params.id);
    }
});

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
    // await Blog.findByIdAndDelete(req.params.id, (err) =>{
    //     if(err){
    //         console.log(err)
    //         throw new Error('Error occurred')
    //     }else{
    //         console.log('deleted successfully')
    //         res.redirect('/')
    //     }
    // })

    const blog = await Blog.findByIdAndDelete(req.params.id);
    if(blog){
        console.log('deleted successfully')
        res.redirect('/')
    }

    // res.send('delete post')
});

const uploadImage = asyncWrapper(async(req,res) =>{
    // res.send('image upload')
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