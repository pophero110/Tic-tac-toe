import { Game, GameState } from "./Game";
import Player from "./Player";
// Game UI Element
const board = document.querySelector(".board");
const resetGameButton = document.querySelector(".resetGameButton");
const message = document.querySelector(".message");
const scoreboardPlayers = document.querySelectorAll(".scoreboard__player");
const playerNameTextBox = scoreboardPlayers[0].children[0];
const playerScoreText = scoreboardPlayers[0].children[1];
const body = document.body;

// Game Assets
const player1 = new Player("You", "X", "human");
const aiPlayer = new Player();
const game = new Game(player1, aiPlayer);
const gameData = JSON.parse(localStorage.getItem("gameData"));
const clickSound = new Audio("./resources/click.wav");
const resetGameSound = new Audio("./resources/reset_game.wav");
const winSound = new Audio("./resources/win.wav");
const loseSound = new Audio("./resources/lose.wav");
const tieGameSound = new Audio("./resources/tie_game.wav");

// Board
function loadGameData() {
  console.log("load game ui", gameData);
  if (!gameData) return;
  const player1 = gameData.player1;
  const player2 = gameData.player2;
  if (Object.keys(gameData.board)) {
    Object.entries(gameData.board).forEach(([positionOfMarkedCell, player]) => {
      const cell = document.getElementById(`${positionOfMarkedCell}`);
      updateBoard(cell);
    });
    message.innerText =
      "Turn: " + (gameData.whoseTurn ? player1.name : player2.name);
    body.style.backgroundImage = `url(${gameData.image})`;
  }
}

function boardClickEventHandler(event) {
  const clickedCell = event.target;
  // disable user to click on same cell twice or to click any cell after game is over
  if (
    clickedCell.childNodes.length ||
    game.gameState !== GameState.NOT_GAME_OVER
  ) {
    return;
  }

  clickSound.play();
  updateBoard(clickedCell);
  updateGameState();
}

function resetBoard() {
  board.addEventListener("click", boardClickEventHandler);
  const markedCells = document.querySelectorAll(".board__cell-marked");
  markedCells.forEach((cell) => cell.remove());
  message.innerText = "";
}

function updateBoard(clickedCell) {
  game.updateBoard(clickedCell.id);
  const markEle = document.createElement("div");
  markEle.innerText = game.currentTurnPlayer().marker;
  markEle.classList.add("board__cell-marked");
  clickedCell.appendChild(markEle);
}

function updateScoreboard() {
  game.updateScoreboard();
  scoreboardPlayers.forEach((playerEle, index) => {
    playerEle.children[1].innerText =
      index === 0 ? game.player1.score : game.player2.score;
  });
}

function updateGameState() {
  let gameState = game.updateGameState();
  switch (gameState) {
    case GameState.WIN:
      message.innerText = "You WIN!";
      updateScoreboard();
      winSound.play();
      break;
    case GameState.LOSE:
      message.innerText = "You LOSE!";
      updateScoreboard();
      loseSound.play();
      break;
    case GameState.TIE:
      message.innerText = "TIE GAME!";
      tieGameSound.play();
      break;
    default:
      message.innerText = "Turn: " + game.nextTurnPlayer().name;
      break;
  }
}

resetGameButton.addEventListener("click", (event) => {
  resetGameSound.play();
  resetBoard();
  game.resetBoard();
});

// Player Form
const playerForm = document.querySelector(".player_form");
const inputs = playerForm.querySelectorAll("input");
const reader = new FileReader();
function updatePlayerCustomziation() {
  const name = inputs[0].value;
  const marker = inputs[1].value;
  const file = inputs[2].files[0];
  if (file) {
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = reader.result;
      player1.update({ name, marker, image });
      body.style.backgroundImage = `url(${image})`;
      body.style.backgroundSize = "cover";
    };
  } else {
    player1.update({ name, marker });
    name, marker;
  }
  playerNameTextBox.innerText = name;
}

playerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updatePlayerCustomziation();
});

// Start game
loadGameData();
board.addEventListener("click", boardClickEventHandler);
