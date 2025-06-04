const dialogPlayerRegister = document.querySelector("#register-player");
const dialogGameOver = document.querySelector("#game-over");

const cells = document.querySelectorAll(".cell");
const displayPlayer1 = document.querySelector("#display-player1");
const displayPlayer2 = document.querySelector("#display-player2");

const nameInputP1 = document.querySelector("#p1-name");
const nameInputP2 = document.querySelector("#p2-name");
const buttonNameInput = document.querySelector("#submit-pname");

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
    function getBoard() {
        console.log(`${(this.getFieldSymbol(0, 0))}|${(this.getFieldSymbol(0, 1))}|${(this.getFieldSymbol(0, 2))}`);
        console.log(`-----`);
        console.log(`${(this.getFieldSymbol(1, 0))}|${(this.getFieldSymbol(1, 1))}|${(this.getFieldSymbol(1, 2))}`);
        console.log(`-----`);
        console.log(`${(this.getFieldSymbol(2, 0))}|${(this.getFieldSymbol(2, 1))}|${(this.getFieldSymbol(2, 2))}`);
    }
    return { setFieldSymbol, getFieldSymbol, getBoard };
})();

function createPlayer(name, symbol) {
    return { name, symbol };
}

//const player1 = createPlayer("Player 1", "X");
//const player2 = createPlayer("Player 2", "O");

const gameState = (function () {
    let activePlayer;
    function startGame() {
        displayPlayer1.textContent = Players.getP1().name;
        displayPlayer2.textContent = Players.getP2().name;
        activePlayer = Players.getP1();
    }

    function checkWin() {
        let winnerCheck = 0;
        function winnerCalc() {
            if (winnerCheck === 3) {
                dialogGameOver.textContent = `${Players.getP1().name} wins!`;
                dialogGameOver.showModal();
                console.log("Player 1 wins!");
                winnerCheck = 0;
                return;
            } else if (winnerCheck === -3) {
                dialogGameOver.textContent = `${Players.getP1().name} wins!`;
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
                if (Gameboard.getFieldSymbol(i, j) === "X") {
                    winnerCheck++;
                } else if (Gameboard.getFieldSymbol(i, j) === "O") {
                    winnerCheck--;
                }
            }
            winnerCalc();
        }
        // Check verticals
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (Gameboard.getFieldSymbol(j, i) === "X") {
                    winnerCheck++;
                } else if (Gameboard.getFieldSymbol(j, i) === "O") {
                    winnerCheck--;
                }
            }
            winnerCalc();
        }
        // Check diagonals
        for (let i = 0; i < 3; i++) {
            if (Gameboard.getFieldSymbol(i, i) === "X") {
                winnerCheck++;
            } else if (Gameboard.getFieldSymbol(i, i) === "O") {
                winnerCheck--;
            }
        }
        winnerCalc();
        for (let i = 0; i < 3; i++) {
            if (Gameboard.getFieldSymbol(i, 2 - i) === "X") {
                winnerCheck++;
            } else if (Gameboard.getFieldSymbol(i, 2 - i) === "O") {
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
        dialogGameOver.textContent = "No contest!";
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
    }
    return { startGame, playRound }
})();

const displayRenderer = (function () {
    function drawSymbols() {
        cells.forEach((element) => {
            element.textContent = Gameboard.getFieldSymbol(element.dataset.row, element.dataset.column);
        });
    };
    function showPlayerNames() {
        displayPlayer1.textContent = Players
    }
    return { drawSymbols, showPlayerNames }
})();

cells.forEach((element) => {
    element.addEventListener("click", () => {
        if (Gameboard.getFieldSymbol(element.dataset.row, element.dataset.column) === "") {
            gameState.playRound(element.dataset.row, element.dataset.column);
        }
    });
});

// Working on this shit

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
    Players.setP1(createPlayer(name1, "X"));
    Players.setP2(createPlayer(name2, "O"));
}

buttonNameInput.addEventListener("click", (event) => {
    event.preventDefault();
    registerPlayers(nameInputP1.value, nameInputP2.value);
    gameState.startGame();
    dialogPlayerRegister.close();
});

dialogPlayerRegister.showModal();

/*----------------*/
/* Test functions */
/*----------------*/
/*
function testPlay(row, column) {
    gameState.playRound(row, column);
    console.log(" ");
}

gameState.startGame();
//console.log(Gameboard.getBoard());

testPlay(0, 1);
testPlay(1, 2);
testPlay(0, 2);
testPlay(0, 0);
testPlay(1, 1);
testPlay(2, 0);
testPlay(2, 1);
*/