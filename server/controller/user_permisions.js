function scopedUsers(user){
    if(req.isAuthenticated() && user.role  === roles.admin){
      userDB
      .find()
      .then(allUsers=>{
        if(!allUsers){
          res.status(404).send({message:'Error no user info found!'})
        }else{
          res.send(allUsers)
        }
      }).catch(err=>{
        res.status(500).send({message: err.message || 'Error while view user info'})
      })
    }else if (req.isAuthenticated() && res.locals.user.role === roles.manager) {
      userDB
      .find({role:{$in:[roles.manager, roles.regular]}})
      .then(specificUsers=>{
        if(!specificUsers){
          res.status(404).send({message:'Error no user info found!'})
        }else{
          res.send(specificUsers)
        }
      }).catch(err=>{
        res.status(500).send({message: err.message || 'Error while view user info'})
      })
    }else{
      userDB
      .findById(res.locals.user.id)
      .then(regularUser=>{
        res.send(regularUser);
      }).catch(err=>{
        res.status(500).send({message: err.message || 'Error while view user info'})
      })
    }
}
module.exports = {scopedUsers}
