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
var diffbot = new Diffbot({token: process.env.DIFFBOT_TOKEN});

var arr = ['nodejs']
var stream = t.stream('statuses/filter', {track: arr});

//stream.params.track = arr;

stream.on('tweet', function(tweet){
	var info = {
		id: tweet.id_str,
		user: tweet.user.screen_name,
		name: tweet.user.name, 
		text: tweet.text,
		truncated: tweet.truncated,
		url: tweet.entities.urls
	};
	
	if(typeof info.url !== undefined && info.url.length !== 0){
		info.url.forEach(function(el, index){
			diffbot.analyze({
				url: el.url
			}, function(err, request, analyze){
				if(err){
					throw err;
				}

				var analyze = JSON.parse(analyze);
				if(analyze.type == 'article'){
					console.log(info.user + ' - ' + info.text + ' - link - ' +  analyze.request.pageUrl);
				}
			});
		});
	}
});
