const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Test=require('../models/test');
router.post('/add', (req, res, next) => {
    let  newTest= new Test({
      name: req.body.name,
      name_lower:req.body.name.toLowerCase(),
      passkey:req.body.passkey,
      questions:req.body.questions,
      setter:req.body.setter,
      des:req.body.des,
    });
  
    Test.addTest(newTest, (err, test) => {
      if(err){
        res.json({success: false, msg:'Failed to Test'});
      } else {
        res.json({success: true, msg:'Test added'});
      }
    });
  });

  router.get('/search', (req, res, next) => {
  
    var name= req.query.name.toLowerCase();
     
    Test.getTestByName(name, (err, test) => {
      if(err){
        res.json({success: false, msg:'no test found'});
      } else {
        res.json({success: true, test:test});
      }
    });
  });
  module.exports = router;