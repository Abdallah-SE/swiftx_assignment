function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user
    return next();
  }
  res.redirect("/login");
}

function authRole (req,res,next){
    if(req.isAuthenticated() && res.locals.user.role == 'role.admin' ){
        next();
    }else{
        req.flash("auth_msg", "Sorry, You don't have the permissions, log in as admin!");
        res.redirect('/');
    }
}
function isAdmin (req,res,next){
    if(res.locals.user.role == 'role.admin' ){
        next();
    }else{
        req.flash("auth_msg", "Sorry, You don't have the permissions, log in as admin!");
        res.redirect('/');
    }
}
module.exports = {
  checkNotAuthenticated,
  checkAuthenticated,
  authRole,
  isAdmin,
};
