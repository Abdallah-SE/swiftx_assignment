const axios = require('axios');   ///Promise based HTTP client for the browser and node.js

exports.homeRoutes = (req,res)=> {
  res.render('index');
};
exports.view_user = (req,res)=> {
  ////get the api
  axios.get('http://localhost:7000/api/users').then(function(response){
    res.render('view_user',{users:response.data});
  }).catch(err=>{
    res.send(err);
  });
};
exports.add_user = (req,res)=> {
  res.render('add_user');
};
