////userDB
///import user model
let userDB = require('../model/user.js');
const {
  checkAuthenticated,
  checkNotAuthenticated,
  authRole,
  isAdmin,
  allowedUsers,
} = require("../routes/auth-meth.js");

///Create a new user
exports.create = (req,res)=>{
  ///Validate the input
  if(!req.body){
    res.status(400).send({message:"user content not found"});
    return;
  }
  //create new user
  const user = new userDB({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    role: req.body.role
  });

  //Save the user data in the database
user.save().then(data=>{
     res.send(data)///That's for test rest apis with postman
    //res.redirect("http://localhost:7000/view_user");
    //res.writeHead(200, {"Location": "/view_user"});
    return res.end();
  }).catch(err=>{
    res.status(500).send({message:err.message||'failded saving the user info'})
  });
};
///View all users or single user
exports.find = (req,res)=>{
  if(req.query.id){
    const id = req.query.id;
    userDB.findById(id).then(data=>{
      if(!data){
        res.status(404).send({message:'Error no user info found!'})
      }else{
        res.send(data)
      }
    }).catch(err=>{
      res.status(500).send({message:"Error in find the user"});
    });
  }else{
    userDB.find().then(user=>{
      res.send(user)
    }).catch(err=>{
      res.status(500).send({message:err.message|| 'Error while view user info'})
    })
  }
};
// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }
    const id = req.params.id;
    console.log(id);
    userDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{

                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

////delete user
exports.delete = (req,res)=>{
  const id = req.params.id;
  if(req.user.role ==='role.admin'){
    userDB.findByIdAndRemove(id).then(data=>{

      if(!data){
        res.status(404).send({message:`Sorry can not delete this user with id: ${id}`})
      }else{
        req.flash('updatemsg', 'User hase been successfully deleted!');
        res.render('/display_users');
        res.send({message:`Successfully deleting user of id: ${id}`});
      }
      req.flash('deletemsg', 'User hase been successfully deleted!');
      res.render('/display_users');
    }).catch(err=>{
      res.status(500).send({message:"Error during the deleting operation!"})
    });
  }else if(req.user.role ==='role.manager'){
    userDB.findByIdAndRemove(id).then(data=>{
      if(!data){
        res.status(404).send({message:`Sorry can not delete this user with id: ${id}`})
      }else{
        res.send({message:`Successfully deleting user of id: ${id}`});
      }
    }).catch(err=>{
      res.status(500).send({message:"Error during the deleting operation!"})
    });
  }else if(req.user.id === id){
    userDB.findByIdAndRemove(id).then(data=>{
      if(!data){
        res.status(404).send({message:`Sorry can not delete this user with id: ${id}`})
      }else{
        res.send({message:`Successfully deleting user of id: ${id}`});
        res.render('/display_users');
      }
    }).catch(err=>{
      res.status(500).send({message:"Error during the deleting operation!"})
    });
  }
};
//////
exports.auth_find = (req,res)=>{
  userDB.find().then(usersmodel=>{
    const user= allowedUsers(req.user,usersmodel);
    res.render('display_users',{users:user})
  }).catch(err=>{
    res.status(500).send({message:err.message|| 'Error while view user info'})
  })

}
//////
exports.auth_create = (req,res)=>{
  if(!req.body){
    res.status(400).send({message:"user content not found"});
    return;
  }
  //create new user model
  const user = new userDB({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    role: req.body.role
  });
  ///Check if no role is admin
  if (req.user.role === 'role.admin'){
    //Save the user data in the mongoDB
  user.save().then(data=>{
      res.redirect("http://localhost:7000/display_users");
      return res.end();
    }).catch(err=>{
      res.status(500).send({message:err.message||'failded saving the user info'})
    });
    ///check if the role is manager
  }else if(req.user.role === 'role.manager'){
    //Save the user data in the mongoDB
  user.save().then(data=>{
      res.redirect("http://localhost:7000/display_users");
      return res.end();
    }).catch(err=>{
      res.status(500).send({message:err.message||'failded saving the user info'})
    });
  }else{
    console.log('Not authorized!');
    req.flash("auth_msg", "Sorry, you are not authorized!");
    res.redirect('/');
  }
}

// Authenticate then authorize users before Update a new idetified user by user id
exports.auth_update = (req, res)=>{
  if(!req.body){
      return res
          .status(400)
          .send({ message : "Data to update can not be empty"})
  }
  const id = req.params.id;
  if(req.user.role === 'role.admin'){
    userDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                req.flash('updatemsg', 'Data hase been successfully updated!');
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
  }else if(req.user.role === 'role.manager'){
    userDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                req.flash('updatemsg', 'Data hase been successfully updated!');
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
  }else if(req.user.id === id){
    userDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                req.flash('updatemsg', 'Data hase been successfully updated!');
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
  }else{
    req.flash("auth_msg", "Sorry, you are not authorized!");
    res.render('/display_users');
  }

}
// Delete a user with specified user id in the request
exports.deletepostman = (req, res)=>{
    const id = req.params.id;

    userDB.findByIdAndRemove(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}
