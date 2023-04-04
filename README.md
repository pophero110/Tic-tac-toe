# _Tic-tac-toe_ Game

Developer: Jeff Ou  
Main goal: Make a tic-tac-toe game using all of my knowledge about web development  
Link to the game: https://my-tic-tac-toe.herokuapp.com/

# Table of Contents

- [Technologies](#technologies)
- [Technical Requirements](#technical-requirements)
- [App Screenshots](#app-screenshots)
- [Project Breakdown](#project-breakdown)
- [Project Hurdles](#project-hurdles)
- [Projec Wins](#project-wins)
- [Planning diagram](#planning-diagram)
- [TODO](#todo)
- [Credits](#credits)

# Technologies

- **Webpack**: to combine multiple JS files into one JS file 'main.js'
- **Sass**: improves the workflow and efficiency of CSS development, also combines multiple CSS files into one CSS file 'main.css'
- **Figma**: Design [UI wireframes](https://www.figma.com/file/pONrt65x6N0M6ISI2OpVKh/Tic-Tac-Toe-UI-Design?node-id=6%3A40&t=g5C6NvLxxihRRiIy-1)
- **Socket.io**
- **Heroku**

# Technical Requirements

- Render a game board in the browser
- Switch turns between X and O (or whichever markers you select)
- Visually display which side won if a player gets three in a row, or show a draw if neither player wins
- Include separate HTML / CSS / JavaScript files
  Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
- Use JavaScript for DOM manipulation
- Deploy your game online, where the rest of the world can access it
- Use semantic markup for HTML and CSS (adhere to best practices)
- Have well-formatted, and well-commented code

# App Screenshots

![new_game](./resources/app_screenshots/new_game.png)
![win_game](./resources/app_screenshots/win_game.png)
![ai_tie](./resources/app_screenshots/tie_game.png)
![player_form](./resources/app_screenshots/player_form.png)
![join_room_form](./resources/app_screenshots/join_room_form.png)

### On Mobile

![on_mobile](./resources/app_screenshots/on_mobile.png)

### Online Match

![online_match](resources/app_screenshots/online_match.png)

# Project Hurdles

- how to manage the code when adding a new feature
  - always refactor the code after adding a new feature so it's easy to understand and change later.
  - follow principles of KISS, DRY, separation of concerns, one function should do one thing and use meaningful names for variables and functions
- how to manage the data flow
  - use diagram to visualize it

# Project Wins

- The biggest win is that I'm able to fulfill all the user stories! and that made me feel so satisfied!
- Another great win was that I learned the necessity of planning and pseudocode.

# Project Breakdown

<details>
  <summary>MVP - Bronze</summary>

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

#### Create [a Game class](./src/javascript/Game.js) with the following private instance variables:

- board: an empty object to represent the 3 x 3 board, where the key represents the position of the marked cell and the value (_1 means player1; 2 means player 2_) represents the player; ex: `{1: 1, 2: 2, ...}`.
- player1 and player2: object representing the markers for each player.
- whoseTurn: a number representing current turn player `whoseTurn = 1 means  player1 turn`
- winningCombination: an array containing 8 sub-arrays, each representing a possible winning combination in the game. Each sub-array contains 3 values that represent the positions of the cells that need to be marked in order to win; ex: `[[1,2,3], [4,5,6], ...]`.

#### The Game class should also have the following public instance methods:

- checkGameOver(positionOfMarkedCell: number): string: a method that checks if the game is over after a player marks a cell. It takes a number representing the position of the newly marked cell and returns a message indicating the winner of the game, a tie, or that the game is not over. The method does the following:
  - Switches turn to the next player.
  - Saves the player and position of the marked cell to the board.
  - Checks if there is a winning, losing, or tie condition based on the current state of the board and return the appropriate message.
- resetBoard(): void: a method that resets the game board by emptying the board object and clearing any messages and marked cells.

#### Add the following event listeners to the UI:

- A click event listener to the .resetGameButton element that reset the game.
- A click event listener to the .board element that calls the checkGameOver method and updates the UI accordingly.
</details>

<details>
<summary>MVP - Silver</summary>

# MVP - Silver

## User stories

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

- update name, marker and image in UI
- update name, marker and image in the player instance

</details>

<details>
<summary>As a player, I want my game data to be saved locally using localStorage so that I can continue playing even if I lose internet connectivity or refresh the page. ✅</summary>

## Pseudocode

- Create a function saveGameData that saves the current state of the board, whose turn and players' data to localStorage
- Create a function loadGameData that loads game data from localStorage and renders the board and player's info.
</details>
<details>
<summary>As a player, I want audio to be included in the game so that I can have an immersive and enjoyable gaming experience. ✅</summary>

```
const Sounds = {
  click: new Audio("./resources/click.wav"),
  reset: new Audio("./resources/reset_game.wav"),
  win: new Audio("./resources/niceMeme.mp3"),
  lose: new Audio("./resources/lose.wav"),
  tie: new Audio("./resources/tie.wav"),
  matchReady: new Audio("./resources/match_ready.mp3"),
};
```

</details>
<details>
<summary>As a player, I want to be able to play against an AI opponent that is programmed to play an unbeatable game so that I can challenge myself and improve my skills. ✅</summary>

### Pseudocode

- How does AI mark the cell?

```
 WHEN it is AI's turn
  prevent player from marking cell
  complete the turn
  switch turn
```

- How does AI select the cell?

```
  IF AI plays second
    IF it is AI's first turn
      IF center cell is marked
        select corner cell
      ELSE
        select center cell
    ELSE
      select any potential winning combination OR
            FOR each winning combination in the game:
              IF the combination has two cells filled by the AI and one empty cell:
                select the empty cell
      block any potential winning combination made by human OR
            FOR each winning combination in the game:
              IF the combination has two cells filled by the human and one empty cell:
                select the empty cell
      randomly select empty cell
  IF AI plays first
    SET winning = false
    SET previousMove;
    IF it is AI's first turn
      select center cell
    ELSE
      select any potential winning combination OR
      block any potential winning combination made by human OR
      If corner cells are unmarked and !winning
        SET winning = true
        If humanMove === 2 or humanMove === 8
          select 4
          SET previousMove = 4
        ELSE IF humanMove === 4 or humanMove === 6
          select 2
          SET previousMove = 2
      ELSE IF winning
        IF previousMove === 4
          select 7
        ELSE
          select 1
      ELSE
        randomly select empty cell
```

</details>
<details>
 <summary>As a player, I want the game to be fully responsive so that I can play it on my mobile phone without any issues, and I want the styling to be creative and engaging, using hover effects or animations to enhance the gaming experience. ✅</summary>

```
main {
  display: grid;
  grid-template-columns: repeat(3, fit-content);
  grid-template-rows: repeat(3, fit-content);
  grid-row-gap: 0.5rem;
  grid-column-gap: 1rem;
  grid-template-areas:
    ". messageBar ."
    "sidebarLeft board sidebarRight"
    ". resetGameButton .";
}

@media screen and (max-width: 600px) {
  main {
    margin-top: 0.8rem;
    grid-template-columns: repeat(2, fit-content);
    grid-template-rows: repeat(4, fit-content);
    grid-template-areas:
      "messageBar messageBar"
      "board board"
      "resetGameButton resetGameButton"
      "sidebarLeft sidebarRight";
  }
  .scoreboard {
    width: 100%;
  }
  .resetGameButton {
    display: none;
  }
}
```

</details>

## [UI Wireframe](https://www.figma.com/file/pONrt65x6N0M6ISI2OpVKh/Tic-Tac-Toe-UI-Design?node-id=6%3A40&t=g5C6NvLxxihRRiIy-1)

![sliver_ui_wireframe](./resources/sliver_ui_wireframe.png)

</details>

<details>
<summary>MVP - Gold </summary>

# MVP - Gold

## User stories

- As a player, I want to be able to play the game online with another player
  - As a player, I can join a room to play with another player ✅
  - As a player, I'm not able to mark until it is my turn ✅
  - As a player, my board should be synced with my opponent's ✅
  - As a player, the game should be automatically reset after the game is over and switch sides ✅
  - As a player, I should be able to see the opponent's name, score and marker. ✅
  - As an admin, I want each room can only contain at most 2 players ✅

## Grid Layout

![grid](./resources/grid.png)

</details>

# Planning diagram

<details>
<summary>Local Storage sequence chart</summary>

![image](./resources/diagrams/sequence_diagram.png)
[Link to chart](https://drive.google.com/file/d/14rg_b02h7OBDsa5ZECp-IMLD1gSfvWJV/view?usp=sharing)

</details>

<details>
<summary>Online game sequence chart</summary>

![image](./resources/diagrams/online_game.png)
[Link to chart](https://drive.google.com/file/d/1bfKOrame39ZxCFQLEWaMI99M4pYDVyu8/view?usp=sharing)

</details>

# TODO

1. add page title and icon ✅
2. create folders to organize files ✅
3. fix tieGameSound load error on production ✅
4. add a footer that includes the GitHub repo and LinkedIn
5. display room number and online status
6. remove text select on cell ✅
7. add Postcss and Autoprefixer for vendor prefixes
8. add animation
9. add switch side feature ✅
10. add hover tooltip for options button

# Credits

- A huge thanks to [Kevin](https://github.com/dayjyun) and [Dominique](https://github.com/Dommy99) who share their feedback and insights about my project so I can make the game better!
- Shout-out to my instructors and classmates for their kindness and patience with me and especially Suresh Sigera for his helpful suggestions and advice during the game development.
