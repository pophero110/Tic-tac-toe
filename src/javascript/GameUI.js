import { Game, GameState } from "./Game";
import { Player, PLAYER_TYPE } from "./Player";
import { AI } from "./AI";
// Game UI Element
const board = document.querySelector(".board");
const resetGameButton = document.querySelector(".resetGameButton");
const messageBar = document.querySelector(".messageBar");
const scoreboard = document.querySelectorAll(".scoreboard");
const player1Scoreboard = scoreboard[0].children;
const player2Scoreboard = scoreboard[1].children;
const playerTypeButton = document.querySelector(".playerTypeButton");
const onlineButton = document.querySelector(".onlineButton");
const customizeButton = document.querySelector(".customizeButton");
const joinRoomForm = document.querySelector(".roomForm");
const roomNumberInput = document.getElementById("roomNumber");
const modalBackDrop = document.querySelector(".modal--backdrop");
const modal = document.querySelector(".modal");
const body = document.body;
let playerType = PLAYER_TYPE.AI;
let onlineMode = false;

// Game Assets
let player1 = new Player({
  id: Math.floor(Math.random() * 10000000),
  name: "P1",
  marker: "X",
  type: PLAYER_TYPE.HUMAN,
  score: 0,
});
let player2 = new Player({
  id: Math.floor(Math.random() * 10000000),
  name: "P2",
  marker: "O",
  type: PLAYER_TYPE.HUMAN,
  score: 0,
});
let aiPlayer = new AI();
let game = new Game(player1, aiPlayer);
const clickSound = new Audio("./resources/click.wav");
const resetGameSound = new Audio("./resources/reset_game.wav");
const winSound = new Audio("./resources/win.wav");
const loseSound = new Audio("./resources/lose.wav");
const tieGameSound = new Audio("./resources/tie_game.wav");

// WebSocket Client
const socket = io();

// Modal
function toggleModal() {
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";
  modalBackDrop.style.display =
    modalBackDrop.style.display === "block" ? "none" : "block";
}

onlineButton.addEventListener("click", (event) => {
  toggleModal();
  joinRoomForm.style.display = "flex";
  playerForm.style.display = "none";
});

customizeButton.addEventListener("click", (event) => {
  toggleModal();
  joinRoomForm.style.display = "none";
  playerForm.style.display = "flex";
  updatePlayerForm(player1);
});
modalBackDrop.addEventListener("click", (event) => {
  toggleModal();
});

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
  messageBar.innerText = text;
}
function displayImage(imageUrl) {
  body.style.backgroundImage = `url(${imageUrl})`;
}

function updatePlayerName() {
  console.log({ game });
  player1Scoreboard[0].innerText = game.player1.name;
  player2Scoreboard[0].innerText = game.player2.name;
}

function updateScore() {
  player1Scoreboard[1].innerText = game.player1.score;
  player2Scoreboard[1].innerText = game.player2.score;
}

function updateMarker() {
  const player1Marker = game.player1.marker;
  Object.entries(game.board).forEach(([cell, player]) => {
    if (player === 1) {
      document.getElementById(cell).children[0].innerText = player1Marker;
    }
  });
}

function updatePlayerTypeButtonText() {
  playerTypeButton.innerText =
    playerType === PLAYER_TYPE.AI ? "Play with P2" : "Play with AI";
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
  displayMessage(game.player1.name + " TURN");
  if (!onlineMode) game.saveGameData();
}

resetGameButton.addEventListener("click", resetGame);

/**
 * Allow player to customize their game token such as: name, marker, and background image
 */
const reader = new FileReader();
const playerForm = document.querySelector(".playerForm");
const playerInputs = playerForm.querySelectorAll("input");
const togglePlayerButton = playerInputs[0];

function updatePlayerForm(player) {
  playerInputs[1].value = player.name;
  playerInputs[2].value = player.marker;
}

togglePlayerButton.addEventListener("change", (event) => {
  // true means player1, false means player2
  const whichPlayer = togglePlayerButton.checked;
  updatePlayerForm(whichPlayer ? player1 : player2);
});
function updatePlayer() {
  // true means player1, false means player2
  const whichPlayer = playerInputs[0].checked;
  const name = playerInputs[1].value;
  const marker = playerInputs[2].value;
  const file = playerInputs[3].files[0];
  if (file) {
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = reader.result;
      localStorage.setItem("backgroundImage", image);
      displayImage(image);
    };
  }
  whichPlayer
    ? player1.update({ name, marker })
    : player2.update({ name, marker });

  if (name) updatePlayerName();
  if (marker) updateMarker();
}

playerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updatePlayer();
  toggleModal();
});

// switch player between huamn and AI
function playerTypeButtonHandler() {
  if (playerType === PLAYER_TYPE.AI) {
    playerType = PLAYER_TYPE.HUMAN;
    game = new Game(player1, player2);
    console.log(player2);
  } else {
    playerType = PLAYER_TYPE.AI;
    game = new Game(player1, aiPlayer);
    console.log(aiPlayer);
  }
  resetGame();
  updatePlayerTypeButtonText();
  updatePlayerName();
  updateScore();
}
playerTypeButton.addEventListener("click", playerTypeButtonHandler);

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
  console.log("load game", gameData);
  if (!gameData) return;
  player1 = new Player({ ...gameData.player1 });
  player2 =
    gameData.player2.type === PLAYER_TYPE.AI
      ? new AI({ ...gameData.player2 })
      : new Player({ ...gameData.player2 });
  playerType = player2.type;
  game.loadGameDate({ ...gameData, player1, player2 });
  updatePlayerTypeButtonText();
  loadBoard(gameData.board);
  updateScore();
  updatePlayerName();

  displayMessage(
    "Turn: " + (gameData.whoseTurn === 1 ? player1.name : player2.name)
  );
  displayImage(localStorage.getItem("backgroundImage"));
}

loadGameData();

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
