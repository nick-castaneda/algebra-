////////////////////////////////////////////////////////////////////////
//                              user.js                               //
////////////////////////////////////////////////////////////////////////

// Grabs the functions and definitions for the mongo database
var mongoose = require('mongoose')

// Sets a variable to a mongo db schema
var userSchema = mongoose.Schema({
  username: String,
  password: String,
  points: {type: Number, default: 0},
  level: {type: Number, default: 1}
})

// Exports a 'User' model based on the mongo schema, userSchema
module.exports = mongoose.model('User', userSchema)
