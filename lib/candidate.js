var Promise = require('bluebird');

//var Twit = Promise.promisify(require('twit'));
var Twit = require('twit');

var acc = {
	consumer_key: 				process.env.CONSUMER_KEY, 
	consumer_secret: 			process.env.CONSUMER_SECRET, 
	access_token: 				process.env.ACCESS_TOKEN, 
	access_token_secret: 	process.env.ACCESS_TOKEN_SECRET
};

var T = new Twit(acc);
var arr = ['thebergamo']
var stream = T.stream('statuses/filter', {track: arr});

arr.push('nodejs');
stream.params.track = arr;
//find a way to adding new track arguments

stream.on('tweet', function(tweet){
	var info = {
		id: tweet.id_str,
		user: tweet.user.screen_name,
		name: tweet.user.name, 
		text: tweet.text,
		truncated: tweet.truncated,
		url: tweet.entities.urls
	};
	console.log(info);
});
