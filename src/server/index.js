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

const { addPlayer, removePlayer } = require("./player");
const numberOfPlayerInRoom = {};
const players = [];

io.on("connection", (socket) => {
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
     * if there is a player in the room already, send message to first player
     */
    if (numberOfPlayerInRoom[room]) {
      const firstPlayer = players.find((p) => p.room === room);
      io.to(firstPlayer.socketId).emit(
        "secondPlayerJoined",
        `${player.name} has joined!`
      );
    }

    socket.emit("message", {
      message: "Welcome " + player.name,
    });

    numberOfPlayerInRoom[room] = (numberOfPlayerInRoom[room] || 0) + 1;
    players.push({ socketId: socket.id, room, ...player });
    socket.join(room);

    console.log("Join Romm", {
      id: socket.id,
      options,
      numberOfPlayerInRoom,
      players,
    });
  });

  socket.on("markCell", (options, callback) => {
    console.log("Mark Cell", { id: socket.id, options });
    const { cellPosition } = options;
    const player = players.find((player) => player.socketId === socket.id);
    const opponent = players.find(
      (ele) => ele.room === player.room && ele.id !== player.id
    );
    if (player) {
      io.to(opponent.socketId).emit("markCell", {
        cellPosition,
        nextTurnPlayer: opponent,
      });
    }
  });

  socket.on("gameOver", (options, callback) => {
    console.log("Game Over", { id: socket.id, options });
    const player = players.find((player) => player.socketId === socket.id);
    if (player) {
      socket.broadcast.to(player.room).emit("gameOver");
    }
  });

  socket.on("disconnect", (options, callback) => {
    const playerIndex = players.findIndex(
      (player) => player.socketId === socket.id
    );
    if (playerIndex !== -1) {
      const player = players.splice(playerIndex, 1)[0];
      numberOfPlayerInRoom[player.room]--;
    }
    console.log("Leave room", {
      id: socket.id,
      options,
      numberOfPlayerInRoom,
      players,
    });
  });
});

server.listen(port, () => {
  console.log("server started on port:" + port);
});
