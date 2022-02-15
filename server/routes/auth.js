const express = require("express");
const app = express();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const userDB = require("../model/user");
const auth_route = express.Router();const axios = require('axios');   ///Promise based HTTP client for the browser and node.js

const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("./auth-meth.js");

auth_route.get("/", checkAuthenticated, (req, res) => {
  res.render("index", { name: req.user.name });
});

auth_route.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register");
});

auth_route.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login");
});

auth_route.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

auth_route.post("/register", checkNotAuthenticated, async (req, res) => {
  const userFound = await userDB.findOne({ email: req.body.email });

  if (userFound) {
    req.flash("error", "User with that email already exists");
    res.redirect("/register");
  } else {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new userDB({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
        role: 'regular_user',
      });

      await user.save();
      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.redirect("/register");
    }
  }
});

auth_route.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

auth_route.get('/view_user',checkAuthenticated, (req,res)=> {
  ////get the api
  axios.get('http://localhost:7000/api/users').then(function(response){
    res.render('view_user',{users:response.data});
  }).catch(err=>{
    console.log(err+"Error in loading users");
    res.send(err+"Error in loading users");
  });
});
module.exports = auth_route;
