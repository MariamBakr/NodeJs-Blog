const express= require('express');
const app= express();
const port=8000;
const homeRoute=require('./routes/homeRoute');
const userRoute= require('./routes/usersRoute')

app.set('view engine','ejs')

const mongoose= require('mongoose');
mongoose.set('strictQuery',false);
mongoose.connect('mongodb://localhost:27017/blog').then(()=>{
    console.log("connected to DB")
});

app.use(express.urlencoded({extended:true}));

app.use('/home',homeRoute);
app.use('/user',userRoute)


app.listen(port, () => console.log(`listening on port ${port}....`))