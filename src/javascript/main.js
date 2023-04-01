/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/javascript/AI.js":
/*!******************************!*\
  !*** ./src/javascript/AI.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AI\": () => (/* binding */ AI)\n/* harmony export */ });\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ \"./src/javascript/Player.js\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Player__WEBPACK_IMPORTED_MODULE_0__);\n\nclass AI extends _Player__WEBPACK_IMPORTED_MODULE_0__.Player {\n  constructor() {\n    super({\n      name: \"Unbeatable AI\",\n      marker: \"🤖\",\n      type: _Player__WEBPACK_IMPORTED_MODULE_0__.PLAYER_TYPE.AI,\n      score: 0,\n    });\n    this.comeFirst = false;\n  }\n\n  selectCell(game) {\n    return this.#selectCellIfAIComeFirst(game);\n  }\n  /**\n   * 1. always select one of corner cells if human player marked center else select center cell\n   * 2. block any potential winning combination made by human\n   * 3. select the cell that can win the game\n   * 4. randomly select empty cell\n   */\n  #selectCellIfAIComeFirst(game) {\n    const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];\n    const board = game.board;\n    let selectedCell = 0;\n    let humanPotentialCombinations = this.#checkPotentialWinningCombination(\n      game.board,\n      1\n    );\n    let aiPotentialCombinations = this.#checkPotentialWinningCombination(\n      game.board,\n      2\n    );\n    aiPotentialCombinations.forEach((cell) => {\n      if (!board[cell]) selectedCell = cell;\n    });\n    if (selectedCell) return selectedCell;\n    humanPotentialCombinations.forEach((cell) => {\n      if (!board[cell]) selectedCell = cell;\n    });\n    if (selectedCell) return selectedCell;\n\n    // check if it is second round\n    if (Object.keys(board).length === 1) {\n      if (board[5]) {\n        selectedCell = 1;\n      } else {\n        selectedCell = 5;\n      }\n      return selectedCell;\n    }\n\n    cells.forEach((cell) => {\n      if (!board[cell]) selectedCell = cell;\n    });\n\n    return selectedCell;\n  }\n  #checkPotentialWinningCombination(board, player) {\n    let count = 0;\n    let positionOfCell = 0;\n    let cells = [];\n    for (const combination of _Player__WEBPACK_IMPORTED_MODULE_0__.WINNING_COMBINATIONS) {\n      combination.forEach((cell) => {\n        board[cell] === player ? count++ : (positionOfCell = cell);\n      });\n      if (count === 2) cells.push(positionOfCell);\n      count = 0;\n    }\n    return cells;\n  }\n}\n\n\n//# sourceURL=webpack:///./src/javascript/AI.js?");

/***/ }),

/***/ "./src/javascript/Game.js":
/*!********************************!*\
  !*** ./src/javascript/Game.js ***!
  \********************************/
