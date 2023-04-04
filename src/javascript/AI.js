import { Player, PLAYER_TYPE, WINNING_COMBINATIONS } from "./Player";
export class AI extends Player {
  constructor(
    { score, name, marker, type } = {
      name: "AI",
      marker: "🤖",
      type: PLAYER_TYPE.AI,
      score: 0,
    }
  ) {
    super({ name, marker, type, score });
    this.comeFirst = false;
    this.winning = false;
    this.previousMove = 0;
    this.countTurn = 0;
  }

  selectCell(game) {
    return this.comeFirst
      ? this.#selectCellIfAIComeFirst(game)
      : this.#selectCellIfAIComeSecond(game);
  }
  /**
   * 1. always select one of corner cells if human player marked center else select center cell
   * 2. select the cell that can win the game OR
   * 3. block any potential winning combination made by human OR
   * 4. randomly select empty cell
   */
  #selectCellIfAIComeSecond(game) {
    const board = game.board;
    let huamnWinningCell = this.#checkEmptyPotentialWinningCombination(
      game.board,
      1
    );
    let aiWinningCell = this.#checkEmptyPotentialWinningCombination(
      game.board,
      2
    );
    if (aiWinningCell) return aiWinningCell;
    if (huamnWinningCell) return huamnWinningCell;

    if (Object.keys(board).length === 1) {
      if (board[5]) {
        return 1;
      } else {
        return 5;
      }
    }

    const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return cells.find((cell) => !board[cell]);
  }

  /**
   * In the first turn, the AI should always select the center cell.
   * If the human player selects a side cell, the AI should follow a pre-designed set of steps to win the game.
   * Otherwise, the AI should select the cell that can win the game.
   * Or block any potential winning combination made by human
   * Or randomly select an empty cell.
   */
  #selectCellIfAIComeFirst(game) {
    this.countTurn++;
    if (this.countTurn === 1) {
      this.previousMove = 5;
      return 5;
    }

    if (this.countTurn === 2) {
      const humanMove = parseInt(
        Object.keys(game.board).find((cell) => cell != 5)
      );
      if (humanMove === 2 || humanMove === 8) {
        this.winning = true;
        this.previousMove = 4;
        return 4;
      } else if (humanMove === 4 || humanMove === 6) {
        this.winning = true;
        this.previousMove = 2;
        return 2;
      }
    }

    let huamnWinningCell = this.#checkEmptyPotentialWinningCombination(
      game.board,
      1
    );
    let aiWinningCell = this.#checkEmptyPotentialWinningCombination(
      game.board,
      2
    );

    if (aiWinningCell) return aiWinningCell;
    if (huamnWinningCell) return huamnWinningCell;

    if (this.winning) {
      if (this.previousMove === 4) {
        return 7;
      } else if (this.previousMove === 2) {
        return 1;
      }
    }

    const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return cells.find((cell) => !game.board[cell]);
  }

  #checkEmptyPotentialWinningCombination(board, player) {
    let count = 0;
    let positionOfCell = 0;
    for (const combination of WINNING_COMBINATIONS) {
      combination.forEach((cell) => {
        board[cell] === player ? count++ : (positionOfCell = cell);
      });
      if (count === 2 && !board[positionOfCell]) return positionOfCell;
      count = 0;
    }
    return 0;
  }
}
