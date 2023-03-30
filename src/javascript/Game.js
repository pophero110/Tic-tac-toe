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
  #player1Marker;
  #player2Marker;
  #player1Name;
  #player2Name;
  constructor() {
    this.#board = {};
    this.#player1Marker = "X";
    this.#player2Marker = "O";
    this.#player1Name = "Anonymous";
    this.#player2Name = "P2";
    this.player1WinCount = 0;
    this.player2WinCount = 0;
    this.whoseTurn = true; // true means player 1, false means player2
  }
  /**
   * Determines whether the game is over based on the marked cells on board.
   * Returns a message indicating the winner of the game, a tie, or that the game is not over.
   * If player 1 wins, the message will be "{player 1 name} won!".
   * If player 2 wins, the message will be "{player 2 name} won!".
   * If the game is tied, the message will be "Tie game".
   * Otherwise, an empty string is returned.
   * @param {number} positionOfMarkedCell - The position of the newly marked cell, must be a number between 1 and 9 (inclusive).
   * @returns {string} - A message indicating the winner of the game, a tie, or that the game is not over.
   */
  checkGameOver(positionOfMarkedCell) {
    const messages = [
      `${this.whoseTurn === 0 ? this.#player2Name : this.#player1Name} Won!`,
      "Tie Game",
      "",
    ];
    this.#updateBoard(positionOfMarkedCell);
    if (this.#isCurrentPlayerWinning()) {
      this.#updateScoreboard();
      return messages[0];
    }
    if (this.#isTieGame()) return messages[1];
    this.#switchTurn();
    return messages[2];
  }

  resetBoard() {
    this.#board = {};
    this.whoseTurn = true;
  }

  customizePlayer(name, marker) {
    this.#player1Marker = marker;
    this.#player1Name = name;
  }

  currentPlayerMarker() {
    return this.whoseTurn ? this.#player1Marker : this.#player2Marker;
  }

  #isTieGame() {
    return Object.keys(this.#board).length === 9;
  }

  #isCurrentPlayerWinning() {
    console.log(this.#board);
    for (const condition of this.#winningCondition) {
      let matchWinningCondition = condition.every(
        (cell) => this.#board[cell] === this.whoseTurn
      );
      if (matchWinningCondition) return true;
    }
    return false;
  }

  // save the player and position of marked cell to board
  #updateBoard(positionOfMarkedCell) {
    this.#board[positionOfMarkedCell] = this.whoseTurn;
  }

  #switchTurn() {
    this.whoseTurn = !this.whoseTurn;
  }

  #updateScoreboard() {
    this.whoseTurn ? this.player1WinCount++ : this.player2WinCount++;
  }
}

module.exports = Game;
