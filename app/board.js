define(["jquery", "engine"], function ($, engine) {
    'use strict';
    var firstCell1 = [[5, 3, 0], [6, 0, 0], [0, 9, 8]],
        secondCell1 = [[0, 7, 0], [1, 9, 5], [0, 0, 0]],
        thirdCell1 = [[0, 0, 0], [0, 0, 0], [0, 6, 0]],
        firstRow = [firstCell1, secondCell1, thirdCell1];

    var firstCell2 = [[8, 0, 0], [7, 0, 0], [4, 0, 0]],
        secondCell2 = [[0, 6, 0], [8, 0, 3], [0, 2, 0]],
        thirdCell2 = [[0, 0, 3], [0, 0, 1], [0, 0, 6]],
        secondRow = [firstCell2, secondCell2, thirdCell2];

    var firstCell3 = [[0, 6, 0], [0, 0, 0], [0, 0, 0]],
        secondCell3 = [[0, 0, 0], [4, 1, 9], [0, 8, 0]],
        thirdCell3 = [[2, 8, 0], [0, 0, 5], [0, 7, 9]],
        thirdRow = [firstCell3, secondCell3, thirdCell3];

    var gameEngine;

    var Board = function () {
        this.gameBoard = [firstRow, secondRow, thirdRow];
        gameEngine = new engine(this.gameBoard);
        gameEngine.init();
    };

    Board.prototype.init = function (container) {
        var table = $('<table></table>').addClass('sudoku-table');
        for (var i = 0; i < 3; i++) {
            var row = $('<tr></tr>').addClass('sudoku-row');
            for (var j = 0; j < 3; j++) {
                var cell = $('<td></td>').addClass('sudoku-cell');
                var cellTable = $('<table></table>').addClass('sudoku-sub-stable');
                for (var k = 0; k < 3; k++) {
                    var innerRow = $('<tr></tr>').addClass('sudoku-sub-row');
                    for (var l = 0; l < 3; l++) {
                        var userCell = $('<td></td>');
                        userCell.addClass('sudoku-input');

                        if (this.gameBoard[i][j][k][l] !== 0) {
                            userCell.text(this.gameBoard[i][j][k][l]);
                            userCell.addClass('sudoku-fix-input');
                        }
                        
                        userCell.attr("id", i.toString() + j.toString() + k.toString() + l.toString());
                        innerRow.append(userCell);
                    }
                    cellTable.append(innerRow);
                }
                cell.append(cellTable);
                row.append(cell);
            }
            table.append(row);
        }
        $(".board-container").append(table);

        // bind click event for all sudoku-input
        $(".sudoku-input").bind("click", function (event) {
            if ($(this).hasClass('sudoku-fix-input')) return;
            var id = $(this).attr("id");
            var text = $(this).text();
            var newValue;
            if (!text) {
                newValue = 1;
                $(this).text(newValue);
            } else {
                newValue = parseInt(text);
                newValue++;
                if (newValue === 10) {
                    $(this).text("");
                } else {
                    $(this).text(newValue);
                }
            }
            gameEngine.makeAMove(parseInt(id.charAt(0)), parseInt(id.charAt(1)),
                parseInt(id.charAt(2)), parseInt(id.charAt(3)),
                newValue, function (isAlreadyValid, isValid) {
                    console.log(isAlreadyValid + " " + isValid);
                    if ((isAlreadyValid && !isValid) || (!isAlreadyValid && isValid)) {
                        $(this).toggleClass("sudoku-invalid-input");
                    }
                
                }.bind(this));
        });
    }

    return Board;

});