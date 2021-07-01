const express = require("express");
const router = express.Router();
const Blogpost = require("../models/post");

router.get("/upload", (req,res)=>{
    res.render("uploadpage")
})

router.get("/edit/:id" , async (req,res)=>{
    const blogPost = await Blogpost.findById(req.params.id)
    res.render("editpage", {blogPost:blogPost})
})

router.get("/show/:id", async (req,res)=>{
    const blogPost = await Blogpost.findById(req.params.id);
    res.render("show" , {blogPost:blogPost})
})

// router.get("/:id", (req,res)=>{
//     console.log("hello");
    
// res.send(req.params.id)
// })

router.post("/save", async (req, res) => {
   
    try {
        let blogPost = new Blogpost({
            title: req.body.title,
            categories: req.body.categories,
            description: req.body.description,
            content: req.body.content
        })
        blogPost = await blogPost.save();
        console.log("upload working");
        res.redirect(`show/${blogPost.id}`);
    } catch (err) {
        res.render("uploadpage")
    }
})


router.delete("/delete/:id", async (req,res)=>{
    try{
        console.log("id is: "+req.params.id);
        await Blogpost.findByIdAndDelete(req.params.id);
  res.redirect("/");
    }catch(err){
        console.log(err);
    }
  
})

router.put("/:id" , async (req,res) => {

    try {
        let blogPost = await Blogpost.findByIdAndUpdate(req.params.id,{
            title: req.body.title,
            categories: req.body.categories,
            description: req.body.description,
            content: req.body.content
        })
        console.log("edit working");
        res.redirect(`show/${blogPost.id}`);
    } catch (err) {
        res.render("editpage")
    }

})



module.exports = router;