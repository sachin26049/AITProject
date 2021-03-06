const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});

router.post('/addResult', (req, res, next) => {
  let  newResult= {
    testName: req.body.testname,
    des:req.body.des,
    totalCorrect:req.body.total,
    totalQuestions:req.body.totalQuestions
    
  };
  var email=req.body.email;

  User.addResults(email,newResult, (err, test) => {
    if(err){
      res.json({success: false, msg:'Failed to Test'});
    } else {
      res.json({success: true, msg:'Test added'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.email;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            results:user.Results
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

router.get('/getResult', (req, res, next) => {
  
  var email= req.query.email;
   console.log(email);
  User.getResults(email, (err, results) => {
    if(err){
      res.json({success: false, msg:'no test found'});
    } else {
      console.log(results);
      res.json({success: true, results:results[0].Results});
    }
  });
});

module.exports = router;
