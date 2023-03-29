import Game from "./Game";
const board = document.querySelector(".board");
const playGameButton = document.querySelector(".playGameButton");
const message = document.querySelector(".message");
const game = new Game();

function boardClickEventHandler(event) {
  const clickedCell = event.target;
  if (clickedCell.childNodes.length) return;
  const markEle = document.createElement("div");
  markEle.innerText = game.whoseTurn;
  markEle.classList.add("board__cell-marked");
  clickedCell.appendChild(markEle);
  let gameOverMessage = game.checkGameOver(clickedCell.id);
  if (gameOverMessage) {
    message.innerText = gameOverMessage;
    board.removeEventListener("click", boardClickEventHandler);
  } else {
    message.innerText = "Turn: " + game.whoseTurn;
  }
}
function clearGameState() {
  const markedCells = document.querySelectorAll(".board__cell-marked");
  markedCells.forEach((cell) => cell.remove());
  message.innerText = "";
}

playGameButton.addEventListener("click", (event) => {
  board.addEventListener("click", boardClickEventHandler);
  clearGameState();
  game.startNewGame();
});
