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

// User Routes
router.route('/users/').get(UsersController.all);
router.route('/users/create').post(UsersController.create);
router.route('/users/:id/delete').delete(UsersController.delete);
router.route('/users/:id/show').get(UsersController.show);
router.route('/users/:id/edit').put(UsersController.edit);

// SAT Problem Routes
router.route('/sat/').get(SATController.all);
router.route('/sat/:number/show').get(SATController.show);
router.route('/sat/:id/delete').delete(SATController.delete);


// Exports route so that other pages can grab this file
module.exports = router
