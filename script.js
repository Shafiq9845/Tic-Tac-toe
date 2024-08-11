let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'M'; // Start with "M"
let isGameActive = true;
let mode = '';

const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('reset');
const backButton = document.getElementById('back');
const modeSelection = document.getElementById('modeSelection');
const playerModeButton = document.getElementById('playerMode');
const computerModeButton = document.getElementById('computerMode');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < 8; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDisplay.textContent = `It's a draw!`;
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'M' ? 'U' : 'M';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    updateBoard(clickedCell, clickedCellIndex);
    handleResultValidation();

    if (mode === 'computer' && currentPlayer === 'U' && isGameActive) {
        setTimeout(handleComputerMove, 500);
    }
}

function updateBoard(clickedCell, index) {
    board[index] = currentPlayer;
    clickedCell.textContent = currentPlayer;
}

function handleComputerMove() {
    let availableCells = [];
    board.forEach((cell, index) => {
        if (cell === '') {
            availableCells.push(index);
        }
    });

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    const computerCell = document.querySelector(`.cell[data-index="${randomIndex}"]`);

    updateBoard(computerCell, randomIndex);
    handleResultValidation();
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'M';
    statusDisplay.textContent = `Player M's turn`;

    cells.forEach(cell => cell.textContent = '');
}

function startGame(selectedMode) {
    mode = selectedMode;
    gameBoard.classList.remove('hidden');
    resetButton.classList.remove('hidden');
    backButton.classList.remove('hidden');
    modeSelection.classList.add('hidden');
    resetGame();
}

function goBackToModeSelection() {
    modeSelection.classList.remove('hidden');
    gameBoard.classList.add('hidden');
    resetButton.classList.add('hidden');
    backButton.classList.add('hidden');
    statusDisplay.textContent = '';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
backButton.addEventListener('click', goBackToModeSelection);
playerModeButton.addEventListener('click', () => startGame('player'));
computerModeButton.addEventListener('click', () => startGame('computer'));
