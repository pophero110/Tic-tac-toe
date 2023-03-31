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

/***/ "./src/javascript/Game.js":
/*!********************************!*\
  !*** ./src/javascript/Game.js ***!
  \********************************/
/***/ ((module) => {

eval("const GameState = {\n  NOT_GAME_OVER: \"not_game_over\",\n  WIN: \"win\",\n  LOSE: \"lose\",\n  TIE: \"tie\",\n};\nclass Game {\n  #winningCondition = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9],\n    [1, 4, 7],\n    [2, 5, 8],\n    [3, 6, 9],\n    [1, 5, 9],\n    [3, 5, 7],\n  ];\n  #board;\n  #whoseTurn;\n  constructor(player1, player2) {\n    this.#board = {};\n    this.#whoseTurn = 1; // 1 means player 1, 2 means player2\n    this.gameState = GameState.NOT_GAME_OVER;\n    this.player1 = player1;\n    this.player2 = player2;\n  }\n  /**\n   * Determines whether the game is over based on the marked cells on board.\n   * Returns a message indicating the winner of the game, a tie, or that the game is not over.\n   * If player 1 wins, the message will be \"{player 1 name} won!\".\n   * If player 2 wins, the message will be \"{player 2 name} won!\".\n   * If the game is tied, the message will be \"Tie game\".\n   * Otherwise, an empty string is returned.\n   * @param {number} positionOfMarkedCell - The position of the newly marked cell, must be a number between 1 and 9 (inclusive).\n   * @returns {string} - A message indicating the winner of the game, a tie, or that the game is not over.\n   */\n  updateGameState() {\n    if (this.#isTieGame()) this.gameState = GameState.TIE;\n    if (this.#isCurrentPlayerWinning()) {\n      this.gameState = this.#whoseTurn === 1 ? GameState.WIN : GameState.LOSE;\n      this.#updateScore();\n    }\n\n    this.#switchTurn();\n    this.#saveGameData();\n    return this.gameState;\n  }\n\n  // save the player and position of marked cell to board\n  updateBoard(positionOfMarkedCell) {\n    this.#board[positionOfMarkedCell] = this.#whoseTurn;\n  }\n\n  resetBoard() {\n    this.#board = {};\n    this.#whoseTurn = 1;\n    this.gameState = GameState.NOT_GAME_OVER;\n    this.#saveGameData();\n  }\n\n  currentTurnPlayer() {\n    return this.#whoseTurn === 1 ? this.player1 : this.player2;\n  }\n\n  nextTurnPlayer() {\n    return this.#whoseTurn === 1 ? this.player2 : this.player1;\n  }\n\n  findPlayerBywhoseTurn(whoseTurn) {\n    return whoseTurn === 1 ? this.player1 : this.player2;\n  }\n\n  #saveGameData(image = null) {\n    localStorage.setItem(\n      \"gameData\",\n      JSON.stringify({\n        board: this.gameState === GameState.NOT_GAME_OVER ? this.#board : {},\n        whoseTurn: this.#whoseTurn,\n        image: image,\n        player1: this.player1,\n        player2: this.player2,\n      })\n    );\n    console.log(\"save game\", JSON.parse(localStorage.getItem(\"gameData\")));\n  }\n\n  loadGameDate() {\n    const gameData = JSON.parse(localStorage.getItem(\"gameData\"));\n    console.log(\"load game\", gameData);\n    if (!gameData) return;\n    console.log(\"load\", this.player1, this.player2);\n    const player1 = gameData.player1;\n    const player2 = gameData.player2;\n    this.player1.update({ ...player1 });\n    this.player2.update({ ...player2 });\n    this.#whoseTurn = gameData.whoseTurn;\n    if (Object.keys(gameData.board)) this.#board = gameData.board;\n  }\n\n  #updateScore() {\n    if (this.gameState === GameState.WIN) this.player1.score += 1;\n    if (this.gameState === GameState.LOSE) this.player2.score += 1;\n    console.log(\"updateScore\", this.player1, this.player2);\n  }\n\n  #switchTurn() {\n    this.#whoseTurn = this.#whoseTurn === 1 ? 2 : 1;\n  }\n\n  #isTieGame() {\n    return Object.keys(this.#board).length === 9;\n  }\n\n  #isCurrentPlayerWinning() {\n    for (const condition of this.#winningCondition) {\n      let matchWinningCondition = condition.every(\n        (cell) => this.#board[cell] === this.#whoseTurn\n      );\n      if (matchWinningCondition) return true;\n    }\n    return false;\n  }\n}\n\nmodule.exports = {\n  Game,\n  GameState,\n};\n\n\n//# sourceURL=webpack:///./src/javascript/Game.js?");

/***/ }),

