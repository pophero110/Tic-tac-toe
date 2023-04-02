import { Game, GameState } from "./Game";
import { Player, PLAYER_TYPE } from "./Player";
import { AI } from "./AI";
// Game UI Element
const board = document.querySelector(".board");
const resetGameButton = document.querySelector(".resetGameButton");
const messageBox = document.querySelector(".message");
const scoreboardPlayers = document.querySelectorAll(".scoreboard__player");
const player1Scoreboard = scoreboardPlayers[0].children;
const player2Scoreboard = scoreboardPlayers[1].children;
const switchPlayerButton = document.querySelector(".switchPlayer");
const body = document.body;
let playerType = PLAYER_TYPE.AI;
let onlineMode = false;

// Game Assets
const player1 = new Player({
  id: Math.floor(Math.random() * 10000000),
  name: "P1",
  marker: "X",
  type: PLAYER_TYPE.HUMAN,
  score: 0,
});
const player2 = new Player({
  id: Math.floor(Math.random() * 10000000),
  name: "P2",
  marker: "O",
  type: PLAYER_TYPE.HUMAN,
  score: 0,
});
const aiPlayer = new AI();
let game = new Game(player1, aiPlayer);
const clickSound = new Audio("./resources/click.wav");
const resetGameSound = new Audio("./resources/reset_game.wav");
const winSound = new Audio("./resources/win.wav");
const loseSound = new Audio("./resources/lose.wav");
const tieGameSound = new Audio("./resources/tie_game.wav");

// WebSocket Client
const socket = io();

/**
 * complete the turn with clicked cell
 * @param {Event Object} event
 * @returns
 */
function boardClickEventHandler(event) {
  /**
   * disable player to mark cell until ai player has finished the turn
   * or if the game is online
   */
  if (playerType === PLAYER_TYPE.AI || onlineMode) {
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

  socket.emit("markCell", { cellPosition: clickedCell.id });
  completeTurn(clickedCell);
  if (playerType === PLAYER_TYPE.AI) aiCompleteTurn();
}

board.addEventListener("click", boardClickEventHandler);

function completeTurn(clickedCell) {
  clickSound.play();
  updateBoard(clickedCell);
  updateGameState();
  if (!onlineMode) game.saveGameData();
  updateScore();
}

function aiCompleteTurn() {
  const player = game.currentTurnPlayer();
  if (
    player.type === PLAYER_TYPE.AI &&
    game.gameState === GameState.NOT_GAME_OVER
  ) {
    setTimeout(() => {
      const positionOfCell = player.selectCell(game);
      const selectedCell = document.getElementById(positionOfCell);
      completeTurn(selectedCell);
      board.addEventListener("click", boardClickEventHandler);
    }, 500);
  }
}

/**
 * add click event to board
 * remove all marked cell on board
 * display emtpy message
 */
function resetBoard() {
  board.addEventListener("click", boardClickEventHandler);
  removeCells();
  // displayMessage("");
}

/**
 * update the board in the game object
 * mark the clickedCell in UI
 * @param {DOM element} clickedCell
 */
function updateBoard(clickedCell) {
  game.updateBoard(clickedCell.id);
  const markEle = document.createElement("div");
  markEle.innerText = game.currentTurnPlayer().marker;
  markEle.classList.add("board__cell-marked");
  clickedCell.appendChild(markEle);
}

function removeCells() {
  const markedCells = document.querySelectorAll(".board__cell-marked");
  markedCells.forEach((cell) => cell.remove());
}

function displayMessage(text) {
  messageBox.innerText = text;
}
function displayImage(imageUrl) {
  body.style.backgroundImage = `url(${imageUrl})`;
}

function updateScore() {
  player1Scoreboard[1].innerText = game.player1.score;
  player2Scoreboard[1].innerText = game.player2.score;
}

function updatePlayerName() {
  player1Scoreboard[0].innerText = game.player1.name;
  player2Scoreboard[0].innerText = game.player2.name;
}

function updateMarker() {
  const player1Marker = game.player1.marker;
  Object.entries(game.board).forEach(([cell, player]) => {
    if (player === 1) {
      document.getElementById(cell).children[0].innerText = player1Marker;
    }
  });
}

function emitGameOverToServer() {
  setTimeout(() => {
    socket.emit("gameOver");
  }, 1000);
}

/**
 * check if game is over or switch turn
 */
function updateGameState() {
  let gameState = game.updateGameState();
  switch (gameState) {
    case GameState.WIN:
      displayMessage(game.nextTurnPlayer().name + " Win!");
      winSound.play();
      emitGameOverToServer();
      break;
    case GameState.LOSE:
      displayMessage(game.nextTurnPlayer().name + " Win!");
      playerType === PLAYER_TYPE.HUMAN || onlineMode
        ? winSound.play()
        : loseSound.play();
      emitGameOverToServer();
      break;
    case GameState.TIE:
      displayMessage("TIE GAME!");
      tieGameSound.play();
      emitGameOverToServer();
      break;
    default:
      displayMessage("Turn: " + game.nextTurnPlayer().name);
      break;
  }
}

/**
 * reset both boards in game object and UI
 */
function resetGame() {
  resetGameSound.play();
  resetBoard();
  game.resetBoard();
  if (!onlineMode) game.saveGameData();
}

resetGameButton.addEventListener("click", resetGame);

/**
 * Allow player to customize their game token such as: name, marker, and background image
 */
const playerForm = document.querySelector(".player_form");
const inputs = playerForm.querySelectorAll("input");
const reader = new FileReader();

function updatePlayer() {
  const name = inputs[0].value;
  const marker = inputs[1].value;
  const file = inputs[2].files[0];
  if (file) {
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = reader.result;
      localStorage.setItem("backgroundImage", image);
      displayImage(image);
    };
  }
  player1.update({ name, marker });
  if (name) updatePlayerName();
  if (marker) updateMarker();
}

playerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updatePlayer();
});

// switch player between huamn and AI
function switchPlayerHandler() {
  if (playerType === PLAYER_TYPE.AI) {
    playerType = PLAYER_TYPE.HUMAN;
    game = new Game(player1, player2);
    switchPlayerButton.innerText = "Play with AI";
  } else {
    playerType = PLAYER_TYPE.AI;
    game = new Game(player1, aiPlayer);
    switchPlayerButton.innerText = "Two Players";
  }
  updatePlayerName();
  updateScore();
  resetGame();
}
switchPlayerButton.addEventListener("click", switchPlayerHandler);

/**
 * mark cells based on board object
 * @param {object} board
 */
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

/**
 * load player's board, name, marker, score from previous saved game
 */
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

  displayMessage(
    "Turn: " + (gameData.whoseTurn === 1 ? player1.name : player2.name)
  );
  displayImage(localStorage.getItem("backgroundImage"));
}

// loadGameData();

// WebSocket client
const joinRoomForm = document.querySelector(".roomForm");
const roomNumberInput = document.getElementById("roomNumber");

function goOnline() {
  playerType = PLAYER_TYPE.HUMAN;
  onlineMode = true;
}

joinRoomForm.addEventListener("submit", (event) => {
  event.preventDefault();
  goOnline();
  socket.emit(
    "join",
    { player: player1, room: roomNumberInput.value },
    (error) => alert(error)
  );
});

/**
 * listen to opponent's move, update the board and switch turn
 */
socket.on(
  "markCell",
  (data) => {
    const { cellPosition } = data;
    console.log("Mark Cell", data);
    completeTurn(document.getElementById(cellPosition));
    board.addEventListener("click", boardClickEventHandler);
  },
  (error) => alert(error)
);

/**
 * listen to message from server
 */
socket.on(
  "message",
  (data) => {
    const { message } = data;
    console.log(message);
  },
  (error) => alert(error)
);

socket.on("gameOver", (data) => {
  console.log(data);
  resetGame();
});
