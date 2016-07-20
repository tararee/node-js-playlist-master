var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var Sequelize = require('sequelize');

var sequelize = new Sequelize('workoutlog', 'postgres', 'password', {
	host: 'localhost',
	dialect: 'postgres'	
});

sequelize.authenticate().then(
	function() {
		console.log('connected to workoutlog postgres db');
	},
	function(err) {
		console.log(err);
	}
);

// User model created using sequelize
var User = sequelize.define('user', {
	username: Sequelize.STRING,
	passwordhash: Sequelize.STRING
});

// creates the table in postgres
User.sync(); // User.sync({ force: true }); // drops the table and recreates it

app.use(bodyParser.json());

app.use(require('./middleware/headers'));

app.post('/api/user', function(req, res) {

	var username = req.body.user.username;
	var pass = req.body.user.password; // TODO: hash this password

	User.create({
		username: username,
		passwordhash: '' //TODO: make it hashed	
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

app.use('/api/test', function(req, res) {
	res.send("hello world");
});

app.listen(3000, function() {
	console.log("app is listening on port 3000");
});



// run it on the command line with:
// node app.js 