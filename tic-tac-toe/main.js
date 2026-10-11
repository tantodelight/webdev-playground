const gameBoard = (() => {
    const board = ['', '', '','', '', '','', '', ''];

    function placeMark(index, marker) {
        if (!Number.isInteger(index) || index < 0 || index >= board.length) {
            return 'invalid-index';
        }

        if (marker !== 'X' && marker !== 'O') {
            return 'invalid-marker';
        }

        if (board[index] !== '') {
            return 'occupied';
        }

        board[index] = marker;
        return 'placed';
    }

    function getBoard() {
        return [...board];
    }

    function reset() {
        board.fill('');
    }

    return {
        placeMark,
        getBoard,
        reset
    };

})();

const gameController = (() => {
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

    const players = [
        { name: 'Player 1', marker: 'X' },
        { name: 'Player 2', marker: 'O' }
    ];
    let activePlayer = players[0];
    let hasGameStarted = false;
    let isGameOver = false;
    let gameOutput = 'Enter player names and start the game.';

    function getState() {
        return {
            activePlayerName: activePlayer.name,
            activePlayerMarker: activePlayer.marker,
            hasGameStarted,
            isGameOver,
            gameOutput
        };
    }

    function startGame(playerOneName, playerTwoName) {
        players[0].name = playerOneName.trim() || 'Player 1';
        players[1].name = playerTwoName.trim() || 'Player 2';
        gameBoard.reset();
        activePlayer = players[0];
        hasGameStarted = true;
        isGameOver = false;
        gameOutput = `${activePlayer.name}'s turn (${activePlayer.marker}).`;
    }

    function checkWinner() {
        const boardSlots = gameBoard.getBoard();

        for (const combination of winningCombinations) {
            const [first, second, third] = combination;

            if (
                boardSlots[first] !== '' &&
                boardSlots[first] === boardSlots[second] &&
                boardSlots[second] === boardSlots[third]
            ) {
                return boardSlots[first];
            }
        }

        return null;
    }

    function checkDraw() {
        return gameBoard.getBoard().every((slot) => slot !== '');
    }

    function playRound(index) {
        if (!hasGameStarted) {
            gameOutput = 'Enter player names and start the game first.';
            return;
        }

        if (isGameOver) {
            gameOutput = "Game already ended.";
            return;
        }

        const result = gameBoard.placeMark(index, activePlayer.marker);

        if (result === 'invalid-index') {
            return;
        }

        if (result === 'invalid-marker') {
            return;
        }

        if (result === 'occupied') {
            gameOutput = 'Spot already taken.'
            return;
        }

        if (result !== 'placed') {
            gameOutput = 'Could not place a mark there.';
            return;
        }

        let player = checkWinner();
        if (player !== null) {
            const winner = players.find((candidate) => candidate.marker === player);
            gameOutput = `${winner.name} (${winner.marker}) wins!`;
            isGameOver = true;
            return;
        }
        
        let isDraw = checkDraw();
        if (isDraw) {
            gameOutput = "Game is a draw!";
            isGameOver = true;
            return;
        }
        
        // update player turn
        activePlayer = activePlayer === players[0] ? players[1] : players[0];

        gameOutput = `${activePlayer.name}'s turn (${activePlayer.marker}).`;
    }

    return {
        getState,
        startGame,
        playRound,
    };
})();

const displayController = (() => {
    const output = document.querySelector('.output');
    const boardElement = document.querySelector('.grid-container');
    const startButton = document.querySelector('.restart-btn');
    const playerXInput = document.querySelector('#player-x');
    const playerOInput = document.querySelector('#player-o');
    const slots = [...boardElement.children];

    function render() {
        const state = gameController.getState();
        output.textContent = state.gameOutput;

        startButton.textContent = state.hasGameStarted ? 'Restart Game' : 'Start Game';

        const boardSlots = gameBoard.getBoard();

        for (let i = 0; i < boardSlots.length; i++) {
            slots[i].textContent = boardSlots[i];
        }
    }

    boardElement.addEventListener('click', (event) => {
        const index = slots.indexOf(event.target);

        if (index === -1) {
            return;
        }

        gameController.playRound(index);
        render();
    });

    startButton.addEventListener('click', () => {
        gameController.startGame(playerXInput.value, playerOInput.value);
        render();
    });

    render();

    return { render };
})();
