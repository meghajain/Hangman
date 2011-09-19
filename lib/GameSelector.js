var Word = require('./Word');
var WordLoader = require('./WordLoader');
var Game = require('./Game');
var games = [];

var initialSetupCb;

module.exports.get = function(){
	
	var index = Math.floor(Math.random()*games.length);
	return new Game(games[index]);
};

module.exports.setup = function(cb){
	initialSetupCb = cb;
	WordLoader.start(loadGames);
};

var loadGames = function(newGames) {
	var initialSetup = false;
	if(games.length == 0 && newGames.length > 0) {
		initialSetup = true;
	}
	games = games.concat(newGames);
	
	if(initialSetup == true) {
		initialSetupCb();
	}
};