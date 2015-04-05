define(["board", "jquery"], function (Board, $) {
    'use strict';

    function winningCallback() {
        $(".info-bar").text("YOU WIN! CLICK RESTART TO TRY AGAIN.");
        $(".info-bar").toggleClass("info-bar-active");
        setTimeout(function () {
            $(".info-bar").toggleClass("info-bar-active");
        }, 2000);
    }
    var gameboard = new Board();
    gameboard.init(".board-container", winningCallback);


    document.getElementById("restart").onclick = function () {
        gameboard.removeBoard();
        gameboard = new Board();
        gameboard.init(".board-container", winningCallback);
    };

    document.getElementById("save").onclick = function () {
        $(".info-bar").text("GAME SAVED.");
        $(".info-bar").toggleClass("info-bar-save");
        setTimeout(function () {
            $(".info-bar").toggleClass("info-bar-save");
        }, 2000);
        localStorage.setItem("gameState", JSON.stringify(gameboard.gameState));
    };

    document.getElementById("load").onclick = function () {
        $(".info-bar").text("GAME LOADED.");
        $(".info-bar").toggleClass("info-bar-load");
        setTimeout(function () {
            $(".info-bar").toggleClass("info-bar-load");
        }, 2000);
        var state = localStorage.getItem("gameState");
        if (state) {
            gameboard.removeBoard();
            gameboard = new Board();
            gameboard.init(".board-container", winningCallback);
            gameboard.loadGame(JSON.parse(state));
        }
    };
});