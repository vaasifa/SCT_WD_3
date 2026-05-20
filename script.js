// Game State Trackers and Core References
let boardState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

// Flat Array Index Mapping Matrix representing all 8 possible 3-in-a-row straight winning directions
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Document DOM Element Target Selectors Nodes
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const resetBtn = document.getElementById('resetBtn');
const restartBtn = document.getElementById('restartBtn');
const overlay = document.getElementById('overlay');
const winnerText = document.getElementById('winnerText');

// Function to handle Cell Interactions
function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    // Validation Guard check: Ensure target cell block is blank and state lock is active
    if (boardState[clickedCellIndex] !== "" || !isGameActive) {
        return;
    }

    // Process Move Action
    updateCell(clickedCell, clickedCellIndex);
    checkForWinner();
}

// Function to Update data mappings and rendering states on board array allocations
function updateCell(cellElement, index) {
    boardState[index] = currentPlayer;
    cellElement.textContent = currentPlayer;
    cellElement.classList.add(currentPlayer);
}

// Function to change Turn Player states configuration references
function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    
    // Inject respective styled classes to matching target layout nodes seamlessly
    const turnClass = currentPlayer.toLowerCase() + "-turn";
    statusText.innerHTML = `Player <span class="${turnClass}">${currentPlayer}</span>'s Turn`;
}

// Function to validate and evaluate results against matrix lookup indices
function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = boardState[condition[0]];
        const cellB = boardState[condition[1]];
        const cellC = boardState[condition[2]];

        // Continue parsing if any check tracks empty nodes inside condition mapping index paths
        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }

        // Win Condition confirmation matched flag match
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        triggerEndGame(true);
        return;
    }

    // Draw Evaluation check loop tracking across missing empty fields allocations
    const isDraw = !boardState.includes("");
    if (isDraw) {
        triggerEndGame(false);
        return;
    }

    // Switch turns safely if execution thresholds hold empty spaces
    changePlayer();
}

// Function to manage UI changes upon hitting terminal states
function triggerEndGame(hasWinner) {
    isGameActive = false;
    
    if (hasWinner) {
        winnerText.innerHTML = `Player <span class="${currentPlayer.toLowerCase()}-turn">${currentPlayer}</span> Wins!`;
    } else {
        winnerText.innerHTML = `<span style="color: #8fa0dd;">It's a Draw!</span>`;
    }
    
    // Smooth fade-in overlay launch
    overlay.classList.add('active');
}

// Function to clear states back to foundational default setup parameters configuration settings
function resetGameEngine() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    
    statusText.innerHTML = `Player <span class="x-turn">X</span>'s Turn`;
    overlay.classList.remove('active');

    // Clean structural styling elements configurations loops targeting components
    cells.forEach(cell => {
        cell.textContent = "";
        cell.className = "cell"; 
    });
}

// Setup Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGameEngine);
restartBtn.addEventListener('click', resetGameEngine);