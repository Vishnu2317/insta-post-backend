const express = require('express')
const postModel = require('../models/postModel')
const { verifyToken } = require('./userRouter')
const  mongoose  = require('mongoose')

const postRouter = express.Router()

// Getting all posts : 

postRouter.get('/posts',async(req,res)=>{
    console.log("Get Users");
    try {
        const allPosts = await postModel.find()
        res.send(allPosts)
    } catch (error) {
        console.log(error);
    }
})

//Post deleted

postRouter.delete('/delete-post/:id', verifyToken, async (req, res) => {
    const postId = req.params.id
    try {
        const deletedPost = await postModel.findByIdAndDelete(postId);
        // if (!deletedPost) {
        //     return res.status(404).send({ message: "Post not found" });
        // }
        res.send({ message: "Post deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error deleting post" });
    }
});

//Your-Posts

postRouter.get('/yourposts/:id', verifyToken,  async (req, res) => {
    const userId = req.params.id // assuming req.user is the authenticated user
    try {
      
      const posts = await postModel.findOne({userId });
      console.log(posts);
      res.send(posts);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error fetching your posts');
    }
  });

//Post creating: 
postRouter.post('/create-post',verifyToken,async(req,res)=>{
 
    const newPost = new postModel({
        _id : new mongoose.Types.ObjectId(),
        title : req.body.title,
        postImage : req.body.postImage,
        desc : req.body.desc,
        createdBy : req.body.createdBy
    })
    try {
        const createdPost = await newPost.save()
        res.send(createdPost)
    } catch (error) {
        res.send("Error Creating Post")
    }
})

module.exports = postRouter