# _Tic-tac-toe_ Game

Developer: Jeff Ou  
Main goal: Make a fancy tic-tac-toe game using all of my knowledge about web development

# Technologies

- **Webpack**: to combine multiple JS files into one JS file 'main.js'
- **Sass**: improves the workflow and efficiency of CSS development, also combines multiple CSS files into one CSS file 'main.css'
- **Figma**: Design [UI wireframes](https://www.figma.com/file/pONrt65x6N0M6ISI2OpVKh/Tic-Tac-Toe-UI-Design?node-id=6%3A40&t=g5C6NvLxxihRRiIy-1)

# MVP - Bronze

## User stories

- As a player, I should be able to start a new tic-tac-toe game ✅
- As a player, I should be able to click on a square to add X first and then O, and so on ✅
- As a player, I should be shown a message after each turn for if I win, lose, tie or whose turn it is next ✅
- As a player, I should not be able to click the same square twice ✅
- As a player, I should be shown a message when I win, lose or tie ✅
- As a player, I should not be able to continue playing once I win, lose, or tie ✅
- As a player, I should be able to play the game again without refreshing the page ✅

## [UI Wireframe](https://www.figma.com/file/pONrt65x6N0M6ISI2OpVKh/Tic-Tac-Toe-UI-Design?node-id=0%3A1&t=ZF6JZwuBHaZpcvQp-1)

![ui_wireframe image](./resources/ui_wireframe.png)

## Bronze Pseudocode

### HTML:

- Create a div to represent the board
  - Add class 'board'
- Create 9 div inside of the board to represent the cells
  - Add a unique id to each div: 1 to 9
  - ![board](./resources/board_with_id.png)
  - Add a class 'cell' to each div
- Create a header for the title 'Tic-Tac-Toe'
- Create a 'Play game' button
  - Add class 'resetGameButton'
- Create a div to display a message
  - Add class 'message'

### CSS:

- Use Grid to layout cells to make a 3 x 3 Board
- Add accent color to the 'Play game' button
- Add a hover effect on the 'Play game' button
- Add a click effect on the 'Play game' button

### JS:

#### Create [a Game class](./src/Game.js) with the following private instance variables:

- board: an empty object to represent the 3 x 3 board, where the key represents the position of the marked cell and the value represents the player; ex: `{1: 'O', 2: 'X', ...}`.
- player1 and player2: strings representing the markers for each player.
- whoseTurn: a string representing the current player's marker, with a default value of player1.
- winningCondition: an array containing 8 sub-arrays, each representing a possible winning combination in the game. Each sub-array contains 3 values that represent the positions of the cells that need to be marked in order to win; ex: `[[1,2,3], [4,5,6], ...]`.

#### The Game class should also have the following public instance methods:

- checkGameOver(positionOfMarkedCell: number): string: a method that checks if the game is over after a player marks a cell. It takes a number representing the position of the newly marked cell and returns a message indicating the winner of the game, a tie, or that the game is not over. The method does the following:
  - Switches turn to the next player.
  - Saves the player and position of the marked cell to board.
  - Checks if there is a winning, losing, or tie condition based on the current state of the board and returns the appropriate message.
- resetBoard(): void: a method that resets the game board by emptying the board object and clearing any messages and marked cells.

#### Add the following event listeners to the UI:

- A click event listener to the .resetGameButton element that reset the game.
- A click event listener to the .board element that calls the checkGameOver method of the current Game instance and updates the UI accordingly.

# MVP - Silver

## User stories (include Pseudocode)

<details>
  <summary>As a player, I want to keep track of multiple game rounds so that I can see how many times I have won, lost, or tied, and keep track of my progress in the game. ✅</summary>

### Pseudocode

#### HTML:

- Create a header element
  - Create a scoreboard element
  - Include the title element

#### JS:

- Add **player1WinCount** and **player2WinCount** private instance variables to the _Game_ class
- Update the scoreboard after any player win
</details>

<details>
<summary>As a player, I want to be able to customize my game token (X, O, name, picture, etc.) so that I can personalize my gaming experience and make it more enjoyable. ✅</summary>

### Pseudocode

#### HTML:

- create a form element
  - create a text input for a name
  - create a text input for a marker
  - create a file input for uploading an image
  - create a button to submit the change

#### JS

- create a function to update the name, marker and image in the HTML
- create a function to update the name and marker in the game instance

</details>

<details>
<summary>As a player, I want my game data to be saved locally using localStorage so that I can continue playing even if I lose internet connectivity or refresh the page. ✅</summary>
</details>
<details>
<summary>As a player, I want audio to be included in the game so that I can have an immersive and enjoyable gaming experience. ✅</summary>
</details>
<details>
<summary>As a player, I want to be able to play against an AI opponent that is programmed to play an unbeatable game so that I can challenge myself and improve my skills. ✅</summary>

### Pseudocode

#### JS:

- How does AI mark the cell?
  - if nextTurnPlayer is AI
    - remove the board click event to prevent it from player clicking
    - call completeTurn() function
    - add board click event back
- How does AI select the cell?
  - create a function 'selectCell' returns the position of the selected cell
    - if AI plays second
      - always select one of corner cells if human player marked center else select center cell
      - block any potential winning combination made by human
      - select the cell that can win the game
      - randomly select empty cell

</details>

<details>
    <summary>As a player, I want the game to be fully responsive so that I can play it on my mobile phone without any issues, and I want the styling to be creative and engaging, using hover effects or animations to enhance the gaming experience.</summary>
</details>

## [UI Wireframe](https://www.figma.com/file/pONrt65x6N0M6ISI2OpVKh/Tic-Tac-Toe-UI-Design?node-id=6%3A40&t=g5C6NvLxxihRRiIy-1)

![sliver_ui_wireframe](./resources/sliver_ui_wireframe.png)

# MVP - Gold

## User stories

- As a player, I want to be able to play the game online with another player
  - As a player, I can join a room to play with another player ✅
  - As a player, I'm not able to mark until it is my turn ✅
  - As a player, my board should be synced with my opponent's ✅
  - As a player, the game should be automatically reset after the game is over and switch sides ✅
  - As an admin, I want each room can only contain at most 2 players ✅

### UI Wireframe

# TODO

1. add page title and icon
2. create folders to organize files
3. add global scoreboard
4. fix tieGameSound load error on production

# Hurdle

1. refactor code - GameUI and Game => Game, Player and GameUI
