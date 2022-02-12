const express = require('express');  // Import to the module of express js
const dotenv = require('dotenv');    /// Loads environment variables from .env file
const app = express();               /// Reference for the express
const morgan = require('morgan');    ////Create a new morgan logger middleware function
const bodyParser = require('body-parser')   ///Parse incoming request bodies in a middleware
const path = require('path');              ////Require path utility module
dotenv.config({ path: './config/config.env' }); ///load and reference .env file

///load db connnection file of mongoose
const connectDB = require('./server/database/connect.js');

const PORT = process.env.PORT || 5000;          ////Set the port value

app.use(morgan('tiny'));                        ///log all request

///connect to mongoose
connectDB();
app.use(bodyParser.urlencoded({ extended: true }));   ////adding body parsers
//app.use(express.json())
//// set the view engine to ejs
app.set("view engine","ejs");

//app.set("view",path.resolve(__dirname,"views/ejs"));
//Load Assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));//load css files
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));//load css files
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));//load css files


///Load routers
app.use('/', require('./server/routes/router.js'));

///Open connection to the server on port 5000

app.listen(PORT, ()=>{
  console.log(`Now your server is running on port: ${PORT}`);
});

////////////to run the nodemon -> npm start
