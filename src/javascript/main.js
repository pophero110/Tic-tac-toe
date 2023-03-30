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

eval("class Game {\n  #winningCondition = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9],\n    [1, 4, 7],\n    [2, 5, 8],\n    [3, 6, 9],\n    [1, 5, 9],\n    [3, 5, 7],\n  ];\n  #board;\n  #player1Marker;\n  #player2Marker;\n  #player1Name;\n  #player2Name;\n  constructor() {\n    this.#board = {};\n    this.#player1Marker = \"X\";\n    this.#player2Marker = \"O\";\n    this.#player1Name = \"Anonymous\";\n    this.#player2Name = \"P2\";\n    this.player1WinCount = 0;\n    this.player2WinCount = 0;\n    this.whoseTurn = true; // true means player 1, false means player2\n\n    this.#loadGameDate();\n  }\n  /**\n   * Determines whether the game is over based on the marked cells on board.\n   * Returns a message indicating the winner of the game, a tie, or that the game is not over.\n   * If player 1 wins, the message will be \"{player 1 name} won!\".\n   * If player 2 wins, the message will be \"{player 2 name} won!\".\n   * If the game is tied, the message will be \"Tie game\".\n   * Otherwise, an empty string is returned.\n   * @param {number} positionOfMarkedCell - The position of the newly marked cell, must be a number between 1 and 9 (inclusive).\n   * @returns {string} - A message indicating the winner of the game, a tie, or that the game is not over.\n   */\n  checkGameOver(positionOfMarkedCell) {\n    const messages = [\n      `${this.whoseTurn === 0 ? this.#player2Name : this.#player1Name} Won!`,\n      \"Tie Game\",\n      \"\",\n    ];\n    this.#updateBoard(positionOfMarkedCell);\n    if (this.#isCurrentPlayerWinning()) {\n      this.#updateScoreboard();\n      return messages[0];\n    }\n    if (this.#isTieGame()) return messages[1];\n    this.#switchTurn();\n    this.saveGameData();\n    return messages[2];\n  }\n\n  resetBoard() {\n    this.#board = {};\n    this.whoseTurn = true;\n    this.saveGameData(true);\n  }\n\n  customizePlayer(name, marker, image = null) {\n    this.#player1Marker = marker;\n    this.#player1Name = name;\n    this.saveGameData(false, image);\n  }\n\n  currentPlayerMarker() {\n    return this.whoseTurn ? this.#player1Marker : this.#player2Marker;\n  }\n\n  currentPlayerName() {\n    return this.whoseTurn ? this.#player1Name : this.#player2Name;\n  }\n\n  saveGameData(resetBoard = false, image = null) {\n    if (resetBoard) {\n      localStorage.setItem(\n        \"player1\",\n        JSON.stringify({\n          name: this.#player1Name,\n          marker: this.#player1Marker,\n          score: this.player1WinCount,\n          board: {},\n          whoseTurn: true,\n          image: image,\n        })\n      );\n    } else {\n      localStorage.setItem(\n        \"player1\",\n        JSON.stringify({\n          name: this.#player1Name,\n          marker: this.#player1Marker,\n          score: this.player1WinCount,\n          board: this.#board,\n          whoseTurn: this.whoseTurn,\n          image: image,\n        })\n      );\n    }\n\n    console.log(\"save game\", JSON.parse(localStorage.getItem(\"player1\")));\n  }\n\n  #loadGameDate() {\n    const player = JSON.parse(localStorage.getItem(\"player1\"));\n    console.log(\"load game\", player);\n    if (!player) return;\n    this.whoseTurn = player.whoseTurn;\n    if (player.name) this.#player1Name = player.name;\n    if (player.marker) this.#player1Marker = player.marker;\n    if (player.score) this.player1WinCount = player.score;\n    if (Object.keys(player.board)) this.#board = player.board;\n  }\n  #isTieGame() {\n    return Object.keys(this.#board).length === 9;\n  }\n\n  #isCurrentPlayerWinning() {\n    for (const condition of this.#winningCondition) {\n      let matchWinningCondition = condition.every(\n        (cell) => this.#board[cell] === this.whoseTurn\n      );\n      if (matchWinningCondition) return true;\n    }\n    return false;\n  }\n\n  // save the player and position of marked cell to board\n  #updateBoard(positionOfMarkedCell) {\n    this.#board[positionOfMarkedCell] = this.whoseTurn;\n  }\n\n  #switchTurn() {\n    this.whoseTurn = !this.whoseTurn;\n  }\n\n  #updateScoreboard() {\n    this.whoseTurn ? this.player1WinCount++ : this.player2WinCount++;\n  }\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/javascript/Game.js?");

