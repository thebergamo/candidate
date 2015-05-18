var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));

var Database = function(){};

Database.prototype = (function(){
	return {
		initialize: function(){
			var env = process.env.NODE_ENV || 'development';
			var root = path.join(__dirname, '..', 'model');

			this.models = {};
			this.loadConfig(env);
			this.loadModels(root);
		},
		loadConfig: function(env){
			var file = path.join(__dirname, '..', 'config', env+'.json');
			if(!fs.lstatSync(file).isFile()){
				throw new Error('Database not loaded');
			}
			var config = require(file);

			this.mongo = mongoose.createConnection('mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.name );
		},
		loadModels: function(root){
			var self = this;
			var files = fs.readdirSync(root);

			files.forEach(function(file){
				var fullPath = path.join(root, file);
				var stat = fs.lstatSync(fullPath);

				if(stat.isFile() && file.match(/\.js$/) !== null){
					self.models[path.basename(file, '.js')] =  require(fullPath)(self.mongo);
				}
			});
		}
	};
})();

var database = new Database();

module.exports = database;
//module.exports