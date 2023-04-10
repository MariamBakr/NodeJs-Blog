const express=require('express')
// const store=require('storejs')
const route=express.Router()
const userController=require('../controllers/userController')
const homeController=require('../controllers/homeController')


//**  home page displayed to users route **/

route.get('/',async (req,res)=>{
    let posts= await homeController.getAllPosts()
    res.render('index',{posts:posts})
})

//** new user registration routes **/

route.get('/register',async function(req,res){
    res.render('register')
})
route.post('/register', async function(req,res){
    let data = await userController.Register(req.body)
    res.send("User was registerd succcessfully")
})

//** user login routes**/

route.get('/login',async function(req,res){
    res.render('login')
})
route.post('/login',async function(req,res){
    let data= await userController.logIn(req.body)
    console.log(data)
    if(data.length==0){
        res.status(401).send('Error: Wrong or Invalid Credentials ')
    }else{
        let posts=await userController.getUserPosts(data)
    
    res.redirect(`/user/get/${data[0]._id}`)
    }
})

//** get data of logged in user routes **/

route.get(`/get/:id`,async(req,res)=>{
    console.log(req.params.id)
    let posts=await userController.getUserPosts(req.params.id)
    
    res.render('userposts', {posts:posts})
})

//** postman  **/

route.post(`/get/:id`,async(req,res)=>{
    let data= await userController.writePost(req.body.author,req.body.title,req.body.body,req.params.id)
    console.log("in")

    res.send("added successfully")
})


//**search routes**/

route.post('/authors', async (req, res) => {
    let posts=await userController.getSearchedAuthors(req.body.author)
    res.render('search', {posts:posts})
})

route.post('/search', async (req, res) => {
    let posts=await userController.getSearchedTitles(req.body.title)
    res.render('search', {posts:posts})
})
route.post('/tags', async (req, res) => {
    let posts=await userController.getSearchedTags(req.body.tags)
    res.render('search', {posts:posts})
})


//** new post creation routes **/

// route.get('/add/:id',async function(req,res){
//     res.render('new')
// })

// route.post('/add/:id',async (req,res)=>{
//     // let name=store.get('user').name
//     // let id= await userController.getUserID(name)
//     let data= await userController.writePost(req.body.author,req.body.title,req.body.body,id)
//     res.send("added successfully")
// })

//**  post deletion route **/

route.get('/delete/:id',async(req,res)=>{

    let posts=await userController.deletePost(req.params.id);
    res.send(`Your blog post with id :${req.params.id} was deleted successfully`);
})

//**  post edit route **/

route.get('/edit/:id',async function(req,res){
    let posts= await userController.getposts(req.params.id)
    console.log(posts)
    res.render('edit', {posts:posts})
})


route.post('/edit/:id',async(req,res)=>{

    let posts=await userController.editPost(req.params.id,req.body);
    res.send({posts:posts});
})

module.exports=route