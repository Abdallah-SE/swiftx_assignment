let userDB = require('../model/user.js');

const roles = {
  admin: 'role.admin',
  manager: 'role.manager',
  regular: 'role.regular'
}

function scopedUsers (req,res){
  userDB.find().then(usersmodel=>{
    console.log('users in router:');
    console.log(usersmodel);
    const user= allowedUsers(req.user,usersmodel);
    res.render('display_users',{users:user})
  }).catch(err=>{
    res.status(500).send({message:err.message|| 'Error while view user info'})
  })

}

module.exports = {
  scopedUsers
}
