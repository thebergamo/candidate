var Twit = require('twit');
var Diffbot = require('diffbot-api-client');
var Promise = require('bluebird');

var credentials = {
	consumer_key: 				process.env.CONSUMER_KEY, 
	consumer_secret: 			process.env.CONSUMER_SECRET, 
	access_token: 				process.env.ACCESS_TOKEN, 
	access_token_secret: 	process.env.ACCESS_TOKEN_SECRET
};

var twit = new Twit(credentials);
var diffbot = new Diffbot({token: process.env.DIFFBOT_TOKEN});

var StreamEvent = twit.stream('statuses/filter', {track: ['candidateApp']});

module.exports.addTerm = function(term){
	return Promise.resolve(function(){
		var params = StreamEvent.params.track;

		if(typeof params !== 'array'){
			params = new Array(params);
		}

		params.push(term);

		StreamEvent.params.track = params;

		return;
	});
};

module.exports.delTerm = function(term){
	return Promise.resolve(function(){
		var params = StreamEvent.params.track;

		if(typeof params !== 'array' && typeof params === 'string'){
			params = params.split(',');
		}

		var index = params.indexOf(term);
		if(index != -1){
			params.splice(index, 1);
		}

		StreamEvent.params.track = params;

		return;
	});
};

module.exports.restart = function(){
	return Promise.resolve(function(){
		StreamEvent.stop();
		StreamEvent.start();
	});
};

module.exports.listen = function(){
	return new Promise(function(resolve, reject){
		StreamEvent.on('tweet', function(tweet){
			var info = {
				id: tweet.id_str,
				user: tweet.user.screen_name,
				name: tweet.user.name, 
				text: tweet.text,
				truncated: tweet.truncated,
				url: tweet.entities.urls,
				date: tweet.date
			};

			console.log('tweet: '+ info.user + ' - ' + info.text);

			if(typeof info.url !== undefined && info.url.length !== 0){
				info.url.forEach(function(el, index){
					diffbot.analyze({
						url: el.url
					}, function(err, request, analyze){
						if(err){
							return reject(err);
						}

						var analyze = JSON.parse(analyze);
						if(analyze.type == 'article'){
							var article = new db.article({
									title		: analyze.title,
									author	: info.user, //twitter author
									tweet		: info.id,
									date 		: info.date,
									url			: analyze.request.pageUrl,
									vector	: ,
									score		: 10
							});

							return article.saveAsync();
						}
					});
				});
			}
		});
	});
};