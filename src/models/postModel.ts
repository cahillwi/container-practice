import mongoose, { Schema } from 'mongoose';
//const mongoose = require("mongoose");

const postSchema: mongoose.Schema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "Post must have title!"]
    },
    body: {
        type: String,
        require: [true, "Post must have body!"]
    },
});

// not sure if this is right.
const Post: mongoose.Model<Schema> = mongoose.model("Post", postSchema);
module.exports = Post;