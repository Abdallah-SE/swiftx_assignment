let mongoose = require('mongoose');

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

const joggingDB = mongoose.model('jogging', JoggingSchema);
module.exports = joggingDB;
