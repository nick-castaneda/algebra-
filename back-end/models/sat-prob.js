////////////////////////////////////////////////////////////////////////
//                            sat-prob.js                             //
////////////////////////////////////////////////////////////////////////

// Grabs the functions and definitions for the mongo database
var mongoose = require('mongoose')

// Sets a variable to a mongo db schema
var satProbSchema = mongoose.Schema({
  number: Number,
  img: String,
  choices: {
    a: String,
    b: String,
    c: String,
    d: String
  },
  answer: String,
  calcPermitted: Boolean
})

// Exports a 'User' model based on the mongo schema, userSchema
module.exports = mongoose.model('SATProb', satProbSchema)
