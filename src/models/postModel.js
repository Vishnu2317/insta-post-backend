const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{type:String,required:true},
    postImage:{type:String,required:true},
    desc:{type:String,required:true},
    createdBy:{type:String,required:true},
    createduserID:{type:String,required:true}
})

const postModel = mongoose.model("posts",postSchema)

module.exports = postModel

//  {_id : }