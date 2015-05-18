var Hapi = require('hapi');
var Candidate = require('./candidate');
// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
  host: 'localhost', 
  port: 8000 
});

// Add the route
server.route({
  method: 'POST',
  path:'/term', 
  handler: function (request, reply) {
     term = request.payload.term;

     Candidate.setTerm(term);

     reply('ok');
  }
});

server.route({
	method: 'GET',
	path: '/term',
	handler: function(request, reply){
		reply(Candidate.getTerm());
	}
});

server.route({
	method: 'GET',
	path: '/story',
	handler: function(request, reply){
		//GET STORIES
		reply('ok');
	}
});

server.route({
	method: 'GET', 
	path: '/profile',
	handler: function(request, reply){
		reply('ok');
	}
})


// Start the server
server.start(function(){
	console.log('Server started!');
	//Candidate.start();
});

Candidate.stream.on('tweet', function(tweet){
	var info = {
		id: tweet.id_str,
		user: tweet.user.screen_name,
		name: tweet.user.name, 
		text: tweet.text,
		truncated: tweet.truncated,
		url: tweet.entities.urls
	};

	console.log(info.user + ' - ' + info.text);
});