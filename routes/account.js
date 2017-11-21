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
router.get('/', function (req, res, next) {
    //console.log("");
    res.render('login',{message: req.flash('error'),success_msg: req.flash('success_msg')});
});
router.get('/login', function (req, res, next) {
    //console.log("");
    res.render('login',{message: req.flash('error'),success_msg: req.flash('success_msg')});
});
router.post('/login',
passport.authenticate('local',
 {successRedirect: '/home/userlist', failureRedirect: '/account/login', failureFlash: true}),
function(req, res) {
     res.redirect('/home/userlist');
    //res.send("success login");
});

router.get('/register', function (req, res, next) {
    //console.log("");
    var newUser = new User({
        name : "",
        email : "",
        username : "",
        password : "",
        gcm : "",
        vin : "",
        phone : "" 
    });
    res.render('register',{user:newUser,errors: []});
});
router.post('/register', function(req, res){
    var name1 = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var phone = req.body.phone;
    var vin = "";//req.body.vin;
    var gcm = "";//req.body.gcm;

    //Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'UserName is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Password2 is required').equals(req.body.password);
    req.checkBody('phone', 'Phone is required').notEmpty();
    //req.checkBody('vin', 'vin is required').notEmpty();
    //req.checkBody('gcm', 'gcm is required').notEmpty();

    var errors = req.validationErrors();
    var newUser = new User({
        name : name1,
        email : email,
        username : username,
        password : password,
        gcm : gcm,
        vin : vin,
        phone : phone ,
        isactive: true,
        role:"user" 
    });
    if(errors){
        //res.send(errors)
        res.render('register',{user:newUser,errors: errors});
    }else{
        

        User.createUser(newUser, function(err,user){
            if(err) throw err;
            //console.log(user);
        });

        req.flash('success_msg', 'You are registered and can now login');

         res.redirect('/account/login');
        //res.send("success register1");
    }
});

module.exports = router;