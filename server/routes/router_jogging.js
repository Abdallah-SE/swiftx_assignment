const express = require('express');  // Import to the module of express js
const route = express.Router();     //////Create instance of middleware and routes
const axios = require('axios');   ///Promise based HTTP client for the browser and node.js
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
const render_jogs = require('../services/render_jogs.js');
app.use(bodyParser.json())
let joggingDB = require('../model/jogging.js');



const jogging_controller = require('../controller/jogging_controller.js');


route.get('/view_jogging', render_jogs.view_jogging);
/*
*@description: create new jogging for jogging page after request
*@method : get
*/
route.get('/add_jogging', render_jogs.add_jogging);
/*
*@description: Edit an existing account for the user - after request
*@method : get
*/
route.get('/edit_jogging', render_jogs.edit_jogging);

////apis
route.post('/api/jogs', jogging_controller.create);
route.get('/api/jogs', jogging_controller.find);
route.put('/api/jogs/:id', jogging_controller.update);
route.delete('/api/jogs/:id', jogging_controller.delete);

///Make the router.js file available to exports
module.exports = route;
