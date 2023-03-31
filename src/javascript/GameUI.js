import { Game, GameState } from "./Game";
import { Player, TYPE } from "./Player";
// Game UI Element
const board = document.querySelector(".board");
const resetGameButton = document.querySelector(".resetGameButton");
const message = document.querySelector(".message");
const scoreboardPlayers = document.querySelectorAll(".scoreboard__player");
const player1Scoreboard = scoreboardPlayers[0].children;
const player2Scoreboard = scoreboardPlayers[1].children;
const body = document.body;

// Game Assets
const player1 = new Player({
  name: "You",
  marker: "X",
  type: TYPE.HUMAN,
  score: 0,
  image: null,
});
const aiPlayer = new Player();
const game = new Game(player1, aiPlayer);
const clickSound = new Audio("./resources/click.wav");
const resetGameSound = new Audio("./resources/reset_game.wav");
const winSound = new Audio("./resources/win.wav");
const loseSound = new Audio("./resources/lose.wav");
const tieGameSound = new Audio("./resources/tie_game.wav");

// Board
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
  updateScore();
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

function updateScore() {
  player1Scoreboard[1].innerText = game.player1.score;
  player2Scoreboard[1].innerText = game.player2.score;
}

function updatePlayerName() {
  player1Scoreboard[0].innerText = game.player1.name;
  player2Scoreboard[0].innerText = game.player2.name;
}

function updateGameState() {
  let gameState = game.updateGameState();
  switch (gameState) {
    case GameState.WIN:
      message.innerText = "You WIN!";
      winSound.play();
      break;
    case GameState.LOSE:
      message.innerText = "You LOSE!";
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
  }
  player1Scoreboard[0].innerText = name;
}

playerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updatePlayerCustomziation();
});

// Start game
const gameData = JSON.parse(localStorage.getItem("gameData"));

function loadBoard(board) {
  if (Object.keys(gameData.board)) {
    Object.entries(gameData.board).forEach(([positionOfMarkedCell, player]) => {
      const cell = document.getElementById(`${positionOfMarkedCell}`);
      const markEle = document.createElement("div");
      markEle.innerText = game.findPlayerBywhoseTurn(player).marker;
      markEle.classList.add("board__cell-marked");
      cell.appendChild(markEle);
    });
  }
}
function loadGameData() {
  game.loadGameDate();
  if (!gameData) return;
  const player1 = gameData.player1;
  const player2 = gameData.player2;
  loadBoard(gameData.board);
  updateScore();
  updatePlayerName();

  // display next turn player
  message.innerText =
    "Turn: " + (gameData.whoseTurn === 1 ? player1.name : player2.name);
  // display background image
  body.style.backgroundImage = `url(${gameData.image})`;
}

loadGameData();
board.addEventListener("click", boardClickEventHandler);
