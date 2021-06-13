import mongoose from 'mongoose';
//const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
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
export const Post = mongoose.model("Post", postSchema);