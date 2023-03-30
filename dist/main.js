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

/***/ "./src/Game.js":
/*!*********************!*\
  !*** ./src/Game.js ***!
  \*********************/
/***/ ((module) => {

eval("class Game {\n  #winningCondition = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9],\n    [1, 4, 7],\n    [2, 5, 8],\n    [3, 6, 9],\n    [1, 5, 9],\n    [3, 5, 7],\n  ];\n  #board;\n  #player1;\n  #player2;\n  constructor() {\n    this.#board = {};\n    this.#player1 = \"X\";\n    this.#player2 = \"O\";\n    this.player1WinCount = 0;\n    this.player2WinCount = 0;\n    this.whoseTurn = this.#player1;\n  }\n  /**\n   * Determines whether the game is over based on the marked cells on board.\n   * Returns a message indicating the winner of the game, a tie, or that the game is not over.\n   * If player 1 wins, the message will be \"{player 1 name} won!\".\n   * If player 2 wins, the message will be \"{player 2 name} won!\".\n   * If the game is tied, the message will be \"Tie game\".\n   * Otherwise, an empty string is returned.\n   * @param {number} positionOfMarkedCell - The position of the newly marked cell, must be a number between 1 and 9 (inclusive).\n   * @returns {string} - A message indicating the winner of the game, a tie, or that the game is not over.\n   */\n  checkGameOver(positionOfMarkedCell) {\n    const messages = [`${this.whoseTurn} Won!`, \"Tie Game\", \"\"];\n    this.#updateBoard(this.whoseTurn, positionOfMarkedCell);\n    if (this.#isCurrentPlayerWinning()) {\n      this.#updateScoreboard();\n      return messages[0];\n    }\n    if (this.#isTieGame()) return messages[1];\n    this.#switchTurn();\n    return messages[2];\n  }\n\n  resetBoard() {\n    this.#board = {};\n    this.whoseTurn = this.#player1;\n  }\n\n  #isTieGame() {\n    return Object.keys(this.#board).length === 9;\n  }\n\n  #isCurrentPlayerWinning() {\n    for (const condition of this.#winningCondition) {\n      let matchWinningCondition = condition.every(\n        (cell) => this.#board[cell] === this.whoseTurn\n      );\n      if (matchWinningCondition) return true;\n    }\n    return false;\n  }\n\n  // save the player and position of marked cell to board\n  #updateBoard(player, positionOfMarkedCell) {\n    this.#board[positionOfMarkedCell] = player;\n  }\n\n  #switchTurn() {\n    this.whoseTurn =\n      this.whoseTurn === this.#player1 ? this.#player2 : this.#player1;\n  }\n\n  #updateScoreboard() {\n    this.whoseTurn === this.#player1\n      ? this.player1WinCount++\n      : this.player2WinCount++;\n  }\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/Game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.js\");\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Game__WEBPACK_IMPORTED_MODULE_0__);\n\nconst board = document.querySelector(\".board\");\nconst playGameButton = document.querySelector(\".playGameButton\");\nconst message = document.querySelector(\".message\");\nconst scoreboardPlayers = document.querySelectorAll(\".scoreboard__player\");\nlet game;\n\nfunction clearBoard() {\n  board.addEventListener(\"click\", boardClickEventHandler);\n  const markedCells = document.querySelectorAll(\".board__cell-marked\");\n  markedCells.forEach((cell) => cell.remove());\n  message.innerText = \"\";\n}\n\nfunction updateBoard(clickedCell) {\n  const markEle = document.createElement(\"div\");\n  markEle.innerText = game.whoseTurn;\n  markEle.classList.add(\"board__cell-marked\");\n  clickedCell.appendChild(markEle);\n}\nfunction updateScoreboard() {\n  scoreboardPlayers.forEach((playerEle, index) => {\n    playerEle.children[1].innerText =\n      index === 0 ? game.player1WinCount : game.player2WinCount;\n  });\n}\n\nfunction checkGameOver(clickedCell) {\n  let gameOverMessage = game.checkGameOver(clickedCell.id);\n  if (gameOverMessage) {\n    message.innerText = gameOverMessage;\n    board.removeEventListener(\"click\", boardClickEventHandler);\n    updateScoreboard();\n  } else {\n    message.innerText = \"Turn: \" + game.whoseTurn;\n  }\n}\n\nfunction boardClickEventHandler(event) {\n  const clickedCell = event.target;\n  // disable user to click on same cell twice\n  if (clickedCell.childNodes.length) return;\n  updateBoard(clickedCell);\n  checkGameOver(clickedCell);\n}\n\nplayGameButton.addEventListener(\"click\", (event) => {\n  game ||= new (_Game__WEBPACK_IMPORTED_MODULE_0___default())();\n  clearBoard();\n  game.resetBoard();\n});\n\n// const fileInput = document.getElementById(\"fileInput\");\n// const saveButton = document.getElementById(\"saveButton\");\n// const image = document.querySelector(\"img\");\n// image.src = localStorage.getItem(\"myImage\");\n// saveButton.addEventListener(\"click\", () => {\n//   const file = fileInput.files[0];\n//   const reader = new FileReader();\n\n//   reader.readAsDataURL(file);\n//   reader.onload = () => {\n//     const imgData = reader.result;\n//     localStorage.setItem(\"myImage\", imgData);\n//     alert(\"Image saved successfully!\");\n//   };\n// });\n\n\n//# sourceURL=webpack:///./src/index.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;