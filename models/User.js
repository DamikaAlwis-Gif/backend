const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  firstName: {
    type: String,
    required: true,
    
  },
  lastName: {
     type: String,
    required: true,
    
  },
  userName: {
    type: String,
    required: true,
    unique: true
  
  },
  passWord: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model("User", user);