var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');

router.post('/', function(req, res) {

	var username = req.body.user.username;
	var pass = req.body.user.password;
	// User model communicates with 
	// Postgres to create a new user
	User.create({
		username: username,
		passwordhash: bcrypt.hashSync(pass, 10)
	}).then(
		function createSuccess(user) {
			res.json({
				user: user,
				message: 'created'
			});
		},
		function createError(err) {
			res.send(500, err.message);	
		}
	);
});


module.exports = router;