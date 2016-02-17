////////////////////////////////////////////////////////////////////////
//                          satController.js                          //
////////////////////////////////////////////////////////////////////////

// Sets up variable for the user model. Have to go to parent direct.
var SATProb = require('../models/sat-prob');

// Exports route functions. These are called on the routes page.
module.exports = {

  // Goes into db and grabs all the users based on the SATProb model.
  // JSON renders all the users
  all: function (req, res, next) {
    SATProb.find({}, function (err, probs) {
      res.header('Access-Control-Allow-Origin', "*");
      res.json(probs);
    })
  },

  // API function to show a specific restaurant. Restaurant.findById()
  // matches the id param in the request to an id in the database and
  // the restaurant with that id is rendered through JSON.
  show: function (req, res, next){
    SATProb.findById({number: req.params.number}, function (err, prob){
      res.json(prob);
    })
  },

  // CUT EVENTUALLY
  delete: function (req, res, next){
    SATProb.findOneAndRemove({_id: req.params.id}, function (err, data){
      if (err) res.json('Prob NOT deleted!');
      else res.json('Prob deleted!');
    });
  }

}
