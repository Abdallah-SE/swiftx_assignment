const express = require('express');  // Import to the module of express js
const dotenv = require('dotenv');    /// Loads environment variables from .env file
const app = express();               /// Reference for the express
const passport = require('passport');

const morgan = require('morgan');    ////Create a new morgan logger middleware function
const bodyParser = require('body-parser')   ///Parse incoming request bodies in a middleware
const path = require('path');              ////Require path utility module
dotenv.config({ path: './config/config.env' }); ///load and reference .env file
const PORT = process.env.PORT || 5000;          ////Set the port value
app.use(bodyParser.urlencoded({ extended: true }));   ////adding body parsers
/////////////////////////////////////////////////////start auth
//const dotenv = require('dotenv');    /// Loads environment variables from .env file
dotenv.config({ path: './config/.env' }); ///load and reference .env file
//const express = require("express");
//const app = express();
//const path = require('path');              ////Require path utility module

//const mongoose = require("mongoose");
//const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const user = require("./server/model/user");

const initializePassport = require("./config/passport-config");
initializePassport(
  passport,
  async (email) => {
    const userFound = await user.findOne({ email });
    return userFound;
  },
  async (id) => {
    const userFound = await user.findOne({ _id: id });
    return userFound;
  }
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
//////////////////////////////////////////////////////end auth
app.use(morgan('tiny'));                        ///log all request

//app.use(express.json())
//// set the view engine to ejs
app.set("view engine","ejs");
//app.set('views', 'views');
//app.set("view",path.resolve(__dirname,"views/ejs"));

//Load Assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));//load css files
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));//load css files
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));//load css files

//app.use('/', require('./server/routes/jogging_route.js'));
///Open connection to the server on port 5000

app.use('/', require('./server/routes/auth.js'));
///Load routers
app.use('/', require('./server/routes/router.js'));
app.use('/', require('./server/routes/router_jogging.js'));

///load db connnection file of mongoose
const connectDB = require('./server/database/connect.js');
///connect to mongoose
connectDB();

app.listen(PORT, ()=>{
  console.log(`Now your server is running on port: ${PORT}`);
});

////////////to run the nodemon -> npm start