/***/ "./src/javascript/GameUI.js":
/*!**********************************!*\
  !*** ./src/javascript/GameUI.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/javascript/Game.js\");\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Game__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ \"./src/javascript/Player.js\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Player__WEBPACK_IMPORTED_MODULE_1__);\n\n\n// Game UI Element\nconst board = document.querySelector(\".board\");\nconst resetGameButton = document.querySelector(\".resetGameButton\");\nconst message = document.querySelector(\".message\");\nconst scoreboardPlayers = document.querySelectorAll(\".scoreboard__player\");\nconst player1Scoreboard = scoreboardPlayers[0].children;\nconst player2Scoreboard = scoreboardPlayers[1].children;\nconst body = document.body;\n\n// Game Assets\nconst player1 = new _Player__WEBPACK_IMPORTED_MODULE_1__.Player({\n  name: \"You\",\n  marker: \"X\",\n  type: _Player__WEBPACK_IMPORTED_MODULE_1__.TYPE.HUMAN,\n  score: 0,\n  image: null,\n});\nconst aiPlayer = new _Player__WEBPACK_IMPORTED_MODULE_1__.Player();\nconst game = new _Game__WEBPACK_IMPORTED_MODULE_0__.Game(player1, aiPlayer);\nconst clickSound = new Audio(\"./resources/click.wav\");\nconst resetGameSound = new Audio(\"./resources/reset_game.wav\");\nconst winSound = new Audio(\"./resources/win.wav\");\nconst loseSound = new Audio(\"./resources/lose.wav\");\nconst tieGameSound = new Audio(\"./resources/tie_game.wav\");\n\n// Board\nfunction boardClickEventHandler(event) {\n  const clickedCell = event.target;\n  // disable user to click on same cell twice or to click any cell after game is over\n  if (\n    clickedCell.childNodes.length ||\n    game.gameState !== _Game__WEBPACK_IMPORTED_MODULE_0__.GameState.NOT_GAME_OVER\n  ) {\n    return;\n  }\n\n  clickSound.play();\n  updateBoard(clickedCell);\n  updateGameState();\n  updateScore();\n}\n\nfunction resetBoard() {\n  board.addEventListener(\"click\", boardClickEventHandler);\n  const markedCells = document.querySelectorAll(\".board__cell-marked\");\n  markedCells.forEach((cell) => cell.remove());\n  message.innerText = \"\";\n}\n\nfunction updateBoard(clickedCell) {\n  game.updateBoard(clickedCell.id);\n  const markEle = document.createElement(\"div\");\n  markEle.innerText = game.currentTurnPlayer().marker;\n  markEle.classList.add(\"board__cell-marked\");\n  clickedCell.appendChild(markEle);\n}\n\nfunction updateScore() {\n  player1Scoreboard[1].innerText = game.player1.score;\n  player2Scoreboard[1].innerText = game.player2.score;\n}\n\nfunction updatePlayerName() {\n  player1Scoreboard[0].innerText = game.player1.name;\n  player2Scoreboard[0].innerText = game.player2.name;\n}\n\nfunction updateGameState() {\n  let gameState = game.updateGameState();\n  switch (gameState) {\n    case _Game__WEBPACK_IMPORTED_MODULE_0__.GameState.WIN:\n      message.innerText = \"You WIN!\";\n      winSound.play();\n      break;\n    case _Game__WEBPACK_IMPORTED_MODULE_0__.GameState.LOSE:\n      message.innerText = \"You LOSE!\";\n      loseSound.play();\n      break;\n    case _Game__WEBPACK_IMPORTED_MODULE_0__.GameState.TIE:\n      message.innerText = \"TIE GAME!\";\n      tieGameSound.play();\n      break;\n    default:\n      message.innerText = \"Turn: \" + game.nextTurnPlayer().name;\n      break;\n  }\n}\n\nresetGameButton.addEventListener(\"click\", (event) => {\n  resetGameSound.play();\n  resetBoard();\n  game.resetBoard();\n});\n\n// Player Form\nconst playerForm = document.querySelector(\".player_form\");\nconst inputs = playerForm.querySelectorAll(\"input\");\nconst reader = new FileReader();\nfunction updatePlayerCustomziation() {\n  const name = inputs[0].value;\n  const marker = inputs[1].value;\n  const file = inputs[2].files[0];\n  if (file) {\n    reader.readAsDataURL(file);\n    reader.onload = () => {\n      const image = reader.result;\n      player1.update({ name, marker, image });\n      body.style.backgroundImage = `url(${image})`;\n      body.style.backgroundSize = \"cover\";\n    };\n  } else {\n    player1.update({ name, marker });\n  }\n  player1Scoreboard[0].innerText = name;\n}\n\nplayerForm.addEventListener(\"submit\", (event) => {\n  event.preventDefault();\n  updatePlayerCustomziation();\n});\n\n// Start game\nconst gameData = JSON.parse(localStorage.getItem(\"gameData\"));\n\nfunction loadBoard(board) {\n  if (Object.keys(gameData.board)) {\n    Object.entries(gameData.board).forEach(([positionOfMarkedCell, player]) => {\n      const cell = document.getElementById(`${positionOfMarkedCell}`);\n      const markEle = document.createElement(\"div\");\n      markEle.innerText = game.findPlayerBywhoseTurn(player).marker;\n      markEle.classList.add(\"board__cell-marked\");\n      cell.appendChild(markEle);\n    });\n  }\n}\nfunction loadGameData() {\n  game.loadGameDate();\n  if (!gameData) return;\n  const player1 = gameData.player1;\n  const player2 = gameData.player2;\n  loadBoard(gameData.board);\n  updateScore();\n  updatePlayerName();\n\n  // display next turn player\n  message.innerText =\n    \"Turn: \" + (gameData.whoseTurn === 1 ? player1.name : player2.name);\n  // display background image\n  body.style.backgroundImage = `url(${gameData.image})`;\n}\n\nloadGameData();\nboard.addEventListener(\"click\", boardClickEventHandler);\n\n\n//# sourceURL=webpack:///./src/javascript/GameUI.js?");

/***/ }),

/***/ "./src/javascript/Player.js":
/*!**********************************!*\
  !*** ./src/javascript/Player.js ***!
  \**********************************/
/***/ ((module) => {

eval("const TYPE = {\n  HUMAN: \"human\",\n  AI: \"ai\",\n};\nclass Player {\n  constructor(\n    { name, marker, score, image, type } = {\n      name: \"Unbeatable AI\",\n      marker: \"🤖\",\n      type: TYPE.HUMAN,\n      score: 0,\n      image: null,\n    }\n  ) {\n    this.name = name;\n    this.marker = marker;\n    this.score = score;\n    this.type = type;\n    this.image = image;\n  }\n\n  update({ name, marker, score, image }) {\n    if (name) this.name = name;\n    if (marker) this.marker = marker;\n    if (score !== 0) this.score = score;\n    if (image) this.image = image;\n  }\n}\n\nmodule.exports = {\n  Player,\n  TYPE,\n};\n\n\n//# sourceURL=webpack:///./src/javascript/Player.js?");

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