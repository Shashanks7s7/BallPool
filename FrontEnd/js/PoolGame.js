class PoolGame {
  constructor() {}
  /**
   * The update function listen to each ball, stick and the player and the cpu class
   * and updates their value in the continuous manner.
   * But only when the ball is shot or in moving state.
   */
  update() {
    if (player1.playerTurn || !cpu) {
      stick.update();
    }

    if (stick.isShot) {
      ballList.forEach((ball) => {
        ball.checkPockting();
        ball.checkCollision(ball);
        if (ball != whiteball) {
          ball.updateeachball();
        }
      });
      whiteball.update();
      playerList.forEach((player) => {
        if (player.playerBall == "") {
          gameRules.ballAssign();
        }
        gameRules.fouldetection(player);
        gameRules.nextTurnfunction();
        player.updateScoreball();
        gameRules.endGame(player);
      });
    } else {
      whiteball.checkPockting();
      firstcollidedball = "";
      pocketedBallAtInstant = [];
      if (vscpu && !stick.isShot && player2.playerTurn) {
        cpu.findCpuBall();
        cpu.findnearestball();
        cpu.findNearestBallPocket();
      }
      player1.updateScoreball();
      player2.updateScoreball();
    }

    newTable.clear();
  }
  /**
   * Call the main canvas draw method of the class Table.
   * All the objects are drawn in a continuous manner
   * only in the moving state of ball.
   */
  draw() {
    if (vscpu) {
      newTable.drawImage(assets.table, 0, 0);
    } else {
      newTable.drawImage(assets.tableTwo, 0, 0);
    }
    ballList.forEach((ball) => {
      ball.draw();
    });
    stick.draw();
  }
}
const game = new PoolGame();
let requestAnimation = null;
function play() {
  if (!isloading) {
    game.update();
    game.draw();
  }
  requestAnimation = requestAnimationFrame(play);
}
play();
