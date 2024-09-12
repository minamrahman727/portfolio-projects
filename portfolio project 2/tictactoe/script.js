const board = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let gameActive = true;

const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    return gameBoard.includes(null) ? null : 'Tie';
};

const handleClick = (e) => {
    const index = e.target.dataset.index;
    if (gameBoard[index] || !gameActive) return;

    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        gameActive = false;
        status.textContent = winner === 'Tie' ? "It's a Tie!" : `${winner} Wins!`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
};

const resetGame = () => {
    gameBoard.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    status.textContent = "Player X's turn";
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
