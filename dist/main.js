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

eval("class Game {\n  #winningCondition = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9],\n    [1, 4, 7],\n    [2, 5, 8],\n    [3, 6, 9],\n    [1, 5, 9],\n    [3, 5, 7],\n  ];\n  #board;\n  #player1;\n  #player2;\n  constructor() {\n    this.#board = {};\n    this.#player1 = \"X\";\n    this.#player2 = \"O\";\n    this.whoseTurn = this.#player1;\n  }\n  checkGameOver(clickedCell) {\n    let gameOver = false;\n    // save the player and position of clicked cell to board\n    this.#board[clickedCell] = this.whoseTurn;\n    console.log(this.#board);\n    // check if game is over\n    if (this.whoseTurn === this.#player1) {\n      // check if player1 win\n      for (const condition of this.#winningCondition) {\n        gameOver = condition.every(\n          (cell) => this.#board[cell] === this.#player1\n        );\n        if (gameOver) return this.#player1 + \" Won!\";\n      }\n    } else {\n      // check if player2 win\n      for (const condition of this.#winningCondition) {\n        gameOver = condition.every(\n          (cell) => this.#board[cell] === this.#player2\n        );\n        if (gameOver) return this.#player2 + \" Won!\";\n      }\n    }\n    // check if it is a tie by checking number of marked cells\n    Object.keys(this.#board).length === 9 ? (gameOver = true) : null;\n    if (gameOver) return \"Tie Game\";\n    // change turn\n    this.whoseTurn =\n      this.whoseTurn === this.#player1 ? this.#player2 : this.#player1;\n    return gameOver;\n  }\n  startNewGame() {\n    this.#board = {};\n  }\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/Game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.js\");\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Game__WEBPACK_IMPORTED_MODULE_0__);\n\nconst board = document.querySelector(\".board\");\nconst playGameButton = document.querySelector(\".playGameButton\");\nconst message = document.querySelector(\".message\");\nconst game = new (_Game__WEBPACK_IMPORTED_MODULE_0___default())();\n\nfunction boardClickEventHandler(event) {\n  const clickedCell = event.target;\n  if (clickedCell.childNodes.length) return;\n  const markEle = document.createElement(\"div\");\n  markEle.innerText = game.whoseTurn;\n  markEle.classList.add(\"board__cell-marked\");\n  clickedCell.appendChild(markEle);\n  let gameOverMessage = game.checkGameOver(clickedCell.id);\n  if (gameOverMessage) {\n    message.innerText = gameOverMessage;\n  } else {\n    message.innerText = \"Turn: \" + game.whoseTurn;\n  }\n}\nboard.addEventListener(\"click\", boardClickEventHandler);\n\nplayGameButton.addEventListener(\"click\", (event) => {\n  const markedCells = document.querySelectorAll(\".board__cell-marked\");\n  markedCells.forEach((cell) => cell.remove());\n  game.startNewGame();\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

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