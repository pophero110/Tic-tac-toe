/**
 * express is a web framework that runs on top of http, and socket.io requires an HTTP server to initiate WebSocket connections
 */
const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 3000;
const pulicDirectoryPath = path.join(__dirname, "../../");
app.use(express.static(pulicDirectoryPath));

const numberOfPlayerInRoom = {};
const players = [];

io.on("connection", (socket) => {
  /**
   * when player join room , save the player and increase the number of player in the room by 1
   * each room has at most 2 playes and can not contain duplicate player
   */
  socket.on("join", (options, callback) => {
    const { room, player } = options;
    if (players.find((p) => p.id === player.id)) {
      callback("You're already in a room");
      return;
    }
    if (!room) {
      callback("Invalid room number");
      return;
    }
    if (numberOfPlayerInRoom[room] === 2) {
      callback("Opps, the room is full");
      return;
    }

    /**
     * if there is a player in the room already, send message and second player data to first player
     * and send first player data to second player
     * whoseTurn = 1 means will go first in turn, and whoseTurn = 2 will go second in turn.
     */
    let firstPlayer;
    if (numberOfPlayerInRoom[room]) {
      firstPlayer = players.find((p) => p.room === room);
      io.to(firstPlayer.socketId).emit("message", {
        opponent: player,
        message: `${player.name} has joined!`,
        whoseTurn: 1,
      });
      socket.emit("message", {
        message: "Welcome " + player.name,
        opponent: firstPlayer,
        whoseTurn: 2,
      });
    } else {
      socket.emit("message", {
        message: "Welcome " + player.name,
      });
    }

    numberOfPlayerInRoom[room] = (numberOfPlayerInRoom[room] || 0) + 1;
    players.push({ socketId: socket.id, room, ...player });
    socket.join(room);
  });

  /**
   * when player mark cell, send position of marked cell to the opponent
   */
  socket.on("markCell", (options, callback) => {
    const { cellPosition } = options;
    const player = players.find((player) => player.socketId === socket.id);
    const opponent = players.find(
      (ele) => ele.room === player.room && ele.id !== player.id
    );
    if (opponent) {
      io.to(opponent.socketId).emit("markCell", {
        cellPosition,
      });
    }
  });

  /**
   * when game is over, send event to both players to reset the game
   */
  socket.on("gameOver", (options, callback) => {
    console.log("Game Over", { id: socket.id, options });
    const player = players.find((player) => player.socketId === socket.id);
    if (player) {
      socket.broadcast.to(player.room).emit("gameOver");
    }
  });

  /**
   * when player disconnect, decrease the number of player in the room by 1
   * and remove player
   */
  socket.on("disconnect", (options, callback) => {
    const playerIndex = players.findIndex(
      (player) => player.socketId === socket.id
    );
    if (playerIndex !== -1) {
      const player = players.splice(playerIndex, 1)[0];
      numberOfPlayerInRoom[player.room]--;
    }
  });
});

server.listen(port, () => {
  console.log("server started on port:" + port);
});
