const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  Results:[{
    testName:{
      type:String,
      required:true
    },
    des:{
      type:String,
      required:true
    },
    totalCorrect:{
      type:String,
      required:true
    },
    totalQuestions:{
      type:String,
      required:true
    }
  }]
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {email: username}
  User.findOne(query, callback);
}


module.exports.addResults = function(email,newResult, callback){
  const query = {email:email};
  //console.log(query);
  User.find(query, function(err,user){
    console.log(user);
    console.log("result:")
    console.log(newResult);
    user[0].Results.push(newResult);
    console.log(user[0]);
    user[0].save(callback);
    //callback=test[0];
  });
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.getResults = function(email, callback){
  const query = {email:email};
  //console.log(query);
  User.find(query, callback);
  //console.log(callback);
}
