class GameRules {
  constructor() {}
  /**
   * Ball is assign to each players if one of the player pocketed a ball.
   * If a single player pocketed both type of ball then no ball is assigned
   * But the ball assign process skips and again calculate in next turn
   */
  ballAssign() {
    ballList.forEach((ball) => {
      if (ball.hidden) {
        if (ball.type == "white") {
          return;
        }
        if (ball.type == "black") {
          return;
        }
        if (player1.playerTurn) {
          firstcollidedball = ball.type;
          if (ball.type == "red") {
            player1.playerBall = "red";
            player2.playerBall = "yellow";
          } else {
            player1.playerBall = "yellow";
            player2.playerBall = "red";
          }
        } else {
          firstcollidedball = ball.type;
          if (ball.type == "red") {
            player2.playerBall = "red";

            player1.playerBall = "yellow";
          } else {
            player2.playerBall = "yellow";
            player1.playerBall = "red";
          }
        }
        hiddenballs = hiddenballs + 1;

        if (hiddenballs > 1) {
          player1.playerBall = "";
          player2.playerBall = "";
        }
      }
    });
  }
  /**
   * For changing the turn of the player as per the boolean and numeric value
   */
  nextTurnfunction() {
    if (nextturn && i == 0) {
      player1.playerTurn = !player1.playerTurn;
      player2.playerTurn = !player2.playerTurn;
      i = 1;
    }
  }
  /**
   *
   * @param {object} player -object of Player class
   * Both player is evaluated on turn by turn basis
   * If any foul is commited then next player turn is initiated with the ball free in hand
   * @returns {boolean} nextturn
   */
  fouldetection(player) {
    if (player.playerTurn) {
      if (firstcollidedball == "" && !stick.isShot && i == 0) {
        foul = true;
        foulAudio.play();
        nextturn = true;
        return;
      } else if (
        player.playerBall == "" &&
        firstcollidedball != "" &&
        !stick.isShot
      ) {
        if (firstcollidedball == "black") {
          foul = true;
          foulAudio.play();
          nextturn = true;
        }
        firstcollidedball = "";
        nextturn = true;
      } else if (
        firstcollidedball == player.playerBall &&
        !stick.isShot &&
        i == 0
      ) {
        if (pocketedBallAtInstant.length == 0) {
          firstcollidedball = "";
          nextturn = true;
        } else {
          pocketedBallAtInstant.forEach((pocketedball) => {
            if (pocketedball == player.playerBall) {
              firstcollidedball = "";
              return;
            }
            if (pocketedball == "white") {
              firstcollidedball = "";
              whiteball.hidden = true;
              foul = true;
              foulAudio.play();
              whiteball.ispocketing = true;
              nextturn = true;
            }
            if (pocketedball != player.playerBall && pocketedball != "white") {
              firstcollidedball = "";
              foul = true;
              foulAudio.play();
              nextturn = true;
            }
          });
        }
      } else if (
        firstcollidedball != "" &&
        firstcollidedball != player.playerBall &&
        !stick.isShot &&
        i == 0
      ) {
        if (firstcollidedball == "black" && player.ballCount == 0) {
          firstcollidedball = "";
          nextturn = true;
          return;
        }
        firstcollidedball = "";
        foul = true;
        foulAudio.play();
        nextturn = true;
      }
    }
  }
  /**
   * 
   * @param {pbject} player
   * Checks if any player win or not.
   * If win then the game over screen is displayed with
   * two clickable buttons.
   * Play Again Button- To start the same game 
   * Home Button- To take the user to the home screen
   * where they can choose again from the begining  
   */
  async endGame(player) {
    if (player.isPlayerWin && !stick.isShot) {
      window.cancelAnimationFrame(requestAnimation);
      player2.playerTurn = false;
      scoreCard.style.display = "none";
      gameBox.style.display = "none";
      document.getElementById(
        "endTxt"
      ).innerHTML = `${player.playerName} Wins.`;
      document.getElementById("endScreen").style.display = "block";
      if (player1.isPlayerWin) {
        let playerName = player1.playerName;
        let wins = "1";
        let rawData = { playerName, wins };
        data = JSON.stringify(rawData);
        await fetch(
          "https://Final-Project-BackEnd-API.shashanks7s7.repl.co/post",

          {
            method: "POST",
            body: data,
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
      }
      document
        .getElementById("playAgainButn")
        .addEventListener("click", function () {
          document.getElementById("endScreen").style.display = "none";
          scoreCard.style.display = "block";
          gameBox.style.display = "flex";
          endingFunction();
        });
      document
        .getElementById("homeButn")
        .addEventListener("click", function () {
          document.getElementById("endScreen").style.display = "none";
          gameMenu.style.display = "block";
          endingFunction();
        });
      function endingFunction() {
        ballList = [];
        pocketedBallAtInstant = [];
        (whiteball.x = 258 - ballDiameter / 2),
          (whiteball.y = 250 - ballDiameter / 2),
          (whiteball.hidden = false);
        ballset();
        player1.playerTurn = true;
        player2.playerTurn = false;
        hiddenballs = 0;
        stick.isShot = false;
        stick.ismoving = false;
        stick.x = 258;
        stick.y = 250;
        nextturn = false;
        collided = false;
        firstcollidedball = "";
        i = 1;
        foul = false;
        playerList.forEach((player) => {
          player.playerBall = "";
          player.ballCount = 7;
          player.isPlayerWin = false;
          player.displayScoreball();
        });
      }
    }
  }
}
const gameRules = new GameRules();
