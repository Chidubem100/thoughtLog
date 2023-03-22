
const asyncWrapper = require('../middlewares/asyncWrapper');
const Blog = require('../models/blogModel');


const getAllPosts = asyncWrapper(async(req,res) =>{
    const blog = await Blog.find({});
    var context = {
        blog: blog,

    }
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

    // Blog.create(req.body.blog,(err, newBlog) =>{
    //     if(err){
    //         console.log(err)
    //         throw new Error('Error occcured')
    //     }else{
    //         console.log(newBlog);
    //         res.redirect("/" + req.params.id);
    //     }
    // })
    // res.send('create posts')
});

const editPost = asyncWrapper(async(req,res) =>{
    await Blog.findById(req.params.id, (err, foundBlog) =>{
        if(err){
            console.log(err)
            throw new Error('Error occurred')
        }else{
            res.render('post/updatePage', {blog:foundBlog})
        }
    });
});

const editPosts = asyncWrapper(async(req,res) =>{
    req.body.blog.body = req.sanitizer(req.body.blog.body)
    await Blog.findByIdAndUpdate(req.params.id, req.body.blog, {
        runValidators: true,
        new:true
    },(err,updatedBlog) =>{
        if(err){
            console.log(err)
            throw new Error('Error occurred')
        }else{
            console.log(updatedBlog)
            res.redirect("/" + req.params.id);
        }
    })
});

const getSinglePost  = asyncWrapper(async(req,res) =>{
    // Blog.findById(req.params.id, (err, foundBlog) =>{
    //     if(err){
    //         console.log(err)
    //         throw new Error('Error occurred')
    //     }else{
    //         res.render('post/updatePage', {blog:foundBlog})
    //     }
    // });

    const blog = await Blog.findById(req.params.id);
    if(blog){
        res.render('post/showPage', {blog: foundBlog})
    }
});

const deletePost = asyncWrapper(async(req,res) =>{
    await Blog.findByIdAndDelete(req.params.id, (err) =>{
        if(err){
            console.log(err)
            throw new Error('Error occurred')
        }else{
            console.log('deleted successfully')
            res.redirect('/')
        }
    })
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