const express= require('express')
const route=express.Router()
const homeController=require('../controllers/homeController')
const userController=require('../controllers/userController')
const Blog = require('../models/Blog')

//** home page displayed to all vistors route **/

route.get('/',async (req,res)=>{
    let posts= await homeController.getAllPosts()
    res.render('home',{posts:posts})
})


module.exports=route