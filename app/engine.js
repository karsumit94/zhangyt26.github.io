define([], function () {
    'use strict';
    
    var Engine = function (gameBoard) {
        this.invalidCount = 0;
        this.board = gameBoard;
        this.onGameWinning;

    }

    Engine.prototype.init = function (successCallBack, errorCallBack) {
        if (!this.board) {
            if (errorCallBack) {
                errorCallBack();
            }
            return;
        }

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    for (var l = 0; l < 3; l++) {
                        if (this.board[i][j][k][l] === 0) {
                            this.invalidCount++;
                        }
                    }
                }
            }
        }

        if (successCallBack) {
            successCallBack();
        }
    }

    Engine.prototype.isValid = function (i, j, k, l, num) {
        // if no value, always true
        if (this.board[i][j][k][l] === 0) {
            return true;
        }

        // check the sub-table
        for (var a = 0; a < 3; a++) {
            for (var b = 0; b < 3; b++) {
                if (num && this.board[i][j][a][b] === num) {
                    return false;
                } else {
                    if (this.board[i][j][a][b] === this.board[i][j][k][l] && (a !== k || b !== l)) {
                        return false;
                    }
                }

            }
        }

        // check horizontal
        for (var a = 0; a < 3; a++) {
            for (var b = 0; b < 3; b++) {
                if (num && this.board[i][a][k][b] === num) {
                    return false;
                } else {
                    if (this.board[i][a][k][b] === this.board[i][j][k][l] && (a !== j || b !== l)) {
                        return false;
                    }
                }
            }
        }


        // check vertical
        for (var a = 0; a < 3; a++) {
            for (var b = 0; b < 3; b++) {
                if (num && this.board[a][j][b][l] === num) {
                    return false;
                } else {
                    if (this.board[a][j][b][l] === this.board[i][j][k][l] && (a !== i || b !== k)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    Engine.prototype.makeAMove = function (i, j, l, k, num, callback) {
        var isAlreadyValid = this.isValid(i, j, l, k);
        var previousValue = this.board[i][j][l][k];
        this.board[i][j][l][k] = num;
        var isValid = this.isValid(i, j, l, k);
        if (isAlreadyValid && previousValue!== 0 && !isValid) {
            this.invalidCount++;
        } else if (!isAlreadyValid && isValid) {
            this.invalidCount--;
        }
        if (callback) {
            callback(isAlreadyValid, isValid);
        }
        if (this.invalidCount === 0) {
            this.onGameWinning();
        }
    }

    return Engine;


});

// check the cell
//                                    for (var a=0; a<3; a++) {
//                                        for (var b=0; b<3; b++) {
////                                            console.log(board[i][j][a][b]);
//                                        }
//                                    }
//                                    
//                                    for (var a=0; a<3; a++) {
//                                        for (var b=0; b<3; b++) {
////                                            console.log(board[i][a][k][b]);
//                                        }
//                                    }
//                                    
//                                    for (var a=0; a<3; a++) {
//                                        for (var b=0; b<3; b++) {
////                                            console.log(board[a][j][b][l]);
//                                        }
//                                    }