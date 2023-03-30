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
    this.player1WinCount = 0;
    this.player2WinCount = 0;
    this.whoseTurn = this.#player1;
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
    const messages = [`${this.whoseTurn} Won!`, "Tie Game", ""];
    this.#updateBoard(this.whoseTurn, positionOfMarkedCell);
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
    this.whoseTurn = this.#player1;
  }

  #isTieGame() {
    return Object.keys(this.#board).length === 9;
  }

  #isCurrentPlayerWinning() {
    for (const condition of this.#winningCondition) {
      let matchWinningCondition = condition.every(
        (cell) => this.#board[cell] === this.whoseTurn
      );
      if (matchWinningCondition) return true;
    }
    return false;
  }

  // save the player and position of marked cell to board
  #updateBoard(player, positionOfMarkedCell) {
    this.#board[positionOfMarkedCell] = player;
  }

  #switchTurn() {
    this.whoseTurn =
      this.whoseTurn === this.#player1 ? this.#player2 : this.#player1;
  }

  #updateScoreboard() {
    this.whoseTurn === this.#player1
      ? this.player1WinCount++
      : this.player2WinCount++;
  }
}

module.exports = Game;