/***/ ((module) => {

eval("const GameState = {\n  NOT_GAME_OVER: \"not_game_over\",\n  WIN: \"win\",\n  LOSE: \"lose\",\n  TIE: \"tie\",\n};\n\nconst WINNING_COMBINATIONS = [\n  [1, 2, 3],\n  [4, 5, 6],\n  [7, 8, 9],\n  [1, 4, 7],\n  [2, 5, 8],\n  [3, 6, 9],\n  [1, 5, 9],\n  [3, 5, 7],\n];\nclass Game {\n  constructor(player1, player2) {\n    this.board = {};\n    this.whoseTurn = 1; // 1 means player 1, 2 means player2\n    this.gameState = GameState.NOT_GAME_OVER;\n    this.player1 = player1;\n    this.player2 = player2;\n  }\n\n  updateGameState() {\n    if (this.#isTieGame()) this.gameState = GameState.TIE;\n    if (this.#isCurrentPlayerWinning()) {\n      this.gameState = this.whoseTurn === 1 ? GameState.WIN : GameState.LOSE;\n      this.#updateScore();\n    }\n\n    this.#switchTurn();\n    return this.gameState;\n  }\n\n  // save the player and position of marked cell to board\n  updateBoard(positionOfMarkedCell) {\n    this.board[positionOfMarkedCell] = this.whoseTurn;\n  }\n\n  resetBoard() {\n    this.board = {};\n    this.whoseTurn = 1;\n    this.gameState = GameState.NOT_GAME_OVER;\n  }\n\n  currentTurnPlayer() {\n    return this.whoseTurn === 1 ? this.player1 : this.player2;\n  }\n\n  nextTurnPlayer() {\n    return this.whoseTurn === 1 ? this.player2 : this.player1;\n  }\n\n  findPlayerBywhoseTurn(whoseTurn) {\n    return whoseTurn === 1 ? this.player1 : this.player2;\n  }\n\n  loadGameDate() {\n    const gameData = JSON.parse(localStorage.getItem(\"gameData\"));\n    if (!gameData) return;\n    console.log(\"load game\", gameData);\n    const player1 = gameData.player1;\n    const player2 = gameData.player2;\n    this.player1.update({ ...player1 });\n    this.player2.update({ ...player2 });\n    this.whoseTurn = gameData.whoseTurn;\n    if (Object.keys(gameData.board)) this.board = gameData.board;\n  }\n\n  saveGameData() {\n    localStorage.setItem(\n      \"gameData\",\n      JSON.stringify({\n        board: this.gameState === GameState.NOT_GAME_OVER ? this.board : {},\n        whoseTurn: this.whoseTurn,\n        player1: this.player1,\n        player2: this.player2,\n      })\n    );\n    console.log(\"save game\", JSON.parse(localStorage.getItem(\"gameData\")));\n  }\n\n  #updateScore() {\n    if (this.gameState === GameState.WIN) this.player1.score += 1;\n    if (this.gameState === GameState.LOSE) this.player2.score += 1;\n  }\n\n  #switchTurn() {\n    this.whoseTurn = this.whoseTurn === 1 ? 2 : 1;\n  }\n\n  #isTieGame() {\n    return Object.keys(this.board).length === 9;\n  }\n\n  #isCurrentPlayerWinning() {\n    for (const combination of WINNING_COMBINATIONS) {\n      let matchWinningCombination = combination.every(\n        (cell) => this.board[cell] === this.whoseTurn\n      );\n      if (matchWinningCombination) return true;\n    }\n    return false;\n  }\n}\n\nmodule.exports = {\n  Game,\n  GameState,\n  WINNING_COMBINATIONS,\n};\n\n\n//# sourceURL=webpack:///./src/javascript/Game.js?");

/***/ }),

