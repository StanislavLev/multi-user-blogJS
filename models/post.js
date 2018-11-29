const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const postSchema  = new Schema({
    author : {
      type: String,
      required: true
    },
    title : {
      type: String,
      required: [true, 'title field is required']
    },
    post : {
      type: String,
      required: [true, 'text field is required']
    },
    //{timestamps: true} This will automatically add createdAt and updatedAt fields to your schema.
}, {timestamps: true});
// create model if not exists.
module.exports = mongoose.model('Post', postSchema);