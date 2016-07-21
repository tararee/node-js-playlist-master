// definition model needs description, logtype, and an owner
module.exports = function(sequelize, DataTypes) {

	var Definition = sequelize.define('definition', {
		description: DataTypes.STRING,
		logType: DataTypes.STRING,
		owner: DataTypes.INTEGER
	});

	return Definition;
};

/*
	{ 
		definition : {
			description: "run 5k",
			logType: "byTime",
			owner: 1 // user id of who created it		
		}
	},

	{
		definition: {
			description: "pullups",
			logType: "reps",
			owner: 6
		}
	}

*/
