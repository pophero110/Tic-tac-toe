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
const options = document.querySelectorAll(".options");
const playerTypeButton = document.querySelector(".playerTypeButton");
const onlineButton = document.querySelector(".onlineButton");
const switchTurnButton = document.querySelector(".switchTurnButton");
const customizeButton = document.querySelector(".customizeButton");
const resetDataButton = document.querySelector(".resetDataButton");
const joinRoomForm = document.querySelector(".roomForm");
const roomNumberInput = document.getElementById("roomNumber");
const modalBackDrop = document.querySelector(".modal--backdrop");
const modal = document.querySelector(".modal");
const body = document.body;
let playerType = PLAYER_TYPE.AI;
let onlineMode = false;
let defaultWhoseTurn = 1; // 1 means player1 go first and 2 means player2 go first

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
const Sounds = {
  click: new Audio("./resources/sounds/click.wav"),
  reset: new Audio("./resources/sounds/reset_game.wav"),
  win: new Audio("./resources/sounds/win.wav"),
  lose: new Audio("./resources/sounds/lose.wav"),
  tie: new Audio("./resources/sounds/tie.wav"),
  matchReady: new Audio("./resources/sounds/match_ready.wav"),
};

const FORM_TYPE = {
  ROOM_FORM: "room_form",
  PLAYER_FORM: "player_form",
};

// WebSocket Client
// const socket = io();

// Modal
function toggleModal() {
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";
  modalBackDrop.style.display =
    modalBackDrop.style.display === "block" ? "none" : "block";
}

function changeForm(formType) {
  if (FORM_TYPE.ROOM_FORM === formType) {
    joinRoomForm.style.display = "flex";
    playerForm.style.display = "none";
  }
  if (FORM_TYPE.PLAYER_FORM === formType) {
    joinRoomForm.style.display = "none";
    playerForm.style.display = "flex";
  }
}

// // Option buttons
// onlineButton.addEventListener("click", (event) => {
//   toggleModal();
//   changeForm(FORM_TYPE.ROOM_FORM);
// });

customizeButton.addEventListener("click", (event) => {
  toggleModal();
  changeForm(FORM_TYPE.PLAYER_FORM);
  updatePlayerForm(player1);
});

resetDataButton.addEventListener("click", (event) => {
  localStorage.clear();
  location.reload();
});

modalBackDrop.addEventListener("click", (event) => {
  toggleModal();
});

switchTurnButton.addEventListener("click", (event) => {
  defaultWhoseTurn = defaultWhoseTurn === 1 ? 2 : 1;
  resetGame();
});

function emitMarkCellEvent(clickedCell) {
  if (onlineMode) {
    socket.emit("markCell", { cellPosition: clickedCell.id }, (error) =>
      alert(error)
    );
  }
}

