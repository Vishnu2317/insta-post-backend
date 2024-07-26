const express = require('express')
const postModel = require('../models/postModel')
const { verifyToken } = require('./userRouter')
const  mongoose  = require('mongoose')
const userModel = require('../models/userModel')

const postRouter = express.Router()

// Getting all posts : 

postRouter.get('/posts',async(req,res)=>{
    // console.log("Get Users");
    try {
        const allPosts = await postModel.find()
        res.send(allPosts)
    } catch (error) {
        console.log(error);
    }
})

//Post deleted

// postRouter.delete('/delete-post/:id', verifyToken, async (req, res) => {
//     const postId = req.params.id
//     try {
//         const deletedPost = await postModel.findByIdAndDelete(postId);
//         // if (!deletedPost) {
//         //     return res.status(404).send({ message: "Post not found" });
//         // }
//         res.send({ message: "Post deleted successfully" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ message: "Error deleting post" });
//     }
// });

//Your-Posts

// postRouter.get('/yourposts/:id', verifyToken,  async (req, res) => {
//     const {createdBy} = req.body // assuming req.user is the authenticated user
//     const id = req.params.id
//     try {
//         const user = await userModel.findById(id)
//       const posts = await postModel.find({createdBy});
//       const allPosts = await postModel.find()
//       const filtered =  allPosts.filter((item)=>{
//         return user.username == posts
//       })
//     //   console.log(posts);
//       res.send(filtered);
//     } catch (error) {
//       console.log(error);
//       res.status(500).send('Error fetching your posts');
//     }
//   });

//Post creating: 
postRouter.post('/create-post',verifyToken,async(req,res)=>{
 
    const newPost = new postModel({
        _id : new mongoose.Types.ObjectId(),
        title : req.body.title,
        postImage : req.body.postImage,
        desc : req.body.desc,
        createdBy : req.body.createdBy,
        createduserID : req.body.createduserID
    })
    try {
        const createdPost = await newPost.save()
        res.send(createdPost)
    } catch (error) {
        res.send("Error Creating Post")
    }
})

module.exports = postRouter