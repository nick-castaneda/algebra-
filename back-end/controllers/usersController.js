////////////////////////////////////////////////////////////////////////
//                        usersController.js                          //
////////////////////////////////////////////////////////////////////////

// Sets up variable for the user model. Have to go to parent direct.
var User = require('../models/user');

// Exports route functions. These are called on the routes page.
module.exports = {

  // Goes into db and grabs all the users based on the User model.
  // JSON renders all the users
  all: function (req, res, next) {
    User.find({}, function (err, users) {
      res.header('Access-Control-Allow-Origin', "*"); // Is this bad??????
      res.json(users);
    })
  },

  // Creates a new User based on the User model and grabs all the keys
  // from the request's body.
  // Sets a variable to the keys in the request's body (as opposed to
  // the whole request. (Object.keys is a function that grabs all the
  // keys of an object.
  // The method then loops through the key array setting keys for the
  // new Flight based on the keys in the request.
  // The new flight is saved in the database. If there's an error, it
  // logs, otherwise the method responds with 'flight created'.
  create: function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*"); // Is this bad??????
    var newUser = new User();
    var keys = Object.keys(req.body);
    keys.forEach(function (key) {
      newUser[key] = req.body[key];
    })
    newUser.save(function (err) {
      if (err) console.log(err);
      else res.send('User Registered!');
    })
  },

  // API function to delete a specific restaurant.
  // Restaurant.findOneAndRemove() matches the id param in the request
  // to an id in the database and the restaurant with that id is deleted
  // from the db. Success messages or err is rendered through JSON.
  delete: function (req, res, next){
    User.findOneAndRemove({_id: req.params.id}, function (err, data){
      if (err) res.json('User NOT deleted!');
      else res.json('User deleted!');
    });
  },

  // API function to show a specific restaurant. Restaurant.findById()
  // matches the id param in the request to an id in the database and
  // the restaurant with that id is rendered through JSON.
  show: function (req, res, next){
    User.findById({_id: req.params.id}, function (err, user){
      res.json(user);
    })
  },

  //
  // API function to edit a specific restaurant. Restaurant.findById()
  // matches the id param in the request to an id in the database and
  // grabs it. A 'keys' array is created using the keys in the request's
  // body. A forEach iterator sets the value of the restaurant's keys to
  // the value of each of the request's body's keys. The restaurant is
  // then saved to the db and a success response is sent.
  edit: function (req, res, next){
    User.findById(req.params.id, function (err, user){
      var keys = Object.keys(req.body);
      keys.forEach(function(key){
        user[key] = req.body[key];
      });
      user.save();
    });
    res.send('Information updated!');
  }
}