function boardClickEventHandler(event) {
  /**
   * disable player to mark cell until ai player has completed the turn
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

  emitMarkCellEvent(clickedCell);
  completeTurn(clickedCell);
  if (playerType === PLAYER_TYPE.AI) aiCompleteTurn();
}

board.addEventListener("click", boardClickEventHandler);

/**
 * complete the turn with clicked cell
 * @param {DOM element} clickedCell
 * @returns
 */
function completeTurn(clickedCell) {
  Sounds.click.play();
  updateBoard(clickedCell);
  updateGameState();
  updateScore();
  if (!onlineMode) game.saveGameData();
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
 * remove all marked cell on board
 * display emtpy message
 */
function resetBoard() {
  board.addEventListener("click", boardClickEventHandler);
  removeCells();
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

function displayTurnMessage(player) {
  messageBar.innerText = player.name + " TURN";
}

function displayImage(imageUrl) {
  body.style.backgroundImage = `url(${imageUrl})`;
}

function updatePlayerName() {
  player1Scoreboard[0].innerText = game.player1.name;
  player2Scoreboard[0].innerText = game.player2.name;
}

function updateScore() {
  player1Scoreboard[1].innerText = game.player1.score;
  player2Scoreboard[1].innerText = game.player2.score;
}

function updateMarker() {
  const player1Marker = player1.marker;
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
    socket.emit("gameOver", (error) => alert(error));
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
      Sounds.win.play();
      emitGameOverToServer();
      break;
    case GameState.LOSE:
      displayMessage(game.nextTurnPlayer().name + " Win!");
      playerType === PLAYER_TYPE.HUMAN || onlineMode
        ? Sounds.win.play()
        : Sounds.lose.play();
      emitGameOverToServer();
      break;
    case GameState.TIE:
      displayMessage("TIE GAME!");
      Sounds.tie.play();
      emitGameOverToServer();
      break;
    default:
      displayTurnMessage(game.currentTurnPlayer());
      break;
  }
  if (gameState !== GameState.NOT_GAME_OVER && !onlineMode) {
    resetGameButton.style.display = "block";
  }
}

/**
 * reset both boards in game object and UI
 */
function resetGame() {
  Sounds.reset.play();
  resetBoard();
  game.resetBoard(defaultWhoseTurn);
  displayTurnMessage(defaultWhoseTurn === 1 ? game.player1 : game.player2);
  if (!onlineMode) game.saveGameData();
  if (window.innerWidth <= 600) {
    resetGameButton.style.display = "none";
  }
  if (defaultWhoseTurn === 2 && playerType === PLAYER_TYPE.AI) {
    aiPlayer.comeFirst = true;
    aiPlayer.previousMove = 0;
    aiPlayer.countTurn = 0;
    aiCompleteTurn();
  }
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
  updatePlayerForm(whichPlayer ? game.player1 : game.player2);
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
    ? game.player1.update({ name, marker })
    : game.player2.update({ name, marker });

  if (name) updatePlayerName();
  if (marker) updateMarker();
}

playerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updatePlayer();
  toggleModal();
  game.saveGameData();
});

// switch player between huamn and AI
function playerTypeButtonHandler() {
  if (playerType === PLAYER_TYPE.AI) {
    playerType = PLAYER_TYPE.HUMAN;
    game = new Game(player1, player2);
  } else {
    playerType = PLAYER_TYPE.AI;
    game = new Game(player1, aiPlayer);
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
  if (!gameData) return;
  player1 = new Player({ ...gameData.player1 });
  player2 =
    gameData.player2.type === PLAYER_TYPE.AI
      ? new AI({ ...gameData.player2 })
      : new Player({ ...gameData.player2 });
  playerType = player2.type;
  game.loadGameDate({ ...gameData, player1, player2 });
  loadBoard(gameData.board);
  updatePlayerTypeButtonText();
  updateScore();
  updatePlayerName();

  displayMessage(
    "Turn: " +
      (gameData.whoseTurn === 1 ? game.player1.name : game.player2.name)
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
  toggleModal();
});

/**
 * listen to opponent's move, update the board and switch turn
 */
// socket.on(
//   "markCell",
//   (data) => {
//     const { cellPosition } = data;
//     completeTurn(document.getElementById(cellPosition));
//     board.addEventListener("click", boardClickEventHandler);
//   },
//   (error) => alert(error)
// );

/**
 * listen to message from server
 */
// socket.on(
//   "message",
//   (data) => {
//     const { message, opponent, whoseTurn } = data;
//     displayMessage(message);
//     if (opponent && whoseTurn) {
//       Sounds.matchReady.play();
//       resetBoard();
//       game.resetBoard(whoseTurn);
//       resetGameButton.style.display = "none";
//       Array.from(options).forEach((option) => (option.style.display = "none"));
//       game.player2 = new Player({ ...opponent });
//       if (whoseTurn === 2) {
//         displayTurnMessage(game.player2);
//         board.removeEventListener("click", boardClickEventHandler);
//       } else {
//         displayTurnMessage(game.player1);
//       }
//       updatePlayerName();
//     }
//   },
//   (error) => alert(error)
// );

// socket.on("gameOver", (data) => {
//   board.removeEventListener("click", boardClickEventHandler);
//   displayMessage("Resetting game");
//   setTimeout(() => {
//     removeCells();
//     game.gameState = GameState.NOT_GAME_OVER;
//     Sounds.reset.play();
//     game.board = {};
//     if (game.whoseTurn === 1) {
//       displayTurnMessage(game.player1);
//       board.addEventListener("click", boardClickEventHandler);
//     } else {
//       displayTurnMessage(game.player2);
//     }
//   }, 3000);
// });
