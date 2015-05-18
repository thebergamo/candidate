var mongoose = require('mongoose');

module.exports = function(db){

	var schema = new mongoose.Schema({
		title 	: String,
		author	: String, //twitter author
		tweet		: String,
		date 		: Date,
		url			: String,
		vector	: [String],
		score		: Number
	});

	return db.model('Article', schema);

};