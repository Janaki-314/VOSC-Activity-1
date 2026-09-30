const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(function(cell) {
    cell.addEventListener("click", playGame);
});

function playGame() {
    if (this.textContent !== "" || !gameActive) {
        return;
    }

    this.textContent = currentPlayer;
    checkWinner();
}

function checkWinner() {
    for (let pattern of winningPatterns) {
        let a = cells[pattern[0]].textContent;
        let b = cells[pattern[1]].textContent;
        let c = cells[pattern[2]].textContent;

        if (a !== "" && a === b && b === c) {
            statusText.textContent = "Player " + currentPlayer + " Wins!";
            gameActive = false;
            return;
        }
    }

    let draw = true;

    cells.forEach(function(cell) {
        if (cell.textContent === "") {
            draw = false;
        }
    });

    if (draw) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }

    statusText.textContent = "Player " + currentPlayer + "'s Turn";
}

restartButton.addEventListener("click", restartGame);

function restartGame() {
    cells.forEach(function(cell) {
        cell.textContent = "";
    });

    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's Turn";
}
