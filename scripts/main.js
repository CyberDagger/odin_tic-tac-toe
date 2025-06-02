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
        return `${(this.getFieldSymbol(0, 0))}|${(this.getFieldSymbol(0, 1))}|${(this.getFieldSymbol(0, 2))}
        -----
        ${(this.getFieldSymbol(1, 0))}|${(this.getFieldSymbol(1, 1))}|${(this.getFieldSymbol(1, 2))}
        -----
        ${(this.getFieldSymbol(2, 0))}|${(this.getFieldSymbol(2, 1))}|${(this.getFieldSymbol(2, 2))}`;
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
        activePlayer = player1;
    }
    function playRound(row, column) {
        Gameboard.setFieldSymbol(row, column, activePlayer.symbol);
        if (activePlayer === player1) {
            activePlayer = player2;
        } else {
            activePlayer = player1;
        }
    }
    return { startGame, playRound }
})();

/*----------------*/
/* Test functions */
/*----------------*/
function testPlay(row, column) {
    gameState.playRound(row, column);
    console.log(" ");
    console.log(Gameboard.getBoard());
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