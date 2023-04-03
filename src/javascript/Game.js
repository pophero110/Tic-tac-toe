const GameState = {
  NOT_GAME_OVER: "not_game_over",
  WIN: "win",
  LOSE: "lose",
  TIE: "tie",
};

const WINNING_COMBINATIONS = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
class Game {
  constructor(player1, player2) {
    this.board = {};
    this.whoseTurn = 1; // 1 means player 1, 2 means player2
    this.gameState = GameState.NOT_GAME_OVER;
    this.player1 = player1;
    this.player2 = player2;
  }

  updateGameState() {
    if (this.#isTieGame()) this.gameState = GameState.TIE;
    if (this.#isCurrentPlayerWinning()) {
      this.gameState = this.whoseTurn === 1 ? GameState.WIN : GameState.LOSE;
      this.#updateScore();
    }

    this.#switchTurn();
    return this.gameState;
  }

  // save the player and position of marked cell to board
  updateBoard(positionOfMarkedCell) {
    this.board[positionOfMarkedCell] = this.whoseTurn;
  }

  resetBoard() {
    this.board = {};
    this.whoseTurn = 1;
    this.gameState = GameState.NOT_GAME_OVER;
  }

  currentTurnPlayer() {
    return this.whoseTurn === 1 ? this.player1 : this.player2;
  }

  nextTurnPlayer() {
    return this.whoseTurn === 1 ? this.player2 : this.player1;
  }

  findPlayerBywhoseTurn(whoseTurn) {
    return whoseTurn === 1 ? this.player1 : this.player2;
  }

  loadGameDate(gameData) {
    if (!gameData) throw new Error("Missing Game Data");
    const player1 = gameData.player1;
    const player2 = gameData.player2;
    this.player1 = player1;
    this.player2 = player2;
    this.whoseTurn = gameData.whoseTurn;
    if (Object.keys(gameData.board).length) this.board = gameData.board;
  }

  saveGameData() {
    localStorage.setItem(
      "gameData",
      JSON.stringify({
        board: this.gameState === GameState.NOT_GAME_OVER ? this.board : {},
        whoseTurn: this.whoseTurn,
        player1: this.player1,
        player2: this.player2,
      })
    );
    console.log("save game", JSON.parse(localStorage.getItem("gameData")));
  }

  updateWhoseTurn(whoseTurn) {
    this.whoseTurn = whoseTurn;
  }

  #updateScore() {
    if (this.gameState === GameState.WIN) this.player1.score += 1;
    if (this.gameState === GameState.LOSE) this.player2.score += 1;
  }

  #switchTurn() {
    this.whoseTurn = this.whoseTurn === 1 ? 2 : 1;
  }

  #isTieGame() {
    return Object.keys(this.board).length === 9;
  }

  #isCurrentPlayerWinning() {
    for (const combination of WINNING_COMBINATIONS) {
      let matchWinningCombination = combination.every(
        (cell) => this.board[cell] === this.whoseTurn
      );
      if (matchWinningCombination) return true;
    }
    return false;
  }
}

module.exports = {
  Game,
  GameState,
  WINNING_COMBINATIONS,
};
