var Promise = require('bluebird');

//var Twit = Promise.promisify(require('twit'));
var Twit = require('twit');
var Diffbot = require('diffbot-api-client');


var acc = {
	consumer_key: 				process.env.CONSUMER_KEY, 
	consumer_secret: 			process.env.CONSUMER_SECRET, 
	access_token: 				process.env.ACCESS_TOKEN, 
	access_token_secret: 	process.env.ACCESS_TOKEN_SECRET
};

var t = new Twit(acc);

t.get('followers/list', {screen_name: 'alan_hoff', count: 3}, function(err, user){
	console.log(user);
});