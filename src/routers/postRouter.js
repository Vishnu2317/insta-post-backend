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