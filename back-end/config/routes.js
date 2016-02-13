////////////////////////////////////////////////////////////////////////
//                             routes.js                              //
////////////////////////////////////////////////////////////////////////

// Grab express files; no need for 'var app' pairing here
// Call built-in module in express
// Grab all the functions from the users controller.
var express = require('express');
var router = express.Router();
var UserController = require('../controllers/usersController');

// Routes
router.route('/').get(UserController.all);
router.route('/create').post(UserController.create);
router.route('/:id/delete').delete(UserController.delete);
router.route('/:id/show').get(UserController.show);
router.route('/:id/edit').put(UserController.edit);

// Exports route so that other pages can grab this file
module.exports = router
