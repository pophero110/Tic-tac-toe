import Game from "./Game";
const board = document.querySelector(".board");
const playGameButton = document.querySelector(".playGameButton");
const message = document.querySelector(".message");
const game = new Game();
console.log(game);

board.addEventListener("click", (event) => {
  console.log(event.target.id);
  const clickCell = event.target;
  const player = game.whoseTurn;
  const markEle = document.createElement("div");
  markEle.innerText = player;
  markEle.classList.add("markedCell");
  markEle.style.fontSize = "2rem";
  game.checkGameOver(clickCell.id);
  clickCell.appendChild(markEle);
});
playerGameButton.addEventListener("click", (event) => {
  board.chil;
});
