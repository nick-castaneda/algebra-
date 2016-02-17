////////////////////////////////////////////////////////////////////////
//                             routes.js                              //
////////////////////////////////////////////////////////////////////////

// Grab express files; no need for 'var app' pairing here
// Call built-in module in express
// Grab all the functions from the users controller.
var express = require('express');
var router = express.Router();
var UserController = require('../controllers/usersController');

// User Routes
router.route('/users/').get(UserController.all);
router.route('/users/create').post(UserController.create);
router.route('/users/:id/delete').delete(UserController.delete);
router.route('/users/:id/show').get(UserController.show);
router.route('/users/:id/edit').put(UserController.edit);

// SAT Problem Routes
router.route('/sat/').get(SATController.all);
router.route('/sat/:number/show').get(SATController.show);

// Exports route so that other pages can grab this file
module.exports = router
