const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("sendMessage", (message) => {
    console.log(message);
    io.emit("message", message); // Broadcast the message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("User dissconented");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
