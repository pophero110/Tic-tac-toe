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

eval("const GameState = {\n  NOT_GAME_OVER: \"not_game_over\",\n  WIN: \"win\",\n  LOSE: \"lose\",\n  TIE: \"tie\",\n};\n\nclass Game {\n  #winningCondition = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9],\n    [1, 4, 7],\n    [2, 5, 8],\n    [3, 6, 9],\n    [1, 5, 9],\n    [3, 5, 7],\n  ];\n  #board;\n  #whoseTurn;\n\n  constructor(player1, player2) {\n    this.#board = {};\n    this.#whoseTurn = false; // true means player 1, false means player2\n    this.gameState = GameState.NOT_GAME_OVER;\n    this.player1 = player1;\n    this.player2 = player2;\n\n    this.#loadGameDate();\n  }\n  /**\n   * Determines whether the game is over based on the marked cells on board.\n   * Returns a message indicating the winner of the game, a tie, or that the game is not over.\n   * If player 1 wins, the message will be \"{player 1 name} won!\".\n   * If player 2 wins, the message will be \"{player 2 name} won!\".\n   * If the game is tied, the message will be \"Tie game\".\n   * Otherwise, an empty string is returned.\n   * @param {number} positionOfMarkedCell - The position of the newly marked cell, must be a number between 1 and 9 (inclusive).\n   * @returns {string} - A message indicating the winner of the game, a tie, or that the game is not over.\n   */\n  updateGameState() {\n    if (this.#isTieGame()) this.gameState = GameState.TIE;\n    if (this.#isCurrentPlayerWinning())\n      this.gameState = this.whoseTurn ? GameState.WIN : GameState.LOSE;\n\n    this.saveGameData();\n    return this.gameState;\n  }\n\n  // save the player and position of marked cell to board\n  // and swtich the turn\n  updateBoard(positionOfMarkedCell) {\n    this.#board[positionOfMarkedCell] = this.#whoseTurn;\n    this.#switchTurn();\n  }\n\n  resetBoard() {\n    this.#board = {};\n    this.#whoseTurn = false;\n    this.gameState = GameState.NOT_GAME_OVER;\n    this.saveGameData();\n  }\n\n  currentTurnPlayer() {\n    return this.#whoseTurn ? this.player1 : this.player2;\n  }\n  nextTurnPlayer() {\n    return this.#whoseTurn ? this.player2 : this.player1;\n  }\n\n  saveGameData(image = null) {\n    localStorage.setItem(\n      \"gameData\",\n      JSON.stringify({\n        board: this.gameState === GameState.NOT_GAME_OVER ? this.#board : {},\n        whoseTurn: this.whoseTurn,\n        image: image,\n        player1: this.player1,\n        player2: this.player2,\n      })\n    );\n    console.log(\"save game\", JSON.parse(localStorage.getItem(\"gameData\")));\n  }\n\n  #loadGameDate() {\n    const gameData = JSON.parse(localStorage.getItem(\"gameData\"));\n    console.log(\"load game\", gameData);\n    if (!gameData) return;\n    const player1 = gameData.player1;\n    const player2 = gameData.player2;\n    this.player1.update({\n      name: player1.name,\n      marker: player1.marker,\n      socre: player1.score,\n      image: player1.image,\n    });\n    this.player2.update({\n      name: player2.name,\n      marker: player2.marker,\n      socre: player2.score,\n      image: player2.image,\n    });\n    this.#whoseTurn = gameData.whoseTurn;\n    if (Object.keys(gameData.board)) this.#board = gameData.board;\n  }\n\n  updateScoreboard() {\n    if (this.gameState === GameState.WIN) this.player1.score++;\n    if (this.gameState === GameState.LOSE) this.player2.score++;\n  }\n\n  #isTieGame() {\n    return Object.keys(this.#board).length === 9;\n  }\n\n  #isCurrentPlayerWinning() {\n    for (const condition of this.#winningCondition) {\n      let matchWinningCondition = condition.every(\n        (cell) => this.#board[cell] === this.#whoseTurn\n      );\n      if (matchWinningCondition) return true;\n    }\n    return false;\n  }\n\n  #switchTurn() {\n    this.#whoseTurn = !this.#whoseTurn;\n  }\n}\n\nmodule.exports = {\n  Game,\n  GameState,\n};\n\n\n//# sourceURL=webpack:///./src/javascript/Game.js?");

/***/ }),

