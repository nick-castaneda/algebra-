////////////////////////////////////////////////////////////////////////
//                             routes.js                              //
////////////////////////////////////////////////////////////////////////

// Grab express files; no need for 'var app' pairing here
// Call built-in module in express
// Grab all the functions from the users controller.
var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/usersController');
var SATController = require('../controllers/satController')



router.route('/users/').get(UsersController.all);
router.route('/users/create').post(UsersController.create);
router.route('/users/:id/delete').delete(UsersController.delete);
router.route('/users/:username/:password/show').get(UsersController.show);
router.route('/users/:username/edit').put(UsersController.edit);

// apply the routes to our application with the prefix /api
// app.use('/users', router);

// SAT Problem Routes
router.route('/sat/').get(SATController.all);
router.route('/sat/:number/show').get(SATController.show);
router.route('/sat/:id/delete').delete(SATController.delete);


// Exports route so that other pages can grab this file
module.exports = router


// // Below for tokens
// var app = express(); // Function in exress to run application
// var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
// var config = require('../config'); // get our config file
// app.set('superSecret', config.secret);

// // User Routes
// router.route('/users/authenticate').post(UsersController.auth);
// router.use(function(req, res, next) {

//   // check header or url parameters or post parameters for token
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];

//   // decode token
//   if (token) {

//     // verifies secret and checks exp
//     jwt.verify(token, app.get('superSecret'), function(err, decoded) {
//       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;
//         next();
//       }
//     });

//   } else {

//     // if there is no token
//     // return an error
//     return res.status(403).send({
//         success: false,
//         message: 'No token provided.'
//     });

//   }
// });
