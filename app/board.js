define(["jquery"], function ($) {
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

    var Board = function () {
        this.gameBoard = [firstRow, secondRow, thirdRow];
    };

    Board.prototype = {
        init: function (container) {
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
                            }
                            userCell.bind("click", (function (board, i, j, k, l) {
                                return function () {
//                                    console.log(i, j, k, l);
                                    // check the cell
                                    for (var a=0; a<3; a++) {
                                        for (var b=0; b<3; b++) {
//                                            console.log(board[i][j][a][b]);
                                        }
                                    }
                                    
                                    for (var a=0; a<3; a++) {
                                        for (var b=0; b<3; b++) {
//                                            console.log(board[i][a][k][b]);
                                        }
                                    }
                                    
                                    for (var a=0; a<3; a++) {
                                        for (var b=0; b<3; b++) {
//                                            console.log(board[a][j][b][l]);
                                        }
                                    }
                                };
                            })(this.gameBoard, i, j, k, l));
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
        },
        generateNewBoard: function () {

        }
    };
    
    return new Board();

});