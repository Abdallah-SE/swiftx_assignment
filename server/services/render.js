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
  //res.writeHead(200, {Location:"/view_user"});
  //res.end();
  res.render('add_user');
};
exports.edit_user = (req,res)=> {
  axios.get('http://localhost:7000/api/users', {params:{id: req.query.id}})
  .then(function(user_data){
    res.render('edit_user', {user:user_data.data});
  }).catch(err=>{
    res.send(err);
  });
  ///res.render('edit_user');that's just test for rest postman
};
