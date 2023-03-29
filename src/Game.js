class Game {
  #winningCondition = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  #board;
  #player1;
  #player2;
  constructor() {
    this.#board = {};
    this.#player1 = "X";
    this.#player2 = "O";
    this.whoseTurn = this.#player1;
  }
  checkGameOver(clickedCell) {
    let gameOver = false;
    // save the player and position of clicked cell to board
    this.#board[clickedCell] = this.whoseTurn;
    console.log(this.#board);
    // check if game is over
    if (this.whoseTurn === this.#player1) {
      // check if player1 win
      for (const condition of this.#winningCondition) {
        gameOver = condition.every(
          (cell) => this.#board[cell] === this.#player1
        );
        if (gameOver) return this.#player1 + " Won!";
      }
    } else {
      // check if player2 win
      for (const condition of this.#winningCondition) {
        gameOver = condition.every(
          (cell) => this.#board[cell] === this.#player2
        );
        if (gameOver) return this.#player2 + " Won!";
      }
    }
    // check if it is a tie by checking number of marked cells
    Object.keys(this.#board).length === 9 ? (gameOver = true) : null;
    if (gameOver) return "Tie Game";
    // change turn
    this.whoseTurn =
      this.whoseTurn === this.#player1 ? this.#player2 : this.#player1;
    return gameOver;
  }
  startNewGame() {
    this.#board = {};
  }
}

module.exports = Game;
