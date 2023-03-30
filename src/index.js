import Game from "./Game";
const board = document.querySelector(".board");
const playGameButton = document.querySelector(".playGameButton");
const message = document.querySelector(".message");
const scoreboardPlayers = document.querySelectorAll(".scoreboard__player");
const game = new Game();

function clearBoard() {
  board.addEventListener("click", boardClickEventHandler);
  const markedCells = document.querySelectorAll(".board__cell-marked");
  markedCells.forEach((cell) => cell.remove());
  message.innerText = "";
}

function updateBoard(clickedCell) {
  const markEle = document.createElement("div");
  markEle.innerText = game.whoseTurn;
  markEle.classList.add("board__cell-marked");
  clickedCell.appendChild(markEle);
}
function updateScoreboard() {
  scoreboardPlayers.forEach((playerEle, index) => {
    playerEle.children[1].innerText =
      index === 0 ? game.player1WinCount : game.player2WinCount;
  });
}

function checkGameOver(clickedCell) {
  let gameOverMessage = game.checkGameOver(clickedCell.id);
  if (gameOverMessage) {
    message.innerText = gameOverMessage;
    board.removeEventListener("click", boardClickEventHandler);
    updateScoreboard();
  } else {
    message.innerText = "Turn: " + game.whoseTurn;
  }
}
function boardClickEventHandler(event) {
  const clickedCell = event.target;
  // disable user to click on same cell twice
  if (clickedCell.childNodes.length) return;
  updateBoard(clickedCell);
  checkGameOver(clickedCell);
}

playGameButton.addEventListener("click", (event) => {
  clearBoard();
  game.startNewGame();
});
