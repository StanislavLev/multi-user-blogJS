const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const userSchema  = new Schema({
    username : {
      type: String,
      required: [true, 'username field is required']
    },
    password : {
      type: String,
      required: [true, 'password field is required']
    },
    email : {
      type: String,
      required: [true, 'email field is required']
    },
    avatar : {
      type: String,
      required: [true, 'avatar is required']
    }
});
// create model if not exists.
module.exports = mongoose.model('User', userSchema);