const mongoose=require('mongoose')
const User= require('../models/User')

const BlogSchema= mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:String,
    author:{
        type:String,
        required:true
    },
    tags:[String],
    userID:{
        type:mongoose.Schema.Types.ObjectId,ref:"User"
    },
    
})

const Blog=mongoose.model('blogs',BlogSchema)
module.exports= Blog