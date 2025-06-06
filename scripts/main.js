/*--------------*/
/* DOM ELEMENTS */
/*--------------*/

// Game Board
const cells = document.querySelectorAll(".cell");
const displayPlayer1 = document.querySelector("#display-player1");
const displayPlayer2 = document.querySelector("#display-player2");
const textTurn = document.querySelector("#turn-message");
//Game Start Dialog
const dialogPlayerRegister = document.querySelector("#register-player");
const nameInputP1 = document.querySelector("#p1-name");
const nameInputP2 = document.querySelector("#p2-name");
const buttonNameInput = document.querySelector("#submit-pname");
// Game Over Dialog
const dialogGameOver = document.querySelector("#game-over");
const messageGameOver = document.querySelector("#gameover-message");
const buttonRestart = document.querySelector("#restart-game");

/*--------------*/
/* GAME OBJECTS */
/*--------------*/

// Game Board keeps and manipulates board state

const Gameboard = (function () {
    function createField() {
        let symbol = "";
        function setSymbol(a) {
            symbol = a;
        };
        function getSymbol() {
            return symbol;
        }
        return { setSymbol, getSymbol };
    }
    const fields = [
        [createField(), createField(), createField()],
        [createField(), createField(), createField()],
        [createField(), createField(), createField()]
    ];
    function setFieldSymbol(row, column, a) {
        fields[row][column].setSymbol(a);
    }
    function getFieldSymbol(row, column) {
        return fields[row][column].getSymbol();
    }
    function resetSymbols() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                fields[i][j].setSymbol("");
            }
        }
    }
    function getBoard() {
        console.log(`${(this.getFieldSymbol(0, 0))}|${(this.getFieldSymbol(0, 1))}|${(this.getFieldSymbol(0, 2))}`);
        console.log(`-----`);
        console.log(`${(this.getFieldSymbol(1, 0))}|${(this.getFieldSymbol(1, 1))}|${(this.getFieldSymbol(1, 2))}`);
        console.log(`-----`);
        console.log(`${(this.getFieldSymbol(2, 0))}|${(this.getFieldSymbol(2, 1))}|${(this.getFieldSymbol(2, 2))}`);
    }
    return { setFieldSymbol, getFieldSymbol, resetSymbols, getBoard };
})();

// Players object has data about the players saved inside it
// Needs refactoring, but game works properly now, so low priority

const Players =(function() {
    let player1;
    let player2;
    function setP1(p) {
        player1 = p;
    }
    function getP1() {
        return player1;
    }
    function setP2(p) {
        player2 = p;
    }
    function getP2() {
        return player2;
    }
    return { setP1, setP2, getP1, getP2 }
})();

function registerPlayers(name1, name2) {
    Players.setP1(createPlayer(name1, "./images/cross.svg"));
    Players.setP2(createPlayer(name2, "./images/circle.svg"));
}

function createPlayer(name, symbol) {
    return { name, symbol };
}

// Object used to render game objects on screen
// showPlayerNames unfinished and not in use.
// This logic is hardcoded in the event handler.
// Should refactor to compartmentalize functions

const displayRenderer = (function () {
    function drawSymbols() {
        cells.forEach((element) => {
            //element.textContent = Gameboard.getFieldSymbol(element.dataset.row, element.dataset.column);
            if (element.hasChildNodes()) {
                element.removeChild(element.firstChild);
            }
            let img = document.createElement("img");
            img.classList.add("play-symbol");
            img.setAttribute("src", Gameboard.getFieldSymbol(element.dataset.row, element.dataset.column));
            element.appendChild(img);
        });
    };
    function showPlayerNames() {
        displayPlayer1.textContent = Players
    };
    function showTurnMessage() {
        textTurn.textContent = `${gameState.getActivePlayer()}'s turn`;
    }
    return { drawSymbols, showPlayerNames, showTurnMessage }
})();

// Game State object progresses game flow
// winnerCheck can be optimized, but performance gain is negligible in a turn-based game, so low priority

