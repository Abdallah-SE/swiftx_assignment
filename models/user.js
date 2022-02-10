let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  user_name:{
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

const userDB = mongoose.model('user', UserSchema);
module.exports = userDB;
