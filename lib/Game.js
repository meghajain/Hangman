var Word = require('./Word');

var Game = function(word) {
	this.answer = word.word;
	this.category = word.category;
	var temp = this.answer.replace(/[A-Z]/g, "_");
	this.hiddenGame = temp.split("");
	this.submitted = [];
	this.submittedLetters = [];
	this.numWrongAnswers = 0;
	this.active = this.setActive();
};

Game.prototype = {
		numWrongAnswers: 0,
		maxWrongAnswers: 6,
		answer: null,
		hiddenGame: null,
		submittedLetters: null,
		active: false,
		category: null,
		
		checkLetter: function(letter, name) {
			if(this.active == false) {
				return;
			}
			var start = 0;
			var letterIndex = -1;
			var correctLetter = false;
			var submittedLetterIndex = this.submittedLetters.indexOf(letter);
			if(submittedLetterIndex >= 0) {
				throw new Error("Letter " + letter + " already submitted");
			} else {
				this.submittedLetters.push(letter);
				this.submitted.push({name:name, letter:letter});
			}
			
			do {
				letterIndex = this.answer.indexOf(letter.toUpperCase(), start);
				
				if(letterIndex >= 0) {
					start = letterIndex + 1;
					this.hiddenGame[letterIndex] = letter;
					correctLetter = true;
				}
			} while(letterIndex >= 0);
			
			if(correctLetter == false) {
				this.numWrongAnswers++;
			}
			this.setActive();
			
			return { letter: letter, game: this.hiddenGame.join(""), type: (correctLetter == true) ? 'success' : 'failure'};
		},

		isGameOver: function() {
			if(this.numWrongAnswers >= this.maxWrongAnswers) {
				return { gameOver: true, type: 'failure'};
			} else if(this.hiddenGame.indexOf("_") < 0) {
				return { gameOver: true, type: 'success'};
			} else {
				return { gameOver: false};
			}
		},
		
		setActive: function() {
			if(this.numWrongAnswers >= this.maxWrongAnswers) {
				this.active = false;		
			} else if(this.hiddenGame.indexOf("_") < 0) {
				this.active = false;
			} else {
				this.active = true;
			}
		},

		getGame: function() {
			return { 
				game: this.hiddenGame.join(""), 
				submittedLetters: this.submitted,
				numWrongAnswers: this.numWrongAnswers,
				category: this.category
			};
		}
};

module.exports = Game;
