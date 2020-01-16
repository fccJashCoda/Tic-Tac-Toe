const Gameboard = (function() {
    const gameboard = [
                        ['','',''],
                        ['','',''],
                        ['','','']
                      ]
})();

/* 
victory conditions will be checked with arrays 

turn = player 1
move = x

function checkboard(move)
    horizontals 
    for each board 
        if board[i][0] == move
            if board[i][0] == board[i][1] && board[i][0] == board[i][2]
                player x wins

    vertical arrays
    for each board
        if board[0][i] == move
            if (board[0][i] == board[1][i] && board[0][i] == board[2][i])
                player 1 wins

    diagonals
    for each board
        if board[0][0] == move
            if (board[0][0] == board[1][1] && board[0][0] == board[2][2])
                player 1 wins
        if board[0][2] == move
            if (board[0][2] == board[1][1] && board[0][2] == board[2][0])
                player 1 wins

    finding a winning condition ends the game loop
*/