const GameState = {
  NOT_GAME_OVER: "not_game_over",
  WIN: "win",
  LOSE: "lose",
  TIE: "tie",
};
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
  #whoseTurn;
  constructor(player1, player2) {
    this.#board = {};
    this.#whoseTurn = 1; // 1 means player 1, 2 means player2
    this.gameState = GameState.NOT_GAME_OVER;
    this.player1 = player1;
    this.player2 = player2;
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
  updateGameState() {
    if (this.#isTieGame()) this.gameState = GameState.TIE;
    if (this.#isCurrentPlayerWinning()) {
      this.gameState = this.#whoseTurn === 1 ? GameState.WIN : GameState.LOSE;
      this.#updateScore();
    }

    this.#switchTurn();
    this.#saveGameData();
    return this.gameState;
  }

  // save the player and position of marked cell to board
  updateBoard(positionOfMarkedCell) {
    this.#board[positionOfMarkedCell] = this.#whoseTurn;
  }

  resetBoard() {
    this.#board = {};
    this.#whoseTurn = 1;
    this.gameState = GameState.NOT_GAME_OVER;
    this.#saveGameData();
  }

  currentTurnPlayer() {
    return this.#whoseTurn === 1 ? this.player1 : this.player2;
  }

  nextTurnPlayer() {
    return this.#whoseTurn === 1 ? this.player2 : this.player1;
  }

  findPlayerBywhoseTurn(whoseTurn) {
    return whoseTurn === 1 ? this.player1 : this.player2;
  }

  #saveGameData(image = null) {
    localStorage.setItem(
      "gameData",
      JSON.stringify({
        board: this.gameState === GameState.NOT_GAME_OVER ? this.#board : {},
        whoseTurn: this.#whoseTurn,
        image: image,
        player1: this.player1,
        player2: this.player2,
      })
    );
    console.log("save game", JSON.parse(localStorage.getItem("gameData")));
  }

  loadGameDate() {
    const gameData = JSON.parse(localStorage.getItem("gameData"));
    console.log("load game", gameData);
    if (!gameData) return;
    console.log("load", this.player1, this.player2);
    const player1 = gameData.player1;
    const player2 = gameData.player2;
    this.player1.update({ ...player1 });
    this.player2.update({ ...player2 });
    this.#whoseTurn = gameData.whoseTurn;
    if (Object.keys(gameData.board)) this.#board = gameData.board;
  }

  #updateScore() {
    if (this.gameState === GameState.WIN) this.player1.score += 1;
    if (this.gameState === GameState.LOSE) this.player2.score += 1;
    console.log("updateScore", this.player1, this.player2);
  }

  #switchTurn() {
    this.#whoseTurn = this.#whoseTurn === 1 ? 2 : 1;
  }

  #isTieGame() {
    return Object.keys(this.#board).length === 9;
  }

  #isCurrentPlayerWinning() {
    for (const condition of this.#winningCondition) {
      let matchWinningCondition = condition.every(
        (cell) => this.#board[cell] === this.#whoseTurn
      );
      if (matchWinningCondition) return true;
    }
    return false;
  }
}

module.exports = {
  Game,
  GameState,
};
