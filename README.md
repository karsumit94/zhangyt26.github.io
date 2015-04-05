# sudoku

Application structure is created by using yeoman generator. https://github.com/danheberden/yeoman-generator-requirejs


## Getting Started

Make sure you have the latest packages installed

npm install
bower install

## Running the server

You can run the app using `grunt preview`. This will start a
server on `localhost:8000`. You can simply go to the url 
http://localhost:8000/index.htm while it's running.

## Documentation

````javascript
//engine.js
//Engine is the abstraction of the gaming rule.
var Engine = function (gameBoard) {
    this.invalidCount = 0;      //how many invalid cells left
    this.board = gameBoard;     //gaming board
    this.onGameWinning = null;  //function callback. This will be called if game is won.

};
//initalize the gaming engine. If board is invalid, error call back will be called.
Engine.prototype.init = function (successCallBack, errorCallBack) {...};

//to determine wehter this move is valid. If num is absent, then check if the existing number in the cell is valid.
Engine.prototype.isValid = function (i, j, k, l, num) {...};

//make a move in the engine. Callback will tell you whether the previous number in the cell is valid and whether current number is valid.
Engine.prototype.makeAMove = function (i, j, k, l, num, callback) {...};

//board.js
//Board is the abstraction of the game board. It handles the board rendering and game state.
var Board = function () {
    this.gameBoard = $.extend(true, [], defaultBoard);  //gaming board
    this.gameState = {};                                //numbers set by player
    this.gameEngine = new Engine(this.gameBoard);       //game engine
    this.gameEngine.init();
    this.boardContainer = null;                         //container to use for rendering
};

//container is the css class that you want to use for board rendering. winning callback is a callback function which will be triggered if the game is won.
Board.prototype.init = function (container, winningCallback) {...};

//removing the board from container.
Board.prototype.removeBoard = function () {...};

//loading the game with saved data.
Board.prototype.loadGame = function (state) {...};

//main.js:
//This module interface with non-gaming related stuff. It uses localStorage to store the user states. It can be extended by sending data to server.
```

## Things that can be improved
UI enhancement
Media query for different devices
Unit testing