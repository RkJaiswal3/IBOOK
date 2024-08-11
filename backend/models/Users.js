// const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose')
const { Schema } = mongoose; //data pattern which is called the schema

const userSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
       
    },
    password:{
        type: String,
        require: true
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  const User = mongoose.model('users', userSchema);
  User.createIndexes();
  module.exports = User;

