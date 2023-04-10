const blog=require('../models/Blog')
const user=require('../models/User')

async function getUserID(name){
    let data= await user.find({name:name},{projection:{userID:1}})
    console.log(data)
    return data
}
async function getposts(id){
    let data= await blog.find({_id:id})
    return data
}
async function getUserPosts(id){
    let data= await blog.find({userID:id})

    return data
}
async function getSearchedTitles(data){
    let posts=await blog.find({title:data})
    return posts
}
async function getSearchedTags(data){
    let posts=await blog.find({tags:data})
    return posts
}
async function getSearchedAuthors(data){
    let posts=await blog.find({author:data})
    return posts
}

async function Register(data){
    let res= await user.create(data)
    return res
}
async function logIn(data){
    // ({name:data},{projection:{userID:1}})
    let res= await user.find(data,{projection:{id:1}})
    return res
}

async function writePost(a,t,b,id){
    let res= await blog.create({
        author:a,
        title:t,
        body:b,
        userID:id
    })
    return res
}

async function editPost(id,data){
    let updated= await blog.updateOne({_id:id},data)
    return updated
}

async function deletePost(id){
    let deleted= await blog.deleteOne({_id:id})
    console.log(deleted)
    return deleted
}



module.exports={getposts,getSearchedTitles,getSearchedAuthors,getSearchedTags,getUserPosts,getUserID,logIn,Register,writePost,editPost,deletePost}
