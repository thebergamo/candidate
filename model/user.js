var mongoose = require('mongoose');

module.exports = function(db){
	var schema = new mongoose.Schema({
		name: String, 
		username: String,
		friends: [String],
		fav_stories: [String],
		vector: [String]
	});

	//ADDING ON SAVING FAV_STORIES - RE-CALCULATE THE VECTOR!!

	return db.model('User', schema);
};