const newGameBtn = document.getElementById("newGameButton");
const joinGameBtn = document.getElementById("joinGameButton");
const gameCodeInput = document.getElementById("gameCodeInput");
let start = false;
let multiplayerturn = false;
newGameBtn.addEventListener("click", newGame);
joinGameBtn.addEventListener("click", joinGame);
let join = false;
function newGame() {
  socket.emit("newGame");
  socket.on("gameCode", (code) => {
    document.getElementById("room").style.display = "none";
    document.getElementById("blank").style.display = "block";
    document.getElementById("blank").innerHTML = code;
  });
}

function joinGame() {
  join = true;
  const code = gameCodeInput.value;

  socket.emit("joinGame", code);
  socket.on("start", (bool) => {});
  // setInterval(() => {
  //   socket.on("start", (bool) => {
  //     start = bool;
  //     if (start) {
  //       document.getElementById("room").style.display = "none";
  //       scoreCard.style.display = "block";
  //       gameBox.style.display = "flex";
  //       playerList.pop();
  //       player2 = new Player("Online", "OnlinePlayer", "", 7, false, false);
  //       playerList.push(player2);
  //       online = true;
  //       multiplayer = new Multiplayer();
  //       clearInterval()
  //     }
  //   });
  // }, 1);
}
socket.on("start", (bool) => {
  start = bool;

  if (start == true) {
    document.getElementById("blank").style.display = "none";
    document.getElementById("room").style.display = "none";
    scoreCard.style.display = "block";
    gameBox.style.display = "flex";
    playerList.pop();
    player2 = new Player("Online", "OnlinePlayer", "", 7, false, false);
    playerList.push(player2);
    multiplayer = new Multiplayer();
  }
});

socket.on("joinedTurn", (joinplayerturn) => {
  multiplayerturn = true;
  online = true;
  player1.playerTurn = joinplayerturn;
  player2.playerTurn = !joinplayerturn;

  //    stick.rotation=rotation
  //    stick.power=power
  //    whiteball.shoot(stick.power, stick.rotation);
  //    strikeAudio.volume = 1;
  //    strikeAudio.play();
  //    stick.ox = 900;
  //    stick.isShot = true;
  //    stick.isLeftRelease=true
});
