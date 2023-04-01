import { Game, GameState } from "./Game";
import { Player, PLAYER_TYPE } from "./Player";
import { AI } from "./AI";
// Game UI Element
const board = document.querySelector(".board");
const resetGameButton = document.querySelector(".resetGameButton");
const message = document.querySelector(".message");
const scoreboardPlayers = document.querySelectorAll(".scoreboard__player");
const player1Scoreboard = scoreboardPlayers[0].children;
const player2Scoreboard = scoreboardPlayers[1].children;
const body = document.body;
const switchPlayerButton = document.querySelector(".switchPlayer");
let playerType = PLAYER_TYPE.AI;

// Game Assets
const player1 = new Player({
  name: "P1",
  marker: "X",
  type: PLAYER_TYPE.HUMAN,
  score: 0,
  image: null,
});
const player2 = new Player({
  name: "P2",
  marker: "O",
  type: PLAYER_TYPE.HUMAN,
  score: 0,
  image: null,
});
const aiPlayer = new AI();
let game = new Game(player1, aiPlayer);
const clickSound = new Audio("./resources/click.wav");
const resetGameSound = new Audio("./resources/reset_game.wav");
const winSound = new Audio("./resources/win.wav");
const loseSound = new Audio("./resources/lose.wav");
const tieGameSound = new Audio("./resources/tie_game.wav");

// Board
function boardClickEventHandler(event) {
  // disable player to mark cell until ai player has finished the turn
  if (playerType === PLAYER_TYPE.AI) {
    board.removeEventListener("click", boardClickEventHandler);
  }

  const clickedCell = event.target;
  // disable user to click on same cell twice or to click any cell after game is over
  if (
    clickedCell.childNodes.length ||
    game.gameState !== GameState.NOT_GAME_OVER
  ) {
    return;
  }

  clickSound.play();
  completeTurn(clickedCell);
  if (playerType === PLAYER_TYPE.AI) aiCompleteTurn();
}

function completeTurn(clickedCell) {
  updateBoard(clickedCell);
  updateGameState();
  updateScore();
}
function aiCompleteTurn() {
  const player = game.currentTurnPlayer();
  if (
    player.type === PLAYER_TYPE.AI &&
    game.gameState === GameState.NOT_GAME_OVER
  ) {
    setTimeout(() => {
      clickSound.play();
      const positionOfCell = player.selectCell(game);
      const selectedCell = document.getElementById(positionOfCell);
      completeTurn(selectedCell);
      board.addEventListener("click", boardClickEventHandler);
    }, 500);
  }
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
      message.innerText =
        playerType === PLAYER_TYPE.HUMAN
          ? "You Win!"
          : game.nextTurnPlayer().name + " Win!";
      winSound.play();
      break;
    case GameState.LOSE:
      message.innerText =
        playerType === PLAYER_TYPE.HUMAN
          ? game.nextTurnPlayer().name + " Win!"
          : "You Lose!";
      playerType === PLAYER_TYPE.HUMAN ? winSound.play() : loseSound.play();
      break;
    case GameState.TIE:
      message.innerText = "TIE GAME!";
      tieGameSound.play();
      console.log("Tie game");
      break;
    default:
      message.innerText = "Turn: " + game.nextTurnPlayer().name;
      break;
  }
}
function resetGame() {
  resetGameSound.play();
  resetBoard();
  game.resetBoard();
}

resetGameButton.addEventListener("click", resetGame);

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

// swtich player between huamn and AI
function switchPlayerHandler(event) {
  if (playerType === PLAYER_TYPE.AI) {
    playerType = PLAYER_TYPE.HUMAN;
    game = new Game(player1, player2);
    event.currentTarget.innerText = "Play with AI";
  } else {
    playerType = PLAYER_TYPE.AI;
    game = new Game(player1, aiPlayer);
    event.currentTarget.innerText = "Play with another player";
  }
  updatePlayerName();
  updateScore();
  resetGame();
}
switchPlayerButton.addEventListener("click", switchPlayerHandler);

// Start game
function loadBoard(board) {
  if (Object.keys(board)) {
    Object.entries(board).forEach(([positionOfMarkedCell, player]) => {
      const cell = document.getElementById(`${positionOfMarkedCell}`);
      const markEle = document.createElement("div");
      markEle.innerText = game.findPlayerBywhoseTurn(player).marker;
      markEle.classList.add("board__cell-marked");
      cell.appendChild(markEle);
    });
  }
}

function loadGameData() {
  const gameData = JSON.parse(localStorage.getItem("gameData"));
  game.loadGameDate();
  if (!gameData) return;
  const player1 = gameData.player1;
  const player2 = gameData.player2;
  playerType =
    player2.type === PLAYER_TYPE.AI ? PLAYER_TYPE.AI : PLAYER_TYPE.HUMAN;
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
