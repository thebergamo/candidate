var Hapi = require('hapi');
var Promise = require('bluebird');

var database = require('../helpers/database');

//load controllers;
var Controllers = require('../controller');

database.initialize();

//Export Global variables
global.db = database.models;

var server = new Hapi.Server();
server.connection({ 
  host: 'localhost', 
  port: 8000 
});

// Add the routes
server.route({
  method: 'POST',
  path:'/article', 
  handler: Controllers.article.create
});

server.route({
	method: 'GET',
	path: '/article',
	handler: Controllers.article.index
});

server.route({
	method: 'GET',
	path: '/article/{id}',
	handler: Controllers.article.show
});

server.route({
	method: 'PUT', 
	path: '/article/{id}',
	handler: Controllers.article.update
});

server.route({
	method: 'DELETE', 
	path: '/article/{id}',
	handler: Controllers.article.destroy
});

server.route({
	method: 'POST',
	path: '/user',
	handler: Controller.user.create
});

server.route({
	method: 'GET',
	path: '/user',
	handler: Controller.user.index
});

server.route({
	method: 'GET',
	path: '/user/{id}',
	handler: Controller.user.show
});

server.route({
	method: 'PUT',
	path: '/user/{id}',
	handler: Controller.user.update
});

server.route({
	method: 'DELETE',
	path: '/user/{id}',
	handler: Controller.user.create
});

// Start the server
server.start(function(){
	console.log('Server started!');
});
