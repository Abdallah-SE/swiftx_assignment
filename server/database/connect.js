const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
/*const connectDBj = async() => {
  try{
    const conn = await mongoose.connect('mongodb://localhost:27017/swiftxdb',{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    //console.log(`mongoge be connected successfully...${conn.connection.host}`);
  }catch(err){
    console.log(err);
    process.exit(1);
  }
};*/

/*mongoose.connection.on('error', err => {
  logError(err);
});*/
const options = {
  useMongoClient:true,
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

 connectDB = async() => {
try{
  connect = await mongoose.connect('mongodb://localhost:27017/swiftxdb',{
    useMongoClient:true
  });
  console.log('Sucessfull connectiong..');
}catch(err){
  console.log(err);
}}
module.exports = connectDB
