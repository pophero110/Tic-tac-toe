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
io.on("connection", (socket) => {
  socket.on("join", (options, callback) => {
    const { room, name } = options;
    console.log({ id: socket.id, options });

    socket.join(room);
    socket.emit("message", { text: "Welcome", room: room });
    socket.broadcast.to(room).emit("message", `${name} has joined!`);
  });
});

server.listen(port, () => {
  console.log("server started on port:" + port);
});
