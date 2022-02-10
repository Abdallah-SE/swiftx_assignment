////userDB
///import user model
let userDB = require('../model/user.js');

///Create a new user
exports.create = (req,res)=>{
  ///Validate the input
  if(!req.body){
    res.status(400).send({message:"user content not found"});
    return;
  }
  //create new user
  const user = new userDB({
    user_name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    role: req.body.role
  });

  //Save the user data in the database
  user.save().then(data=>{
    res.send(data)
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
    });;
  }else{
    userDB.find().then(user=>{
      res.send(user)
    }).catch(err=>{
      res.status(500).send({message:err.message|| 'Error while view user info'})
    })
  }
};
///Update user by id
exports.update = (req,res)=>{
  if(!req.body){
    return res.status(400).send({message: "no data found to be updated"})
  }
  const id = req.params.id;
  userDB.findByIdAndUpdate(id, req.body,{useFindAndModify: false})
  .then((data)=>{
    if(!data){
      res.status(404).send({message:`Can not update the user with id: ${id}`});
    }else{
      res.send(data);
    }
  }).catch(err=>{
    res.status(500).send({message:"Error in updating the user"});
  });
};


////delete user
exports.delete = (req,res)=>{
  const id = req.params.id;
  userDB.findByIdAndRemove(id).then(data=>{
    if(!data){
      res.status(404).send({message:`Sorry can not delete this user with id: ${id}`})
    }else{
      res.send({message:`Successfully deleting user of id: ${id}`});
    }
  }).catch(err=>{
    res.status(500).send({message:"Error during the deleting operation!"})
  });
};