const gameState = (function () {
    let activePlayer;
    function getActivePlayer() {
        return activePlayer.name;
    }

    function startGame() {
        displayPlayer1.textContent = Players.getP1().name;
        displayPlayer2.textContent = Players.getP2().name;
        activePlayer = Players.getP1();
        displayRenderer.showTurnMessage();
    }

    function checkWin() {
        let winnerCheck = 0;
        function winnerCalc() {
            if (winnerCheck === 3) {
                messageGameOver.textContent = `${Players.getP1().name} wins!`;
                dialogGameOver.showModal();
                console.log("Player 1 wins!");
                winnerCheck = 0;
                return;
            } else if (winnerCheck === -3) {
                messageGameOver.textContent = `${Players.getP2().name} wins!`;
                dialogGameOver.showModal();
                console.log("Player 2 wins!");
                winnerCheck = 0;
                return;
            } else {
                winnerCheck = 0;
            }
        }
        // Check horizontals
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (Gameboard.getFieldSymbol(i, j) === Players.getP1().symbol) {
                    winnerCheck++;
                } else if (Gameboard.getFieldSymbol(i, j) === Players.getP2().symbol) {
                    winnerCheck--;
                }
            }
            winnerCalc();
        }
        // Check verticals
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (Gameboard.getFieldSymbol(j, i) === Players.getP1().symbol) {
                    winnerCheck++;
                } else if (Gameboard.getFieldSymbol(j, i) === Players.getP2().symbol) {
                    winnerCheck--;
                }
            }
            winnerCalc();
        }
        // Check diagonals
        for (let i = 0; i < 3; i++) {
            if (Gameboard.getFieldSymbol(i, i) === Players.getP1().symbol) {
                winnerCheck++;
            } else if (Gameboard.getFieldSymbol(i, i) === Players.getP2().symbol) {
                winnerCheck--;
            }
        }
        winnerCalc();
        for (let i = 0; i < 3; i++) {
            if (Gameboard.getFieldSymbol(i, 2 - i) === Players.getP1().symbol) {
                winnerCheck++;
            } else if (Gameboard.getFieldSymbol(i, 2 - i) === Players.getP2().symbol) {
                winnerCheck--;
            }
        }
        winnerCalc();
    }

    function checkFull() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (Gameboard.getFieldSymbol(i, j) === "") {
                    return;
                }
            }
        }
        messageGameOver.textContent = "No contest!";
        dialogGameOver.showModal();
    }

    function playRound(row, column) {
        Gameboard.setFieldSymbol(row, column, activePlayer.symbol);
        displayRenderer.drawSymbols();
        checkWin();
        checkFull();
        if (activePlayer === Players.getP1()) {
            activePlayer = Players.getP2();
        } else {
            activePlayer = Players.getP1();
        }
        displayRenderer.showTurnMessage();
    }
    return { startGame, playRound, getActivePlayer }
})();

/*----------------*/
/* EVENT HANDLERS */
/*----------------*/

// Board cells have coordinates in HTML data properties
cells.forEach((element) => {
    element.addEventListener("click", () => {
        if (Gameboard.getFieldSymbol(element.dataset.row, element.dataset.column) === "") {
            gameState.playRound(element.dataset.row, element.dataset.column);
        }
    });
});

buttonNameInput.addEventListener("click", (event) => {
    event.preventDefault();
    registerPlayers(nameInputP1.value, nameInputP2.value);
    gameState.startGame();
    dialogPlayerRegister.close();
});

buttonRestart.addEventListener("click", () => {
    Gameboard.resetSymbols();
    displayRenderer.drawSymbols();
    dialogGameOver.close();
    dialogPlayerRegister.showModal();
})

/*------------------*/
/* STARTUP COMMANDS */
/*------------------*/

dialogPlayerRegister.showModal();

/*----------------*/
/* TEST FUNCTIONS */
/*----------------*/

// No test functions in use at the moment