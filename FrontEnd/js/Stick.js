class Stick {
  constructor(
    x = 258,
    y = 250,
    rotation = 0,
    isLeftClick = false,
    isLeftRelease = false,
    ox = 965, //originx
    oy = 9,   //originy
    offX = undefined, //offsetX
    offY = undefined, //offsetY
    power = 0,
    isShot = false,
    ismoving = false
  ) {
    (this.x = x),
      (this.y = y),
      (this.rotation = rotation),
      (this.isLeftClick = isLeftClick),
      (this.isLeftRelease = isLeftRelease),
      (this.ox = ox),
      (this.oy = oy),
      (this.offX = offX),
      (this.offY = offY),
      (this.power = power),
      (this.isShot = isShot),
      (this.ismoving = ismoving);
  }
  /**
   * Update stick as per the movement of the mouse
   * and on click draws power and angle.
   * @returns the value of x and y position of the stick 
   * along with the power drawn and the angle between the stick and the mouse.
   */
  update() {
    if (this.isShot) {
      return;
    }
    newTable.canvas.onmousemove = function (e) {
      stick.offX = e.offsetX;
      stick.offY = e.offsetY;
      let b = e.offsetX - stick.x;
      let p = e.offsetY - stick.y;
      stick.rotation = Math.atan2(p, b);
    };
    newTable.canvas.onmousedown = function (e) {
      if (stick.isShot) {
        e.stopPropagation;
        return;
      }
      if (e.button == 0) {
        stick.isLeftClick = true;
      }
    };
    newTable.canvas.onmouseup = function (e) {
      if (stick.isShot) {
        e.stopPropagation;
        return;
      }
      if (e.button == 0) {
        stick.isLeftClick = false;
        stick.isLeftRelease = true;
        if (stick.power == 0) stick.power = 100;
        strikeAudio.volume = 1;
        strikeAudio.play();
        stick.ox = 955;
        whiteball.shoot(stick.power, stick.rotation);
        stick.isShot = true;
        stick.ismoving = true;
      }
    };
    if (stick.isLeftClick && stick.power <= maxPower) {
      stick.ox = stick.ox + 5;
      stick.power = stick.power + 120;
    }
  }
  /**
   * draw as per the value calculated by the above update method.
   */
  draw() {
    if (!this.isShot || this.ismoving) {
      newTable.drawImage(
        assets.stick,
        this.x,
        this.y,
        stick.rotation,
        this.ox,
        this.oy,
        (this.ismoving = false)
      );
      if (player1.playerTurn || !cpu) {
        if (stick.offX != undefined || stick.offY != undefined) {
          newTable.drawCircle(stick.offX, stick.offY);
          newTable.drawLine(this.x, this.y, stick.offX, stick.offY);
        }
      }
    }
    if (player1.playerTurn || !cpu) {
      if (whiteball.hidden || foul) {
        newTable.drawBall(
          assets.ballinhand,
          stick.offX,
          stick.offY,
          ballDiameter,
          ballDiameter
        );
        newTable.canvas.onmouseup = function (e) {
          if (!whiteball.hidden) {
            e.stopPropagation;
            return;
          }

          if (e.button == 0) {
            if (stick.offX + ballDiameter > assets.table.width - 47) {
              stick.offX = assets.table.width - 47 - ballDiameter;
            }
            if (stick.offX < 52) {
              stick.offX = 52;
            }
            if (stick.offY + ballDiameter > assets.table.height - 48) {
              stick.offY = assets.table.height - 48 - ballDiameter;
            }
            if (stick.offY < 51) {
              stick.offY = 51;
            }
            stick.power = 0;
            whiteball.x = stick.offX;
            whiteball.y = stick.offY;
            whiteball.hidden = false;
            whiteball.ispocketing = false;
            stick.ox = 965;
            stick.isShot = false;
            stick.x = stick.offX + ballDiameter / 2;
            stick.y = stick.offY + ballDiameter / 2;
          }
        };
      }
    } else {
      if ((whiteball.hidden || foul) && player2.playerTurn) {
        stick.power = 0;
        whiteball.x = getRandom(100, 800);
        whiteball.y = getRandom(100, 300);
        whiteball.hidden = false;
        whiteball.ispocketing = false;
        stick.ox = 965;
        stick.isShot = false;
        stick.x = whiteball.x + ballDiameter / 2;
        stick.y = whiteball.y + ballDiameter / 2;
        ballList.forEach((ball) => {
          ball.vx = 0;
          ball.vy = 0;
        });
        foul = false;
      }
    }
  }
}
const stick = new Stick();
