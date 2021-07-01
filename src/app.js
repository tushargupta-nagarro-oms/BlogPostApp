const express = require("express");
const app = express();

const path = require('path');
require('ejs');
require("./database/connection");
const postRouter = require("./routers/router")
const Blogpost = require("./models/post");
const methodOverride = require("method-override");

const port = process.env.PORT || 9000;

app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(methodOverride("_method"));


app.set("view engine","ejs");
const viewsPath = path.join(__dirname , "../src/views");
app.set("views",viewsPath);
// console.log(__dirname);
// console.log(__dirname , "../views");



app.get("/", async (req,res)=>{
   const blogPost = await Blogpost.find().sort({date:"desc"});
    res.render("index" ,{blogPost:blogPost })
})


app.use(postRouter);

app.listen(port, ()=>{
    console.log(`connection successful..  at ${port}`);
})