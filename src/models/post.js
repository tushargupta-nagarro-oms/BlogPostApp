const mongoose = require("mongoose");
// const validator = require("validator");

const postSchema = new mongoose.Schema({
    title :{
        type : String,
        unique : true,
        required : true,
        // maxlength : 50
    },
    categories :{
        type : String,
        required : true,
        // maxlength : 20
    },
    description : {
        type : String,
        required : true,
        // minlength : 10,
        // maxlength : 50
    },
    content : {
        type : String,
        required : true,
        // minlength : 50,
        // maxlength : 200
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Blogpost = new mongoose.model("Blogpost",postSchema);

module.exports = Blogpost;