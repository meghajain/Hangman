var Hangman = {	canvas : null,	client : null,	numWrongAnswers : 0,	drawHangman : [],	gameDiv : null,	submittedlettersDiv : null,	scoreDiv : null,	keyboardLetters : null};Hangman.setup = function() {	this.canvas = new Canvas($("#c")[0]);	this.drawHangman[0] = $.proxy(this.canvas.drawHead, this.canvas);	this.drawHangman[1] = $.proxy(this.canvas.drawBody, this.canvas);	this.drawHangman[2] = $.proxy(this.canvas.drawRightArm, this.canvas);	this.drawHangman[3] = $.proxy(this.canvas.drawLeftArm, this.canvas);	this.drawHangman[4] = $.proxy(this.canvas.drawRightLeg, this.canvas);	this.drawHangman[5] = $.proxy(this.canvas.drawLeftLeg, this.canvas);	this.gameDiv = $('#game');	this.submittedLettersDiv = $('#submittedLetters');	this.scoreDiv = $('#score');	this.keyboardLetters = $(".letter");};Hangman.joinGame = function() {	if (this.canvas.isEnabled()) {		if (!this.client) {			Hangman.startFirstGame($("#nameInput").attr("value"));		} else {			Hangman.startNextGame();		}	}};Hangman.startFirstGame = function(name) {	var client = this.startClient(name);	this.keyboardLetters.click($.proxy(function(e) {		this.client.send('letter', e.target.id);	}, this));	$("#name").addClass("noDisplay");	$("#hangman").removeClass("noDisplay");};Hangman.startNextGame = function(name) {	Hangman.clearGame();	this.client.send('join', '');	$("#join").addClass("noDisplay");	$("#canvasDiv").removeClass("noDisplay");	$("#won").addClass("noDisplay");	$("#lost").addClass("noDisplay");	$("#c").addClass("inPlay");};Hangman.startClient = function(name) {	this.client = new SocketClient(name);	var location = 'http://' + document.location.host + '/hangman';	this.client.connect(location, $.proxy(function(){		this.client.on('start', $.proxy(this.onStart, this));		this.client.on('wrongLetter', $.proxy(this.onWrongLetter, this));		this.client.on('rightLetter', $.proxy(this.onRightLetter, this));		this.client.on('gameOver', $.proxy(this.onGameOver, this));		this.client.on('score', $.proxy(this.onScore, this));		this.startNextGame();	}, this));	return this.client;};Hangman.enterGame = function(game) {	game = game.split("");	game = game.join(" ");	game = game.replace(/  /g, "&nbsp;&nbsp;&nbsp;");	this.gameDiv.html(game);};Hangman.setCategory = function(category) {	$('#category').text(category);};Hangman.letterSubmitted = function(letter, name) {	var text = this.submittedLettersDiv.html();	if (text.length > 0) {		text += "<br/>";	}	text += name + ": " + letter;	this.submittedLettersDiv.html(text);	var letterButton = $("#" + letter);	letterButton.attr("disabled", true);	letterButton.addClass("hidden");};Hangman.wrongAnswer = function() {	this.drawHangman[this.numWrongAnswers++]();};Hangman.clearGame = function() {	this.canvas.clearAll();	this.canvas.drawHanger();	this.numWrongAnswers = 0;	this.enterGame("");	this.submittedLettersDiv.text("");	this.keyboardLetters.removeAttr("disabled");	this.keyboardLetters.removeClass("disabled");	this.keyboardLetters.removeClass("hidden");};/* Event Handlers */Hangman.onStart = function(data) {		this.enterGame(data.game);		for ( var i = 0; i < data.submittedLetters.length; i++) {			var submitted = data.submittedLetters[i];			this.letterSubmitted(submitted.letter, submitted.name);		}		for ( var i = 0; i < data.numWrongAnswers; i++) {			this.wrongAnswer();					}		this.onScore(data.score);		this.setCategory(data.category);};Hangman.onWrongLetter = function(data) {	this.letterSubmitted(data.letter, data.name);	this.wrongAnswer();};Hangman.onRightLetter = function(data) {	this.enterGame(data.game);	this.letterSubmitted(data.letter, data.name);};Hangman.onScore = function(score) {	this.scoreDiv.text(score);};Hangman.onGameOver = function(data) {	var won = false;	if (data.type == 'success') {		won = true;	}	this.enterGame(data.answer);	this.keyboardLetters.attr("disabled", true);	this.keyboardLetters.addClass("disabled");	$("#join").removeClass("noDisplay");	$("#c").removeClass("inPlay");	// $("#canvasDiv").addClass("noDisplay");	if (won == true) {		if (this.numWrongAnswers > 0) {			this.canvas.drawHappyFace();		}		$("#won").removeClass("noDisplay");	} else {		this.canvas.drawDeadFace();		$("#lost").removeClass("noDisplay");	}};$(document).ready(function() {		if(!window.WebSocket || !($("#c")[0].getContext)) {		$("#browserNotSupported").removeClass("noDisplay");		$("#join").addClass("noDisplay");		$("#name").addClass("noDisplay");	} else {		Hangman.setup();		Hangman.clearGame();	}});