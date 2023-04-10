const blog=require('../models/Blog')

async function getAllPosts(){
    let posts=await blog.find()
    return posts
}


module.exports={getAllPosts}