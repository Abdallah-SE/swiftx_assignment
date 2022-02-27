let mongoose = require('mongoose');////import js oop lib  creates a connection between MongoDB and the Express web application
////define user document schema inside mongoDB when created it
let UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    minLength: 5,
    maxLength: 50
  },
  password:{
    type:String,
    required:true,
    minLength: 5,
    maxLength: 1024
  },
  email:{
    type:String,
    required:true,
    minLength: 5,
    maxLength: 255,
    unique:true
  },
  role:{
    type:String,
    required:true,
    minLength: 3,
    maxLength: 50
  }
});

const userDB = mongoose.model('user', UserSchema);////Compiles a model for user
module.exports = userDB;                          ///////To export this file easly
