const cells = document.querySelectorAll(".cell");
const displayPlayer1 = document.querySelector("#display-player1");
const displayPlayer2 = document.querySelector("#display-player2");

const Gameboard = (function () {
    function createField() {
        let symbol = " ";
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

const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");

const gameState = (function () {
    let activePlayer;
    function startGame() {
        displayPlayer1.textContent = player1.name;
        displayPlayer2.textContent = player2.name;
        activePlayer = player1;
    }

    function checkWin() {
        let winnerCheck = 0;
        function winnerCalc() {
            if (winnerCheck === 3) {
                console.log("Player 1 wins!");
                winnerCheck = 0;
                return;
            } else if (winnerCheck === -3) {
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

    function playRound(row, column) {
        Gameboard.setFieldSymbol(row, column, activePlayer.symbol);
        Gameboard.getBoard();
        displayRenderer.drawSymbols();
        checkWin();
        if (activePlayer === player1) {
            activePlayer = player2;
        } else {
            activePlayer = player1;
        }
    }
    return { startGame, playRound }
})();

const displayRenderer = (function () {
    function drawSymbols() {
        cells.forEach((element) => {
            element.textContent = Gameboard.getFieldSymbol(element.dataset.row, element.dataset.column);
        });
    }
    return { drawSymbols }
})();

/*----------------*/
/* Test functions */
/*----------------*/
function testPlay(row, column) {
    gameState.playRound(row, column);
    console.log(" ");
}

gameState.startGame();
console.log(Gameboard.getBoard());
testPlay(0, 1);
testPlay(1, 2);
testPlay(0, 2);
testPlay(0, 0);
testPlay(1, 1);
testPlay(2, 0);
testPlay(2, 1);