define(["board"], function (board) {
    'use strict';
    var gameboard = new board();
    gameboard.init(".board-container");

    document.getElementById("restart").onclick = function () {
        gameboard.removeBoard();
        gameboard = new board();
        gameboard.init(".board-container");
    }

    document.getElementById("save").onclick = function () {
        localStorage.setItem("gameState", JSON.stringify(gameboard.gameState));
    }

    document.getElementById("load").onclick = function () {
        var state = localStorage.getItem("gameState");
        if (state) {
            gameboard.removeBoard();
            gameboard = new board();
            gameboard.init(".board-container");
            gameboard.loadGame(JSON.parse(state));
        }
    }
});