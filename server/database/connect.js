const mongoose = require('mongoose');////import js oop lib  creates a connection between MongoDB and the Express web application
mongoose.Promise = global.Promise;////To use mongoose in different position inside the project
////Connection function
 connectDB = async() => {
try{
  connect = await mongoose.connect('mongodb://localhost:27017/swiftxdb',{
    useMongoClient:true
  });
  console.log('Sucessfull connectiong..');
}catch(err){
  console.log(err);
}}
///Share connection function with another file
module.exports = connectDB;
