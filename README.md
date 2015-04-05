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
engine.js
Engine is the abstraction of the gaming rule. It expose APIs to determine whether a move
is legal or not. It also tells you whether the game is won.

constructor(gameBoard)
invalidCount: how many invalid cells left
board: gaming board
onGameWinning: function callback. This will be called if game is won.
init(successCallBack, errorCallBack): initalize the gaming engine. If board is invalid, error call back will be called.
isValid(i, j, k, l, num): to determine wehter this move is valid. If num is absent, then check if the existing number in the cell is valid.
makeAMove(i, j, k, l, num, callback): make a move in the engine. Callback will tell you whether the previous number in the cell is valid and whether current number is valid.

Board is the abstraction of the game board. It handles the board rendering and game state.
APIs:
init(container): container is the class that you want to use for board rendering.
removeBoard(): removing the board from container.
loadGame(state): loading the game with saved data.

main.js:
This module interface with non-gaming related stuff.
```