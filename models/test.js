const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const TestSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    name_lower:{
      type:String,
      required:true
    },
    passkey: {
      type: String,
      required: true
    },
    des: {
      type: String,
      required: true
    },
    setter: {
      type: String,
      required: true
    },
    questions: [{
    question:{
      type: String,
      required: true
    },
    option1:{
      type: String,
      required: true 
    },
    option2:{
      type: String,
      required: true 
    },
    option3:{
      type: String,
      required: true 
    },
    option4:{
      type: String,
      required: true 
    },
    correct:{
      type: String,
      required: true 
    }  
    }],
  },{ collection : 'test' });

const Test = module.exports = mongoose.model('Test', TestSchema);

module.exports.getTestById = function(id, callback){
  Test.findById(id, callback);
}

module.exports.getTestByName = function(name, callback){
  const query = {name_lower: name};
  //console.log(query);
  Test.find(query, callback);
  //console.log(callback);
}

module.exports.addTest = function(newTest, callback){

      newTest.save(callback);
}

module.exports.Load =function(callback)
{
Test.find({},callback);
//console.log(callback);
}

module.exports.Delete =function(name,callback)
{
Menu.deleteOne({ "name" :name } ,callback);
//console.log(callback);
}