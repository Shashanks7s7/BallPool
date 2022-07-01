const io = require("socket.io")(3000, {
  cors: {
    origin: "http://127.0.0.1:5500",
    transports: ["websocket", "polling"],
    credentials: true,
  },
  allowEIO3: true,
});
let start = false;
const clientRooms = {};
io.on("connection", (client) => {
  client.on("send", (playername, power, rotation) => {
    client.broadcast.emit("receive", playername, power, rotation);
  });
  client.emit("receive", "shashankey", 2000, -1);
  client.on("newGame", handleNewGame);
  client.on("joinGame", handleJoinGame);

  function handleNewGame() {
    clientRooms[client.id] = client.id;
    client.emit("gameCode", client.id);
  }
  function handleJoinGame(roomName) {
    const room = io.sockets.adapter.rooms.get(roomName);

    if (room == undefined) {
      client.emit("start", "unknownCode");
      return;
    } else {
      clientRooms[client.id] = roomName;
      client.join(roomName);
      client.number = 2;
      client.emit("init", 2);
      start = true;
      io.emit("start", start);
      client.emit("joinedTurn", false, 2000, -1);
    }
  }
});
