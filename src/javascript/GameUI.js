import Game from "./Game";

// Game UI Element
const board = document.querySelector(".board");
const resetGameButton = document.querySelector(".resetGameButton");
const message = document.querySelector(".message");
const scoreboardPlayers = document.querySelectorAll(".scoreboard__player");
const playerNameTextBox = scoreboardPlayers[0].children[0];
const playerScoreText = scoreboardPlayers[0].children[1];
const body = document.body;

// Game Assets
const game = new Game();
const playerData = JSON.parse(localStorage.getItem("player1"));
const clickSound = new Audio("./resources/click_sound.wav");
const resetGame = new Audio("");

// Board
function loadGame() {
  if (!playerData) return;
  playerNameTextBox.innerText = playerData.name;
  playerScoreText.innerText = playerData.score;
  console.log("load game ui", playerData);
  if (Object.keys(playerData.board)) {
    Object.entries(playerData.board).forEach(
      ([positionOfMarkedCell, player]) => {
        const cell = document.getElementById(`${positionOfMarkedCell}`);
        const markEle = document.createElement("div");
        markEle.innerText = player ? playerData.marker : "O";
        markEle.classList.add("board__cell-marked");
        cell.appendChild(markEle);
      }
    );
    message.innerText =
      "Turn: " + (playerData.whoseTurn ? playerData.name : "P2");
    body.style.backgroundImage = `url(${playerData.image})`;
  }
}
loadGame();
board.addEventListener("click", boardClickEventHandler);

function boardClickEventHandler(event) {
  const clickedCell = event.target;
  clickSound.play();
  // disable user to click on same cell twice
  if (clickedCell.childNodes.length) return;
  updateBoard(clickedCell);
  checkGameOver(clickedCell);
}

function clearBoard() {
  board.addEventListener("click", boardClickEventHandler);
  const markedCells = document.querySelectorAll(".board__cell-marked");
  markedCells.forEach((cell) => cell.remove());
  message.innerText = "";
}

function updateBoard(clickedCell) {
  const markEle = document.createElement("div");
  markEle.innerText = game.currentPlayerMarker();
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
    game.saveGameData(true);
  } else {
    message.innerText = "Turn: " + game.currentPlayerName();
  }
}

resetGameButton.addEventListener("click", (event) => {
  clearBoard();
  game.resetBoard();
});

// Customziation Form
const form = document.querySelector(".form");
const inputs = form.querySelectorAll("input");
const reader = new FileReader();
function updatePlayerCustomziation() {
  const name = inputs[0].value;
  const marker = inputs[1].value;
  const file = inputs[2].files[0];
  if (file) {
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imgData = reader.result;
      console.log({ file, imgData });
      game.customizePlayer(name, marker, imgData);
      body.style.backgroundImage = `url(${imgData})`;
      body.style.backgroundSize = "cover";
    };
  } else {
    game.customizePlayer(name, marker);
  }
  console.log(playerData);
  playerNameTextBox.innerText = name;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  updatePlayerCustomziation();
});
