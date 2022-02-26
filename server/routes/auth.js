const express = require("express");
const app = express();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const userDB = require("../model/user");
const route = express.Router();const axios = require('axios');   ///Promise based HTTP client for the browser and node.js

const {
  checkAuthenticated,
  checkNotAuthenticated,
  authRole,
} = require("./auth-meth.js");

/*auth_route.get("/", checkAuthenticated, (req, res) => {
  res.render("index", { user_info:req.user });
});*/

route.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register");
});

route.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login");
});

route.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
route.post("/register", checkNotAuthenticated, async (req, res) => {
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
        role: 'role.regular',
      });

      await user.save();
      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.redirect("/register");
    }
  }
});

route.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});


module.exports = route;
