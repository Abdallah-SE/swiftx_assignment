const axios = require('axios');   ///Promise based HTTP client for the browser and node.js
const dotenv = require('dotenv');    /// Loads environment variables from .env file
const express = require('express');  // Import to the module of express js
const app = express();
const qs = require('qs');
dotenv.config({ path: './config/config.env' }); ///load and reference .env file
let userDB = require('../model/user.js');
const bcrypt = require('bcrypt');  // Import to the module of express js

const passport = require("passport");
const auth_route = express.Router();
const {
  checkAuthenticated,
  checkNotAuthenticated,
  authRole,
  isAdmin,
} = require("../routes/auth-meth.js");

/*route.get("/", checkAuthenticated, (req, res) => {
  res.render("index", { name: req.user.name });
});*/

/*exports.homeRoutes = checkAuthenticated, (req,res)=> {
  res.render('index', { user:req.user.name });
};*/

exports.view_user = (req,res)=> {
  ////get the api
  axios.get('http://localhost:7000/api/users').then(function(response){
    res.render('view_user',{users:response.data});
  }).catch(err=>{
    console.log(err+"Error in loading users");
    res.send(err+"Error in loading users");
  });
};
exports.add_user =  (req,res)=> {
  res.render('add_user');
};
exports.edit_user =  async (req,res)=> {
  console.log('req.query.id');
  console.log(req.query.id);
  await axios.get('http://localhost:7000/api/users', {params:{id: req.query.id}})
  .then(function(user_data){
    console.log('user_data.data');
    console.log(user_data.data);
    res.render('edit_user', {user:user_data.data});
  }).catch(err=>{
    res.send(err);
  });
  ///res.render('edit_user');that's just test for rest postman
};
