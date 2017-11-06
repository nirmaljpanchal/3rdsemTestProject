const express = require('express');
const router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUserName(username, function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false, {message: 'Invalid username or password'});
            }

        User.comparePassword(password, user.password, function(err, isMatch){
            if(err) throw err;
            if(isMatch){
                return done(null, user);
            }else{
                return done(null, false, {message: 'Invalid username or password'});
            }
        })
     })
    }
  ));


  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });




  router.get('/logout',function(req,res){
      req.logOut();
      req.flash('success_msg', 'You are logged out');
      res.redirect('/account/login');
  });

router.get('/login', function (req, res, next) {
    //console.log("");
    res.render('login',{message: req.flash('error')});
});
router.post('/login',
passport.authenticate('local',
 {successRedirect: '/home/userlist', failureRedirect: '/account/login', failureFlash: true}),
function(req, res) {
     res.redirect('/home/userlist');
    //res.send("success login");
});

module.exports = router;