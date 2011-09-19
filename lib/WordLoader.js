var fs = require('fs');
var path = require('path');
var Word = require('./Word');
var stalker = require('stalker');

var dirName = "./words";

module.exports.start = function(cb) {
	stalker.watch(dirName, {
		buffer : 1000,
		recurse : false
	}, function(err, files) {
		if (!err) {
			readFiles(files, cb);
		}

	});
};

function readFiles(files, cb) {
	for ( var fileKey in files) {
		readFile(files[fileKey], cb);
	}
}

function readFile(file, cb) {
	fs.readFile(file, "utf8", function(err, data) {
		if (!err) {
			processFileData(file, data, cb);
		}
	});
};

function processFileData(name, data, cb) {
	var fileData = data.split("\n");
	var fileName = path.basename(name.toString(), '.txt');
	var goodWords = fileData.filter(isWordAcceptable);
	var words = [];
	for ( var key in goodWords) {
		words.push(new Word(goodWords[key], fileName));
	}
	cb(words);

};

function isWordAcceptable(word) {
	return word.length > 4;
};

