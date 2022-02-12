const express = require('express');  // Import to the module of express js
const route = express.Router();     //////Create instance of middleware and routes

const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
let userDB = require('../model/user.js');


//app.use(bodyParser.json());
///app.use(bodyParser.urlencoded({ extended: true }));
// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))
///Load servecs module
const services = require('../services/render.js');
///load user controller
const user_controller = require('../controller/user_controller.js');
/*
*@description: Root Router get response to the main home page after request
*@method : get
*/
route.get('/', services.homeRoutes);
/*
*@description: display the users' details page after request
*@method : get
*/
route.get('/view_user', services.view_user);
/*
*@description: create new account for user page after request
*@method : get
*/
route.get('/add_user', services.add_user);
/*
*@description: Edit an existing account for the user - after request
*@method : get
*/
route.get('/edit_user', services.edit_user);

////apis
route.post('/api/users', user_controller.create);
route.get('/api/users', user_controller.find);
route.put('/api/users/:id', user_controller.update);
route.delete('/api/users/:id', user_controller.delete);

///Make the router.js file available to exports
module.exports = route;
