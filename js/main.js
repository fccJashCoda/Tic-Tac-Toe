// The objective was to pollute the namespace as little as possible.
// This is a little big on the cheaty side, but this code does exactly that
// I will come back to it later once I get more familiar with IIFE and modules
// This spaghetti needs some stretching

// I'll also need to include the AI
// A tie should play a sound. A Tie fighter sound. Why? Because I can!

(() => {
    // DOM queries
    let player1Name = document.querySelector('#player1');
    let player2Name = document.querySelector('#player2');

    document.querySelector('#start-game').addEventListener('click', startGame);
    const btnPlayAgain = document.querySelector('#play-again');
    btnPlayAgain.addEventListener('click', playAgain);

    let player1;
    let player2;
    
    // Build and control the board
    const GameBoard = (function() {

            let gameOver = false;
            const gameboard = () => {
                            return [
                                ['','',''],
                                ['','',''],
                                ['','','']
                            ]
                        }   // end gameboard
                        
            function gameController (board) {
                for (let i = 0; i < board.length; i++) {
                    for (let j = 0; j < board[i].length; j++) {
                        let newDiv = document.createElement('div');
                        newDiv.classList = "gameboard-tile";
                        newDiv.onclick = () => {
                            if (gameOver) return;

                            let player = (player1.hasTurn) ? player1 : player2;
                            let bench  = (!player1.hasTurn) ? player1 : player2;
                            
                            if (board[i][j] === "") {
                                if (player.hasTurn) {
                                    board[i][j] = player.marker;
                                    newDiv.textContent = board[i][j];
                                }
                                gameOver = _checkWinner(board, player);
                                if (gameOver) {
                                    btnPlayAgain.style.display = "block";
                                    document.querySelector('#displayWinner').textContent = `${player.name} wins!`;
                                }
                            }

                            player.hasTurn = false;
                            bench.hasTurn = true;
                        }
                        document.querySelector('#gameboard').appendChild(newDiv);
                    }
                }
            } // end gameController

            function outputBoard (board) {
                for (let i = 0; i < board.lenght; i ++) {
                    return board[i];
                }
            }

            function resetGameOver () {
                gameOver = false;
            }
            return { gameboard, gameController, outputBoard, resetGameOver }
    })();

    // Build player objects
    const playerFactory = (name, marker, hasTurn=false) => {
        return { name, marker, hasTurn }
    }

    

    function startGame () {
        player1 = (player1Name.value != "") ? playerFactory(player1Name.value, 'x', true) : playerFactory("Player1", 'x', true)
        player2 = (player2Name.value != "") ? playerFactory(player2Name.value, 'o'): playerFactory("Player2",'o')
        document.querySelector('#gameLauncher').style.display = "none";
        document.querySelector('#gamearea').style.display = "flex";
        document.querySelector('#matchup').textContent = `${player1.name} vs ${player2.name}`;
        GameBoard.gameController(GameBoard.gameboard());
    }

    function playAgain () {
        document.querySelector('#displayWinner').textContent = "";
        document.querySelector('#gameboard').innerHTML = "";
        GameBoard.gameController(GameBoard.gameboard());
        GameBoard.resetGameOver();
        btnPlayAgain.style.display = "none";
    }

    function _checkWinner (board, player) {
        let winner;
        // horizontal 
        for (let i = 0; i < board.length; i++) {
            if (board[i][0] == player.marker) {
                if (board[i][0] == board[i][1] && board[i][0] == board[i][2]) {
                    return true
                }        
            }
        } // end horizontal check

        // verticals
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == player.marker) {
                    if (board[0][j] == board[1][j] && board[0][j] == board[2][j]){
                        return true
                    }
                }    
            }
        } // end vertical check

        // diagonals if board[0][0] == move
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[0][0] == player.marker) {
                    if (board[0][0] == board[1][1] && board[0][0] == board[2][2]){
                        return true
                    }
                }
                if (board[0][2] == player.marker) {
                    if (board[0][2] == board[1][1] && board[0][2] == board[2][0]){
                        return true
                    }
                }
            }
        }  // end diagonal check

        // if no winner has been found, check if we are at the end of the board
        if (!winner) winner = _checkTie(board);
    }

    function _checkTie (board) {
        let fails = 0;
        for (let i = 0; i < board.length; i++) {
            if (!board[i].includes('')) fails++
            if (fails === 3) {
                document.querySelector('#winnerDisplay').textContent = 'Tie!';
            }
        }
        return
    }

})();
