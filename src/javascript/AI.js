import { Player, PLAYER_TYPE, WINNING_COMBINATIONS } from "./Player";
export class AI extends Player {
  constructor() {
    super({
      name: "Unbeatable AI",
      marker: "🤖",
      type: PLAYER_TYPE.AI,
      score: 0,
      image: null,
    });
    this.comeFirst = false;
  }

  selectCell(game) {
    return this.#selectCellIfAIComeFirst(game);
  }
  /**
   * 1. always select one of corner cell at first round
   * 2. block any potential winning combination made by human
   * 3. select the cell that can win the game
   * 4. randomly select empty cell
   */
  #selectCellIfAIComeFirst(game) {
    const cornerCells = [1, 3, 7, 9];
    const board = game.board;
    let selectedCell = 0;
    let humanPotentialCombinations = this.#checkPotentialWinningCombination(
      game.board,
      1
    );
    let aiPotentialCombinations = this.#checkPotentialWinningCombination(
      game.board,
      2
    );
    aiPotentialCombinations.forEach((cell) => {
      if (!board[cell]) selectedCell = cell;
    });
    if (selectedCell) return selectedCell;
    humanPotentialCombinations.forEach((cell) => {
      if (!board[cell]) selectedCell = cell;
    });
    if (selectedCell) return selectedCell;

    cornerCells.forEach((cell) => {
      if (!board[cell]) selectedCell = cell;
    });

    return selectedCell;
  }
  #checkPotentialWinningCombination(board, player) {
    let count = 0;
    let positionOfCell = 0;
    let cells = [];
    for (const combination of WINNING_COMBINATIONS) {
      combination.forEach((cell) => {
        board[cell] === player ? count++ : (positionOfCell = cell);
      });
      if (count === 2) cells.push(positionOfCell);
      count = 0;
    }
    return cells;
  }
}