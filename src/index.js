import Game from "./Game";
const board = document.querySelector(".board");
const playGameButton = document.querySelector(".playGameButton");
const message = document.querySelector(".message");
const game = new Game();

function boardClickEventHandler(event) {
  const clickCell = event.target;
  const markEle = document.createElement("div");
  markEle.innerText = game.whoseTurn;
  markEle.classList.add("board__cell-marked");
  clickCell.appendChild(markEle);
  let gameOverMessage = game.checkGameOver(clickCell.id);
  if (gameOverMessage) {
    message.innerText = gameOverMessage;
  } else {
    message.innerText = "Turn: " + game.whoseTurn;
  }
}
board.addEventListener("click", boardClickEventHandler);

playGameButton.addEventListener("click", (event) => {
  const markedCells = document.querySelectorAll(".board__cell-marked");
  markedCells.forEach((cell) => cell.remove());
  game.startNewGame();
});
