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

const board = { 1: 1, 2: 1, 3: 2, 4: 1 };
function checkPotienalWinningCombination(board, player) {
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

console.log(checkPotienalWinningCombination(board, 1));
