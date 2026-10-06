const board = document.querySelector('.grid-container');
const restartButton = document.querySelector('.restart-btn');

board.addEventListener('click', (event) => {
    const clickedCell = event.target;
    const cells = [...board.children];

    const index = cells.indexOf(clickedCell);

    if (index !== -1) {
        playRound(index);
    }
});

restartButton.addEventListener('click', () => {
    resetGame();
});

const gameboard = [
'', '', '',
'', '', '',
'', '', ''
];

const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Left diagonal
  [2, 4, 6]  // Right diagonal
];

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
      
    if (
        gameboard[a] !== "" &&
        gameboard[a] === gameboard[b] &&
        gameboard[b] === gameboard[c]
        )
        {
            return gameboard[a];
        }
    }
    return null;
}

function checkDraw() {
    let count = 0;
    for (let i = 0; i < gameboard.length; i++) {
        if (gameboard[i] !== '') count++;
    }
    if (count === 9) {
        return true;
    }
    
    return false;
}

let currentPlayer = "X";
let isGameOver = false;
let gameOutput = `Player ${currentPlayer}'s turn.`;

function resetGame() {
    for (let i = 0; i < gameboard.length; i++) {
        gameboard[i] = '';
    }

    currentPlayer = 'X';
    isGameOver = false;
    gameOutput = `Player ${currentPlayer}'s turn.`;
    displayGame();
}

// print board
function printBoard() {
    for (let i = 0; i < gameboard.length; i += 3) {
        console.log(gameboard.slice(i, i + 3));
    }
}

function playRound(index) {
    if (isGameOver) {
        gameOutput = "Game Over! Restart ↻";
        displayGame();
        return;
    }
  
    if (gameboard[index] === "") {
        
        gameboard[index] = currentPlayer;
        
        let player = checkWinner();
        if (player !== null) {
            gameOutput = `Player ${player} is the winner.`;
            isGameOver = true;
            displayGame();
            return;
        }
        
        let isDraw = checkDraw();
        if (isDraw) {
            gameOutput = "Game is a draw!";
            isGameOver = true;
            displayGame();
            return;
        }
        
        // update player turn
        if (currentPlayer === "X") {
            currentPlayer = "O";
        } else {
            currentPlayer = "X";
        }

        gameOutput = `Player ${currentPlayer}'s turn.`;
        displayGame();

    } else {
        gameOutput = `Spot already taken. Please choose another spot.`;
        displayGame();
        return;
    }
    
}

function displayGame() {
    const output = document.querySelector('.output');
    output.textContent = gameOutput;

    restartButton.style.display = isGameOver ? 'block' : 'none';
    restartButton.textContent = 'Game Over! Restart ↻';

    const slots = [
        document.querySelector('.slot1'),
        document.querySelector('.slot2'),
        document.querySelector('.slot3'),
        document.querySelector('.slot4'),
        document.querySelector('.slot5'),
        document.querySelector('.slot6'),
        document.querySelector('.slot7'),
        document.querySelector('.slot8'),
        document.querySelector('.slot9')
    ];

    for (let i = 0; i < gameboard.length; i++) {
        slots[i].textContent = gameboard[i];
    }
    
}

displayGame();
