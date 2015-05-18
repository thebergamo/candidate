var Promise = require('bluebird');

var Article = function(){};

Article.index = function(request, reply){
	reply('index');
};

Article.show = function(request, reply){
	reply('show');
};

Article.create = function(request, reply){
	reply('create');
};

Article.update = function(request, reply){
	reply('update');
};

Article.destroy = function(request, reply){
	reply('destroy');
};

module.exports = Article;