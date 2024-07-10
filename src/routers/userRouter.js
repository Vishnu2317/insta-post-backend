const express = require('express')
const bcrypt  = require('bcrypt')
const jwt  = require('jsonwebtoken')
const userModel = require('../models/userModel')

const userRouter = express.Router()


userRouter.get('/users',(req,res)=>{
    res.send("Hello Users")
})

// getting all user : 
// userRouter.get('/users',async(req,res)=>{
//     try {
//         const allUsers = await userModel.find()
//         res.send(allUsers)
//     } catch (error) {
//         res.send(error)
//     }
// })

//register : 

userRouter.post('/register',async(req,res)=>{
   const {username,emailID,userImage,mobileNumber,password} = req.body
    const user = await userModel.findOne({emailID})
    if(user){
        return res.send({message:"User Already Exists"})
    }
    const hashPassword = await bcrypt.hash(password,10)
    const newUser = new userModel({username,emailID,userImage,mobileNumber,password:hashPassword})
    await newUser.save()
    // res.send(newUser)
    res.send({message:"User Registerd Successfully"})
})

// login + Token Generation: 

userRouter.post('/login',async(req,res)=>{
    const {emailID,password} = req.body
     const user = await userModel.findOne({emailID})
     if(!user){
         return res.send({message:"User not Found"})
     }
     const matchPassword = await bcrypt.compare(password,user.password)
     if(!matchPassword){
        return res.send({message:"Invalid Credentials"})
     }
     const token = jwt.sign(
        {id:user._id},
        process.env.PrivateKey,
        {expiresIn : "30m"}
     )
     res.send({tokenValue:token,userID:user._id,userName:user.username,userImg:user.userImage})
 })

// verify Token

const verifyToken = (req,res,next) =>{
    const auth = req.headers.authorization
    if(auth){
        jwt.verify(auth,process.env.PrivateKey,(err)=>{
            if(err){
                return res.send({message:"Invalid Token"}) 
            }
            next()
        })
    }
    else{
         res.send({message:"Verification Failed"})
    }
}

module.exports = {userRouter,verifyToken}