/***/ }),

/***/ "./src/javascript/GameUI.js":
/*!**********************************!*\
  !*** ./src/javascript/GameUI.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/javascript/Game.js\");\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Game__WEBPACK_IMPORTED_MODULE_0__);\n\n\n// Game UI Element\nconst board = document.querySelector(\".board\");\nconst resetGameButton = document.querySelector(\".resetGameButton\");\nconst message = document.querySelector(\".message\");\nconst scoreboardPlayers = document.querySelectorAll(\".scoreboard__player\");\nconst playerNameTextBox = scoreboardPlayers[0].children[0];\nconst playerScoreText = scoreboardPlayers[0].children[1];\nconst body = document.body;\n\n// Game Assets\nconst game = new (_Game__WEBPACK_IMPORTED_MODULE_0___default())();\nconst playerData = JSON.parse(localStorage.getItem(\"player1\"));\nconst clickSound = new Audio(\"./resources/click_sound.wav\");\nconst resetGame = new Audio(\"\");\n\n// Board\nfunction loadGame() {\n  if (!playerData) return;\n  playerNameTextBox.innerText = playerData.name;\n  playerScoreText.innerText = playerData.score;\n  console.log(\"load game ui\", playerData);\n  if (Object.keys(playerData.board)) {\n    Object.entries(playerData.board).forEach(\n      ([positionOfMarkedCell, player]) => {\n        const cell = document.getElementById(`${positionOfMarkedCell}`);\n        const markEle = document.createElement(\"div\");\n        markEle.innerText = player ? playerData.marker : \"O\";\n        markEle.classList.add(\"board__cell-marked\");\n        cell.appendChild(markEle);\n      }\n    );\n    message.innerText =\n      \"Turn: \" + (playerData.whoseTurn ? playerData.name : \"P2\");\n    body.style.backgroundImage = `url(${playerData.image})`;\n  }\n  board.addEventListener(\"click\", boardClickEventHandler);\n}\nloadGame();\n\nfunction boardClickEventHandler(event) {\n  const clickedCell = event.target;\n  clickSound.play();\n  // disable user to click on same cell twice\n  if (clickedCell.childNodes.length) return;\n  updateBoard(clickedCell);\n  checkGameOver(clickedCell);\n}\n\nfunction clearBoard() {\n  board.addEventListener(\"click\", boardClickEventHandler);\n  const markedCells = document.querySelectorAll(\".board__cell-marked\");\n  markedCells.forEach((cell) => cell.remove());\n  message.innerText = \"\";\n}\n\nfunction updateBoard(clickedCell) {\n  const markEle = document.createElement(\"div\");\n  markEle.innerText = game.currentPlayerMarker();\n  markEle.classList.add(\"board__cell-marked\");\n  clickedCell.appendChild(markEle);\n}\n\nfunction updateScoreboard() {\n  scoreboardPlayers.forEach((playerEle, index) => {\n    playerEle.children[1].innerText =\n      index === 0 ? game.player1WinCount : game.player2WinCount;\n  });\n}\n\nfunction checkGameOver(clickedCell) {\n  let gameOverMessage = game.checkGameOver(clickedCell.id);\n  if (gameOverMessage) {\n    message.innerText = gameOverMessage;\n    board.removeEventListener(\"click\", boardClickEventHandler);\n    updateScoreboard();\n    game.saveGameData(true);\n  } else {\n    message.innerText = \"Turn: \" + game.currentPlayerName();\n  }\n}\n\nresetGameButton.addEventListener(\"click\", (event) => {\n  clearBoard();\n  game.resetBoard();\n});\n\n// Customziation Form\nconst form = document.querySelector(\".form\");\nconst inputs = form.querySelectorAll(\"input\");\nconst reader = new FileReader();\nfunction updatePlayerCustomziation() {\n  const name = inputs[0].value;\n  const marker = inputs[1].value;\n  const file = inputs[2].files[0];\n  if (file) {\n    reader.readAsDataURL(file);\n    reader.onload = () => {\n      const imgData = reader.result;\n      console.log({ file, imgData });\n      game.customizePlayer(name, marker, imgData);\n      body.style.backgroundImage = `url(${imgData})`;\n      body.style.backgroundSize = \"cover\";\n    };\n  } else {\n    game.customizePlayer(name, marker);\n  }\n  console.log(playerData);\n  playerNameTextBox.innerText = name;\n}\n\nform.addEventListener(\"submit\", (event) => {\n  event.preventDefault();\n  updatePlayerCustomziation();\n});\n\n\n//# sourceURL=webpack:///./src/javascript/GameUI.js?");

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