/***/ "./src/javascript/GameUI.js":
/*!**********************************!*\
  !*** ./src/javascript/GameUI.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/javascript/Game.js\");\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Game__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ \"./src/javascript/Player.js\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Player__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _AI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AI */ \"./src/javascript/AI.js\");\n\n\n\n// Game UI Element\nconst board = document.querySelector(\".board\");\nconst resetGameButton = document.querySelector(\".resetGameButton\");\nconst messageBox = document.querySelector(\".message\");\nconst scoreboardPlayers = document.querySelectorAll(\".scoreboard__player\");\nconst player1Scoreboard = scoreboardPlayers[0].children;\nconst player2Scoreboard = scoreboardPlayers[1].children;\nconst switchPlayerButton = document.querySelector(\".switchPlayer\");\nconst body = document.body;\nlet playerType = _Player__WEBPACK_IMPORTED_MODULE_1__.PLAYER_TYPE.AI;\nlet onlineMode = false;\n\n// Game Assets\nconst player1 = new _Player__WEBPACK_IMPORTED_MODULE_1__.Player({\n  id: 1,\n  name: \"P1\",\n  marker: \"X\",\n  type: _Player__WEBPACK_IMPORTED_MODULE_1__.PLAYER_TYPE.HUMAN,\n  score: 0,\n});\nconst player2 = new _Player__WEBPACK_IMPORTED_MODULE_1__.Player({\n  id: 2,\n  name: \"P2\",\n  marker: \"O\",\n  type: _Player__WEBPACK_IMPORTED_MODULE_1__.PLAYER_TYPE.HUMAN,\n  score: 0,\n});\nconst aiPlayer = new _AI__WEBPACK_IMPORTED_MODULE_2__.AI();\nlet game = new _Game__WEBPACK_IMPORTED_MODULE_0__.Game(player1, aiPlayer);\nconst clickSound = new Audio(\"./resources/click.wav\");\nconst resetGameSound = new Audio(\"./resources/reset_game.wav\");\nconst winSound = new Audio(\"./resources/win.wav\");\nconst loseSound = new Audio(\"./resources/lose.wav\");\nconst tieGameSound = new Audio(\"./resources/tie_game.wav\");\n\n// WebSocket Client\nconst socket = io();\n\n/**\n * complete the turn with clicked cell\n * @param {Event Object} event\n * @returns\n */\nfunction boardClickEventHandler(event) {\n  /**\n   * disable player to mark cell until ai player has finished the turn\n   * or if the game is online\n   */\n  if (playerType === _Player__WEBPACK_IMPORTED_MODULE_1__.PLAYER_TYPE.AI || onlineMode) {\n    board.removeEventListener(\"click\", boardClickEventHandler);\n  }\n\n  const clickedCell = event.target;\n  // disable user to click on same cell twice or to click any cell after game is over\n  if (\n    clickedCell.childNodes.length ||\n    game.gameState !== _Game__WEBPACK_IMPORTED_MODULE_0__.GameState.NOT_GAME_OVER\n  ) {\n    return;\n  }\n\n  socket.emit(\"markCell\", { cellPosition: clickedCell.id });\n  completeTurn(clickedCell);\n  if (playerType === _Player__WEBPACK_IMPORTED_MODULE_1__.PLAYER_TYPE.AI) aiCompleteTurn();\n}\n\nboard.addEventListener(\"click\", boardClickEventHandler);\n\nfunction completeTurn(clickedCell) {\n  clickSound.play();\n  updateBoard(clickedCell);\n  updateGameState();\n  if (!onlineMode) game.saveGameData();\n  updateScore();\n}\n\nfunction aiCompleteTurn() {\n  const player = game.currentTurnPlayer();\n  if (\n    player.type === _Player__WEBPACK_IMPORTED_MODULE_1__.PLAYER_TYPE.AI &&\n    game.gameState === _Game__WEBPACK_IMPORTED_MODULE_0__.GameState.NOT_GAME_OVER\n  ) {\n    setTimeout(() => {\n      const positionOfCell = player.selectCell(game);\n      const selectedCell = document.getElementById(positionOfCell);\n      completeTurn(selectedCell);\n      board.addEventListener(\"click\", boardClickEventHandler);\n    }, 500);\n  }\n}\n\n/**\n * add click event to board\n * remove all marked cell on board\n * display emtpy message\n */\nfunction resetBoard() {\n  board.addEventListener(\"click\", boardClickEventHandler);\n  removeCells();\n  // displayMessage(\"\");\n}\n\n/**\n * update the board in the game object\n * mark the clickedCell in UI\n * @param {DOM element} clickedCell\n */\nfunction updateBoard(clickedCell) {\n  game.updateBoard(clickedCell.id);\n  const markEle = document.createElement(\"div\");\n  markEle.innerText = game.currentTurnPlayer().marker;\n  markEle.classList.add(\"board__cell-marked\");\n  clickedCell.appendChild(markEle);\n}\n\nfunction removeCells() {\n  const markedCells = document.querySelectorAll(\".board__cell-marked\");\n  markedCells.forEach((cell) => cell.remove());\n}\n\nfunction displayMessage(text) {\n  messageBox.innerText = text;\n}\nfunction displayImage(imageUrl) {\n  body.style.backgroundImage = `url(${imageUrl})`;\n}\n\nfunction updateScore() {\n  player1Scoreboard[1].innerText = game.player1.score;\n  player2Scoreboard[1].innerText = game.player2.score;\n}\n\nfunction updatePlayerName() {\n  player1Scoreboard[0].innerText = game.player1.name;\n  player2Scoreboard[0].innerText = game.player2.name;\n}\n\nfunction updateMarker() {\n  const player1Marker = game.player1.marker;\n  Object.entries(game.board).forEach(([cell, player]) => {\n    if (player === 1) {\n      document.getElementById(cell).children[0].innerText = player1Marker;\n    }\n  });\n}\n\n/**\n * check if game is over or switch turn\n */\nfunction updateGameState() {\n  let gameState = game.updateGameState();\n  switch (gameState) {\n    case _Game__WEBPACK_IMPORTED_MODULE_0__.GameState.WIN:\n      displayMessage(game.nextTurnPlayer().name + \" Win!\");\n      winSound.play();\n      break;\n    case _Game__WEBPACK_IMPORTED_MODULE_0__.GameState.LOSE:\n      displayMessage(game.nextTurnPlayer().name + \" Win!\");\n      playerType === _Player__WEBPACK_IMPORTED_MODULE_1__.PLAYER_TYPE.HUMAN || onlineMode\n        ? winSound.play()\n        : loseSound.play();\n      break;\n    case _Game__WEBPACK_IMPORTED_MODULE_0__.GameState.TIE:\n      displayMessage(\"TIE GAME!\");\n      tieGameSound.play();\n      break;\n    default:\n      displayMessage(\"Turn: \" + game.nextTurnPlayer().name);\n      break;\n  }\n}\n\n/**\n * reset both boards in game object and UI\n */\nfunction resetGame() {\n  resetGameSound.play();\n  resetBoard();\n  game.resetBoard();\n  if (!onlineMode) game.saveGameData();\n}\n\nresetGameButton.addEventListener(\"click\", resetGame);\n\n/**\n * Allow player to customize their game token such as: name, marker, and background image\n */\nconst playerForm = document.querySelector(\".player_form\");\nconst inputs = playerForm.querySelectorAll(\"input\");\nconst reader = new FileReader();\n\nfunction updatePlayer() {\n  const name = inputs[0].value;\n  const marker = inputs[1].value;\n  const file = inputs[2].files[0];\n  if (file) {\n    reader.readAsDataURL(file);\n    reader.onload = () => {\n      const image = reader.result;\n      localStorage.setItem(\"backgroundImage\", image);\n      displayImage(image);\n    };\n  }\n  player1.update({ name, marker });\n  if (name) updatePlayerName();\n  if (marker) updateMarker();\n}\n\nplayerForm.addEventListener(\"submit\", (event) => {\n  event.preventDefault();\n  updatePlayer();\n});\n\n// switch player between huamn and AI\nfunction switchPlayerHandler(event) {\n  if (playerType === _Player__WEBPACK_IMPORTED_MODULE_1__.PLAYER_TYPE.AI) {\n    playerType = _Player__WEBPACK_IMPORTED_MODULE_1__.PLAYER_TYPE.HUMAN;\n    game = new _Game__WEBPACK_IMPORTED_MODULE_0__.Game(player1, player2);\n    event.currentTarget.innerText = \"Play with AI\";\n  } else {\n    playerType = _Player__WEBPACK_IMPORTED_MODULE_1__.PLAYER_TYPE.AI;\n    game = new _Game__WEBPACK_IMPORTED_MODULE_0__.Game(player1, aiPlayer);\n    event.currentTarget.innerText = \"Play with another player\";\n  }\n  updatePlayerName();\n  updateScore();\n  resetGame();\n}\nswitchPlayerButton.addEventListener(\"click\", switchPlayerHandler);\n\n/**\n * mark cells based on board object\n * @param {object} board\n */\nfunction loadBoard(board) {\n  if (Object.keys(board)) {\n    Object.entries(board).forEach(([positionOfMarkedCell, player]) => {\n      const cell = document.getElementById(`${positionOfMarkedCell}`);\n      const markEle = document.createElement(\"div\");\n      markEle.innerText = game.findPlayerBywhoseTurn(player).marker;\n      markEle.classList.add(\"board__cell-marked\");\n      cell.appendChild(markEle);\n    });\n  }\n}\n\n/**\n * load player's board, name, marker, score from previous saved game\n */\nfunction loadGameData() {\n  const gameData = JSON.parse(localStorage.getItem(\"gameData\"));\n  game.loadGameDate();\n  if (!gameData) return;\n  const player1 = gameData.player1;\n  const player2 = gameData.player2;\n  playerType =\n    player2.type === _Player__WEBPACK_IMPORTED_MODULE_1__.PLAYER_TYPE.AI ? _Player__WEBPACK_IMPORTED_MODULE_1__.PLAYER_TYPE.AI : _Player__WEBPACK_IMPORTED_MODULE_1__.PLAYER_TYPE.HUMAN;\n  loadBoard(gameData.board);\n  updateScore();\n  updatePlayerName();\n\n  displayMessage(\n    \"Turn: \" + (gameData.whoseTurn === 1 ? player1.name : player2.name)\n  );\n  displayImage(localStorage.getItem(\"backgroundImage\"));\n}\n\n// loadGameData();\n\n// WebSocket client\nconst joinRoomForm = document.querySelector(\".roomForm\");\nconst roomNumberInput = document.getElementById(\"roomNumber\");\n\nfunction goOnline() {\n  playerType = _Player__WEBPACK_IMPORTED_MODULE_1__.PLAYER_TYPE.HUMAN;\n  onlineMode = true;\n  roomNumber = roomNumberInput.value;\n}\n\njoinRoomForm.addEventListener(\"submit\", (event) => {\n  event.preventDefault();\n  goOnline();\n  socket.emit(\n    \"join\",\n    { name: game.player1.name, room: roomNumberInput.value },\n    (error) => alert(error)\n  );\n});\n\n/**\n * listen to opponent's move, update the board and switch turn\n */\nsocket.on(\n  \"markCell\",\n  (data) => {\n    console.log(\"Mark Cell\", data);\n    const { cellPosition, user } = data;\n    if (user.id !== player1)\n      completeTurn(document.getElementById(cellPosition));\n    board.addEventListener(\"click\", boardClickEventHandler);\n  },\n  (error) => alert(error)\n);\n\n/**\n * listen to message from server\n */\nsocket.on(\n  \"message\",\n  (message) => {\n    userId = message.id;\n    console.log(message);\n  },\n  (error) => alert(error)\n);\n\n\n//# sourceURL=webpack:///./src/javascript/GameUI.js?");

