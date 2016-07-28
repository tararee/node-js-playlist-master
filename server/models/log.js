module.exports = function(sequelize, DataTypes) {
	var Log = sequelize.define('log', {
		description: DataTypes.STRING, // notes on workout
		result: DataTypes.STRING, // actual workout result (i.e. 20 pullups)
		owner: DataTypes.INTEGER, // user id of owner
		def: DataTypes.STRING // string of definition
	});

	return Log;
};