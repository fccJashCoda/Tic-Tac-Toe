// skipping modules and factory functions to get the game logic down, will refactor later

// DOM queries
let player1Name = document.querySelector('#player1');
let player2Name = document.querySelector('#player2');

document.querySelector('button').addEventListener('click', startGame)

// Build an empty board
const GameBoard = (function() {
        const gameboard = () => {
                        return [
                            ['','',''],
                            ['','',''],
                            ['','','']
                        ]
                    }

        function renderBoard (board) {
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    let newDiv = document.createElement('div');
                    newDiv.classList = "gameboard-tile";
                    newDiv.onclick = () => {
                        if (board[i][j] === "") {
                            (player1.hasTurn) ? player1.hasTurn = false : player1.hasTurn = true
                            if (player1.hasTurn) {
                                board[i][j] = player1.marker
                                newDiv.textContent = board[i][j]
                            } else {
                                board[i][j] = player2.marker
                                newDiv.textContent = board[i][j]
                            }
                            checkWinner(board, player1)
                        }
                    }
                    document.querySelector('#gameboard').appendChild(newDiv)
                }
            }
        }
        return { gameboard, renderBoard }
})();



// Build player objects
const playerFactory = (name, marker, hasTurn=false) => {
    return { name, marker, hasTurn }
}

let player1 = (player1Name.value != "") ? playerFactory(player1Name.value, 'x') : playerFactory("Player1", 'x')
let player2 = (player2Name.value != "") ? playerFactory(player2Name.value, 'o'): playerFactory("Player2",'o')

function startGame () {
    document.querySelector('#gameboard').innerHTML = ""
    GameBoard.renderBoard(GameBoard.gameboard())
}

function checkWinner (board, player) {
    let winner;
    // horizontal 
    for (let i = 0; i < board.length; i++) {
        if (board[i][0] == player.marker) {
            if (board[i][0] == board[i][1] && board[i][0] == board[i][2]) {
                console.log('horizontal')
                console.log(player.name + ' wins!')
                return winner = player.name
            }        
        }
    }

    // verticals
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == player.marker) {
                if (board[0][j] == board[1][j] && board[0][j] == board[2][j]){
                    console.log(board[0][i] == board[1][i] && board[0][i] == board[2][i])
                    console.log('vertical')
                    console.log(player.name + ' wins!')
                    return winner = player.name
                }
            }    
        }
    }

    // diagonals if board[0][0] == move
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[0][0] == player.marker) {
                if (board[0][0] == board[1][1] && board[0][0] == board[2][2]){
                    console.log('diagonal')
                    console.log(player.name + ' wins!')
                    return winner = player.name
                }
            }
            if (board[0][2] == player.marker) {
                if (board[0][2] == board[1][1] && board[0][2] == board[2][0]){
                    console.log('diagonal')
                    console.log(player.name + ' wins!')
                    return winner = player.name
                }
            }
        }
    }
    if (!winner) checkTie(board)
}

function checkTie (board) {
    let counter = 0;
    for (let i = 0; i < board.length; i++) {
        if (!board[i].includes('')) counter++
        if (counter === 3) console.log("It's a tie!")
    }
}


const GameLoop = (function(player1, player2) {
 
})();
