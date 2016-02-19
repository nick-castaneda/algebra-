////////////////////////////////////////////////////////////////////////
//                              user.js                               //
////////////////////////////////////////////////////////////////////////

// Grabs the functions and definitions for the mongo database
var mongoose = require('mongoose')

// Sets a variable to a mongo db schema
var userSchema = mongoose.Schema({
  username: String,
  password: String,
  points: {
    equation: {type: Number, default: 0},
    expression: {type: Number, default: 0},
    sat: {type: Number, default: 0}
  },
  picUrl: {type: String, default: "http://www.gannett-cdn.com/-mm-/bc4e488c3998e98fa15a27c76a485e9544732515/c=113-264-2598-3577&r=537&c=0-0-534-712/local/-/media/2015/01/31/DetroitFreePress/DetroitFreePress/635583422789856320-AP-Lions-Cowboys-Football-OT.JPG"}
})

// Exports a 'User' model based on the mongo schema, userSchema
module.exports = mongoose.model('User', userSchema)
