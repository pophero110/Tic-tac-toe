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
    console.log({ id: socket.id, options });

    socket.join(options.room);
    socket.emit("message", { text: "Welcome", room: options.room });
    socket.broadcast
      .to(options.room)
      .emit("message", `${options.name} has joined!`);
  });
});

server.listen(port, () => {
  console.log("server started on port:" + port);
});
