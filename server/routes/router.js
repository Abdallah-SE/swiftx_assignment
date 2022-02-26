const express = require('express');  // Import to the module of express js
const axios = require('axios');   ///Promise based HTTP client for the browser and node.js

const bodyParser = require('body-parser');
const app = express();
const route = express.Router();     //////Create instance of middleware and routes
//app.use(bodyParser.urlencoded({ extended: true }))

//app.use(bodyParser.json())
let userDB = require('../model/user.js');

const passport = require("passport");
const auth_route = express.Router();
const {
  checkAuthenticated,
  checkNotAuthenticated,
  authRole,
  isAdmin,
  allowedUsers,
} = require("../routes/auth-meth.js");


//app.use(bodyParser.json());
///app.use(bodyParser.urlencoded({ extended: true }));
// Make sure you place body-parser before your CRUD handlers!
//app.use(bodyParser.urlencoded({ extended: true }))
///Load servecs module
const services = require('../services/render.js');
const { scopedUsers } = require('../services/help-lib.js');
///load user controller
const user_controller = require('../controller/user_controller.js');



const roles = {
  admin: 'role.admin',
  manager: 'role.manager',
  regular: 'role.regular'
}
/*
*@description: Root Router get response to the main home page after request
*@method : get
*/
//route.get('/', services.homeRoutes);
/*
*@description: display the users' details page after request
*@method : get
*/
route.get("/", checkAuthenticated, (req, res,next) => {
  res.render("index", { user_info:req.user });
});

//route.get('/view_user',  authRole,services.view_user);

route.get('/display_users', checkAuthenticated, user_controller.auth_find);

route.get('/add_user', checkAuthenticated, services.add_user);
/*
*@description: Edit an existing account for the user - after request
*@method : get
*/
route.get('/edit_user', checkAuthenticated, async (req,res)=> {
  try{
    const dataapi = await userDB.findById(req.query.id);
    res.render('edit_user', {user:dataapi})
  }catch(err){
    console.log("The error is: "+err);
  }
  /*await axios.get('http://localhost:7000/api/users', {params:{id: req.query.id}})
  .then(function(user_data){
    console.log('user_data.data');
    console.log(user_data.data);
    res.render('edit_user', {user:user_data.data});
  }).catch(err=>{
    res.send(err);
  });*/
  ///res.render('edit_user');that's just test for rest postman
});
/*
*@description: create new account for user page after request
*@method : get
*/
//route.get('/add_user',checkAuthenticated,services.add_user);

/*
*@description: Add an account for the user - after request
*@method : post
*/
route.post('/api/users', user_controller.auth_create);

/*Create request on nodejs rest api with postman
route.post('/api/users', user_controller.create);*/


route.put('/api/users/:id',checkAuthenticated, user_controller.auth_update);

/*Update request on nodejs rest api with postman
route.put('/api/users/:id', user_controller.update);*/
route.delete('/api/users/:id', checkAuthenticated, user_controller.delete);
/*Delete request on nodejs rest api with postman */

///route.delete('/api/users/:id', user_controller.deletepostman);
////Using in Postman API Platform
/*Read request on nodejs rest api with postman */
//route.get('/api/users', user_controller.find);
module.exports = route;
