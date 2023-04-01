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
const users = [];

io.on("connection", (socket) => {
  socket.on("join", (options, callback) => {
    const { room, name } = options;
    if (room && numberOfPlayerInRoom[room] === 2) {
      callback("Opps, the room is full.");
    } else {
      numberOfPlayerInRoom[room] = (numberOfPlayerInRoom[room] || 0) + 1;
    }
    users.push({ id: socket.id, room, name });
    console.log("Join Romm", {
      id: socket.id,
      options,
      numberOfPlayerInRoom,
      users,
    });

    socket.join(room);
    socket.emit("message", { text: "Welcome", room: room, id: socket.id });
    socket.broadcast.to(room).emit("message", `${name} has joined!`);
  });

  socket.on("markCell", (options, callback) => {
    console.log("Mark Cell", { id: socket.id, options });
    const { cellPosition } = options;
    const user = users.find((user) => user.id === socket.id);
    const opponent = users.find(
      (ele) => ele.room === user.room && ele.id !== user.id
    );
    if (user) {
      socket.join(user.room);
      socket.broadcast
        .to(user.room)
        .emit("markCell", { cellPosition, nextTurnUser: opponent });
    }
  });

  socket.on("disconnect", (options, callback) => {
    const user = users.find((user) => user.id === socket.id);
    if (user) {
      numberOfPlayerInRoom[user.room]--;
    }
    console.log("Leave room", {
      id: socket.id,
      options,
      numberOfPlayerInRoom,
      users,
    });
  });
});

server.listen(port, () => {
  console.log("server started on port:" + port);
});
