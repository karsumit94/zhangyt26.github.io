# sudoku

Application structure is created by using yeoman generator. https://github.com/danheberden/yeoman-generator-requirejs

Game is well tested on Chrome & Firefox

## Getting Started

Make sure you have the latest packages installed

npm install
bower install

## Running the server

You can run the app using `grunt preview`. This will start a
server on `localhost:8000`. You can simply go to the url 
http://localhost:8000/index.htm while it's running.

## Documentation
engine.js
Engine is the abstraction of the gaming rule.
```javascript
var Engine = function (gameBoard) {
    this.invalidCount = 0;      //how many invalid cells left
    this.board = gameBoard;     //gaming board
    this.onGameWinning = null;  //function callback. This will be called if game is won.

};
//initalize the gaming engine. If board is invalid, error call back will be called.
Engine.prototype.init = function (successCallBack, errorCallBack) {...};
//to determine wehter this move is valid. If num is absent, 
//then check if the existing number in the cell is valid.
Engine.prototype.isValid = function (i, j, k, l, num) {...};
//make a move in the engine. Callback will tell you whether the 
//previous number in the cell is valid and whether current number is valid.
Engine.prototype.makeAMove = function (i, j, k, l, num, callback) {...};
```

board.js
Board is the abstraction of the game board. It handles the board rendering and game state.
```javascript
var Board = function () {
    this.gameBoard = $.extend(true, [], defaultBoard);  //gaming board
    this.gameState = {};                                //numbers set by player
    this.gameEngine = new Engine(this.gameBoard);       //game engine
    this.gameEngine.init();
    this.boardContainer = null;                         //container to use for rendering
};

//container is the css class that you want to use for board rendering. 
//winning callback is a callback function which will be triggered if the game is won.
Board.prototype.init = function (container, winningCallback) {...};
//removing the board from container.
Board.prototype.removeBoard = function () {...};
//loading the game with saved data.
Board.prototype.loadGame = function (state) {...};
```

main.js:
This module interface with non-gaming related stuff. It uses localStorage to store the user states. It can be extended by sending data to server.

## Algorithm used to check the board
Data Structure:
```javascript
    var firstCell1 = [[5, 3, 0], [6, 0, 0], [0, 9, 8]],
        secondCell1 = [[0, 7, 0], [1, 9, 5], [0, 0, 0]],
        thirdCell1 = [[0, 0, 0], [0, 0, 0], [0, 6, 0]],
        firstRow = [firstCell1, secondCell1, thirdCell1],
        firstCell2 = [[8, 0, 0], [4, 0, 0], [7, 0, 0]],
        secondCell2 = [[0, 6, 0], [8, 0, 3], [0, 2, 0]],
        thirdCell2 = [[0, 0, 3], [0, 0, 1], [0, 0, 6]],
        secondRow = [firstCell2, secondCell2, thirdCell2],
        firstCell3 = [[0, 6, 0], [0, 0, 0], [0, 0, 0]],
        secondCell3 = [[0, 0, 0], [4, 1, 9], [0, 8, 0]],
        thirdCell3 = [[2, 8, 0], [0, 0, 5], [0, 7, 9]],
        thirdRow = [firstCell3, secondCell3, thirdCell3],
        defaultBoard = [firstRow, secondRow, thirdRow];
```

Check sub-table
```javascript
for (a = 0; a < 3; a++) {
    for (b = 0; b < 3; b++) {
        if (num && this.board[i][j][a][b] === num) {
            return false;
        } else {
            if (this.board[i][j][a][b] === this.board[i][j][k][l] && (a !== k || b !== l)) {
                return false;
            }
        }
    }
}
```

Check row
```javascript
for (a = 0; a < 3; a++) {
    for (b = 0; b < 3; b++) {
        if (num && this.board[i][a][k][b] === num) {
            return false;
        } else {
            if (this.board[i][a][k][b] === this.board[i][j][k][l] && (a !== j || b !== l)) {
                return false;
            }
        }
    }
}
```

Check collumn
```javascript
for (a = 0; a < 3; a++) {
    for (b = 0; b < 3; b++) {
        if (num && this.board[a][j][b][l] === num) {
            return false;
        } else {
            if (this.board[a][j][b][l] === this.board[i][j][k][l] && (a !== i || b !== k)) {
                return false;
            }
        }
    }
}
```

## Things that can be improved
1. UI enhancement
2. Media query for different devices
3. Unit testing