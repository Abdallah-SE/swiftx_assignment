const express = require('express');  // Import to the module of express js
const dotenv = require('dotenv');    /// Loads environment variables from .env file
const app = express();               /// Reference for the express
const passport = require('passport');////Reference to simple authenticating passport module
const router = express.Router();     //////Create instance of middleware and routes

const morgan = require('morgan');    ////Create a new morgan logger middleware function
const bodyParser = require('body-parser')   ///Parse incoming request bodies in a middleware
const path = require('path');              ////Require path utility module
dotenv.config({ path: './config/config.env' }); ///load and reference .env file
const PORT = process.env.PORT || 5000;          ////Set the port value

dotenv.config({ path: './config/.env' }); ///load and reference .env file

app.locals.errors=null;                     ////////Global error argument

const flash = require("express-flash"); //Flash module to display messages
const session = require("express-session");/////Express session handler
const cookieParser = require("cookie-parser");//////Parse HTTP request cookies

const methodOverride = require("method-override");////Override HTTP verbs
const user = require("./server/model/user");////Require user model
////initialize passport lib to set users data in the request
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

app.set("view engine", "ejs");///Set ejs simple templating language to generate HTML markup with plain JavaScript
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    resave: false,
    secure: false,
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
app.set('views', 'views');
//app.set("view",path.resolve(__dirname,"views/ejs"));
app.use('/assets', express.static(__dirname + '/assets'))

//Load Assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));//load css files
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));//load css files
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));//load css files

//app.use('/', require('./server/routes/jogging_route.js'));
///Open connection to the server on port 5000
app.get('*',async function(req,res,next){
  res.locals.user=req.user||null;
  next();
})

///load db connnection file of mongoose
const connectDB = require('./server/database/connect.js');
///connect to mongoose
connectDB();
///Load routers

app.use(require('./server/routes/auth.js'));
app.use('/', require('./server/routes/router_jogging.js'));
app.use('/', require('./server/routes/router.js'));

app.listen(PORT, ()=>{
  console.log(`Now your server is running on port: ${PORT}`);
});
////////////to run the nodemon -> npm start
