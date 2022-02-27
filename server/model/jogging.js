let mongoose = require('mongoose'); ////import js oop lib  creates a connection between MongoDB and the Express web application
////define jogging document schema inside mongoDB when created it
let JoggingSchema = new mongoose.Schema({
  date:{
    type:String,
    required:true,
    maxLength: 100
  },
  distance:{
    type:Number,
    required:true,
    maxLength: 70
  },
  time:{
    type:String,
    required:true,
    maxLength: 100
    }
});

const joggingDB = mongoose.model('jogging', JoggingSchema);////Compiles a model for jogging
module.exports = joggingDB;                                ///To export this file easly
