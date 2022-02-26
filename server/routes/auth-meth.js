function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    return res.redirect("/");
  }
  res.locals.user = req.user;
  next();
  return;
}

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    next();
    return;
  }
  res.locals.user = req.user;
  res.redirect("/login");
}

function authRole (req,res,next){
    if(req.isAuthenticated() && res.locals.user.role == 'role.admin' ){
        next();
        return;
    }else{
        req.flash("auth_msg", "Sorry, You don't have the permissions, log in as admin!");
        res.redirect('/');
    }
}
function isAdmin (req,res,next){
    if(res.locals.user.role == 'role.admin' ){
        next();
        return;

    }else{
        req.flash("auth_msg", "Sorry, You don't have the permissions, log in as admin!");
        res.redirect('/');
    }
}
function allowedUsers(user, users) {
  if (user.role === 'role.admin') {
    return users
  }else if(user.role === 'role.manager'){
    return users.filter(usersview => usersview.role === 'role.regular');
  }else{
    return users.filter(usersview => usersview.id === user.id)
  }
}
module.exports = {
  checkNotAuthenticated,
  checkAuthenticated,
  authRole,
  isAdmin,
  allowedUsers,
};
