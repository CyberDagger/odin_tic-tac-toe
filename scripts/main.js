const Board = (function () {
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

console.log(Board.getBoard());
Board.setFieldSymbol(0, 1, "X");
console.log(" ");
console.log(Board.getBoard());
Board.setFieldSymbol(1, 2, "O");
console.log(" ");
console.log(Board.getBoard());