const ludoBoard = document.getElementById('ludoBoard');
const playerCountSelect = document.getElementById('playerCount');
const startGameButton = document.getElementById('startGame');
const resetButton = document.getElementById('resetButton');
const status = document.getElementById('status');

const colors = ['lime', 'magenta', 'cyan', 'maroon'];
let currentPlayerCount = 2;

const createBoard = () => {
    ludoBoard.innerHTML = '';
    for (let i = 0; i < 225; i++) { // 15x15 grid
        const cell = document.createElement('div');
        cell.classList.add('cell');
        ludoBoard.appendChild(cell);
    }
};

const startGame = () => {
    currentPlayerCount = parseInt(playerCountSelect.value);
    const colorScheme = colors.slice(0, currentPlayerCount);

    // Remove any existing player pieces
    document.querySelectorAll('.piece').forEach(piece => piece.remove());

    // Add player pieces
    const cells = document.querySelectorAll('.cell');
    colorScheme.forEach((color, index) => {
        for (let i = 0; i < 4; i++) { // Each player has 4 pieces
            const piece = document.createElement('div');
            piece.classList.add('piece');
            piece.style.backgroundColor = color;
            piece.style.left = `${(index * 40 + i * 10) % 600}px`; // Simple positioning for demonstration
            piece.style.top = `${(index * 40 + i * 10) % 600}px`;
            ludoBoard.appendChild(piece);
        }
    });

    status.textContent = `Game started with ${currentPlayerCount} players!`;
};

const resetGame = () => {
    createBoard();
    status.textContent = 'Select the number of players and start the game.';
};

createBoard(); // Create the initial empty board

startGameButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
