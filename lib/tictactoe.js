class TicTacToe {
    constructor(playerX = 'x', playerO = 'o') {
        this.playerX = playerX;
        this.playerO = playerO;
        this._currentTurn = false; // false = X's turn, true = O's turn
        this._x = 0; // Bitboard for X
        this._o = 0; // Bitboard for O
        this.turns = 0; // Number of turns taken
    }

    get board() {
        return this._x | this._o;
    }

    get currentTurn() {
        return this._currentTurn ? this.playerO : this.playerX;
    }

    get winner() {
        const winningPatterns = [
            0b111000000, // Top row
            0b000111000, // Middle row
            0b000000111, // Bottom row
            0b100100100, // Left column
            0b010010010, // Middle column
            0b001001001, // Right column
            0b100010001, // Diagonal TL-BR
            0b001010100  // Diagonal TR-BL
        ];

        for (let pattern of winningPatterns) {
            if ((this._x & pattern) === pattern) return this.playerX;
            if ((this._o & pattern) === pattern) return this.playerO;
        }
        return null;
    }

    turn(player, pos) {
        // If game over or invalid position
        if (this.winner || pos < 0 || pos > 8) return -1;

        // If position already taken
        if ((this._x | this._o) & (1 << pos)) return 0;

        // Place piece
        const value = 1 << pos;
        if (this._currentTurn) {
            this._o |= value;
        } else {
            this._x |= value;
        }

        this._currentTurn = !this._currentTurn;
        this.turns++;
        return 1;
    }

    render() {
        return [...Array(9)].map((_, i) => {
            const bit = 1 << i;
            if (this._x & bit) return 'X';
            if (this._o & bit) return 'O';
            return i + 1;
        });
    }
}

module.exports = TicTacToe;
