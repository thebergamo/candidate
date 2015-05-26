var mongoose = require('mongoose');

module.exports = function(db){

	var schema = new mongoose.Schema({
		words: [String]
	});

	return db.model('Article', schema);

};