/***/ }),

/***/ "./src/javascript/Player.js":
/*!**********************************!*\
  !*** ./src/javascript/Player.js ***!
  \**********************************/
/***/ ((module) => {

eval("const WINNING_COMBINATIONS = [\n  [1, 2, 3],\n  [4, 5, 6],\n  [7, 8, 9],\n  [1, 4, 7],\n  [2, 5, 8],\n  [3, 6, 9],\n  [1, 5, 9],\n  [3, 5, 7],\n];\n\nconst PLAYER_TYPE = {\n  HUMAN: \"human\",\n  AI: \"ai\",\n};\nclass Player {\n  constructor({ name, marker, score, type, id }) {\n    this.id = id;\n    this.name = name;\n    this.marker = marker;\n    this.score = score;\n    this.type = type;\n  }\n\n  update({ name, marker, score }) {\n    if (name) this.name = name;\n    if (marker) this.marker = marker;\n    if (score) this.score = score;\n  }\n}\n\nmodule.exports = {\n  Player,\n  PLAYER_TYPE,\n  WINNING_COMBINATIONS,\n};\n\n\n//# sourceURL=webpack:///./src/javascript/Player.js?");

/***/ }),

/***/ "./src/javascript/index.js":
/*!*********************************!*\
  !*** ./src/javascript/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _GameUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameUI */ \"./src/javascript/GameUI.js\");\n\n\n\n//# sourceURL=webpack:///./src/javascript/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/javascript/index.js");
/******/ 	
/******/ })()
;