const axios = require('axios');   ///Promise based HTTP client for the browser and node.js

exports.homeRoutes = (req,res)=> {
  res.render('index');
};
exports.view_jogging = (req,res)=> {
  ////get the api
  axios.get('http://localhost:7000/api/jogs').then(function(response){
    res.render('view_jogging',{jogs:response.data});
  }).catch(err=>{
    res.send(err);
  });
};
exports.add_jogging = (req,res)=> {
  //res.writeHead(200, {Location:"/view_user"});
  //res.end();
  res.render('add_jogging');
};
exports.edit_jogging = (req,res)=> {
  axios.get('http://localhost:7000/api/jogs', {params:{id: req.query.id}})
  .then(function(jogs_data){
    res.render('edit_jogging', {jogs:jogs_data.data});
  }).catch(err=>{
    res.send(err);
  });
  ///res.render('edit_user');that's just test for rest postman
};