/***/ "./src/javascript/GameUI.js":
/*!**********************************!*\
  !*** ./src/javascript/GameUI.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/javascript/Game.js\");\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Game__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ \"./src/javascript/Player.js\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Player__WEBPACK_IMPORTED_MODULE_1__);\n\n\n// Game UI Element\nconst board = document.querySelector(\".board\");\nconst resetGameButton = document.querySelector(\".resetGameButton\");\nconst message = document.querySelector(\".message\");\nconst scoreboardPlayers = document.querySelectorAll(\".scoreboard__player\");\nconst playerNameTextBox = scoreboardPlayers[0].children[0];\nconst playerScoreText = scoreboardPlayers[0].children[1];\nconst body = document.body;\n\n// Game Assets\nconst player1 = new (_Player__WEBPACK_IMPORTED_MODULE_1___default())(\"You\", \"X\", \"human\");\nconst aiPlayer = new (_Player__WEBPACK_IMPORTED_MODULE_1___default())();\nconst game = new _Game__WEBPACK_IMPORTED_MODULE_0__.Game(player1, aiPlayer);\nconst gameData = JSON.parse(localStorage.getItem(\"gameData\"));\nconst clickSound = new Audio(\"./resources/click.wav\");\nconst resetGameSound = new Audio(\"./resources/reset_game.wav\");\nconst winSound = new Audio(\"./resources/win.wav\");\nconst loseSound = new Audio(\"./resources/lose.wav\");\nconst tieGameSound = new Audio(\"./resources/tie_game.wav\");\n\n// Board\nfunction loadGameData() {\n  console.log(\"load game ui\", gameData);\n  if (!gameData) return;\n  const player1 = gameData.player1;\n  const player2 = gameData.player2;\n  if (Object.keys(gameData.board)) {\n    Object.entries(gameData.board).forEach(([positionOfMarkedCell, player]) => {\n      const cell = document.getElementById(`${positionOfMarkedCell}`);\n      updateBoard(cell);\n    });\n    message.innerText =\n      \"Turn: \" + (gameData.whoseTurn ? player1.name : player2.name);\n    body.style.backgroundImage = `url(${gameData.image})`;\n  }\n}\n\nfunction boardClickEventHandler(event) {\n  const clickedCell = event.target;\n  // disable user to click on same cell twice or to click any cell after game is over\n  if (\n    clickedCell.childNodes.length ||\n    game.gameState !== _Game__WEBPACK_IMPORTED_MODULE_0__.GameState.NOT_GAME_OVER\n  ) {\n    return;\n  }\n\n  clickSound.play();\n  updateBoard(clickedCell);\n  updateGameState();\n}\n\nfunction resetBoard() {\n  board.addEventListener(\"click\", boardClickEventHandler);\n  const markedCells = document.querySelectorAll(\".board__cell-marked\");\n  markedCells.forEach((cell) => cell.remove());\n  message.innerText = \"\";\n}\n\nfunction updateBoard(clickedCell) {\n  game.updateBoard(clickedCell.id);\n  const markEle = document.createElement(\"div\");\n  markEle.innerText = game.currentTurnPlayer().marker;\n  markEle.classList.add(\"board__cell-marked\");\n  clickedCell.appendChild(markEle);\n}\n\nfunction updateScoreboard() {\n  game.updateScoreboard();\n  scoreboardPlayers.forEach((playerEle, index) => {\n    playerEle.children[1].innerText =\n      index === 0 ? game.player1.score : game.player2.score;\n  });\n}\n\nfunction updateGameState() {\n  let gameState = game.updateGameState();\n  switch (gameState) {\n    case _Game__WEBPACK_IMPORTED_MODULE_0__.GameState.WIN:\n      message.innerText = \"You WIN!\";\n      updateScoreboard();\n      winSound.play();\n      break;\n    case _Game__WEBPACK_IMPORTED_MODULE_0__.GameState.LOSE:\n      message.innerText = \"You LOSE!\";\n      updateScoreboard();\n      loseSound.play();\n      break;\n    case _Game__WEBPACK_IMPORTED_MODULE_0__.GameState.TIE:\n      message.innerText = \"TIE GAME!\";\n      tieGameSound.play();\n      break;\n    default:\n      message.innerText = \"Turn: \" + game.nextTurnPlayer().name;\n      break;\n  }\n}\n\nresetGameButton.addEventListener(\"click\", (event) => {\n  resetGameSound.play();\n  resetBoard();\n  game.resetBoard();\n});\n\n// Player Form\nconst playerForm = document.querySelector(\".player_form\");\nconst inputs = playerForm.querySelectorAll(\"input\");\nconst reader = new FileReader();\nfunction updatePlayerCustomziation() {\n  const name = inputs[0].value;\n  const marker = inputs[1].value;\n  const file = inputs[2].files[0];\n  if (file) {\n    reader.readAsDataURL(file);\n    reader.onload = () => {\n      const image = reader.result;\n      player1.update({ name, marker, image });\n      body.style.backgroundImage = `url(${image})`;\n      body.style.backgroundSize = \"cover\";\n    };\n  } else {\n    player1.update({ name, marker });\n    name, marker;\n  }\n  playerNameTextBox.innerText = name;\n}\n\nplayerForm.addEventListener(\"submit\", (event) => {\n  event.preventDefault();\n  updatePlayerCustomziation();\n});\n\n// Start game\nloadGameData();\nboard.addEventListener(\"click\", boardClickEventHandler);\n\n\n//# sourceURL=webpack:///./src/javascript/GameUI.js?");

/***/ }),

/***/ "./src/javascript/Player.js":
/*!**********************************!*\
  !*** ./src/javascript/Player.js ***!
  \**********************************/
/***/ ((module) => {

eval("const TYPE = {\n  human: \"human\",\n  ai: \"ai\",\n};\nclass Player {\n  constructor(\n    name = \"Unbeatable AI\",\n    marker = \"🤖\",\n    type = TYPE[\"human\"],\n    score = 0,\n    image = null\n  ) {\n    this.name = name;\n    this.marker = marker;\n    this.score = score;\n    this.type = type;\n    this.image = image;\n  }\n\n  update(attributes) {\n    const { name, marker, score, image } = attributes;\n    this.name = name;\n    this.marker = marker;\n    this.score ||= score;\n    this.image = image;\n  }\n}\n\nmodule.exports = Player;\n\n\n//# sourceURL=webpack:///./src/javascript/Player.js?");

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