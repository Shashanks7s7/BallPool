class CPU {
  constructor() {}
  /**
   * Find the list of balls that cpu can allow to strike.
   * First all balls except white and black are assigned.
   * And when the cpu ball is finialized then only the list of cpu balls are assigned.
   */
  findCpuBall() {
    cpuball = ballList;
    if (player2.playerBall != "") {
      cpuball = [];
      ballList.forEach((element) => {
        if (element.type == player2.playerBall && !element.hidden) {
          cpuball.push(element);
        }
        if (player2.ballCount == 0 && element.type == "black") {
          cpuball.push(element);
        }
      });
    }
  }
  /**
   * Find the nearest ball from the white ball.
   * And strike the ball with random power.
   * Angle is calculated between the white ball and the nearest ball with little deviation.
   */
  findnearestball() {
    if (player2.playerTurn) {
      let sort = sortArr(cpuball, cpuball.length, whiteball);

      let base = 0;
      let perpendicular = 0;
      if (cpuball.length == 16) {
        base = sort[1][1][0] - whiteball.x;
        perpendicular = sort[1][1][1] - whiteball.y;
      } else {
        base = sort[0][1][0] - whiteball.x;
        perpendicular = sort[0][1][1] - whiteball.y;
      }

      stick.rotation = Math.atan2(perpendicular, base);
      const rotate = getRandomFloat(0.9, 1.1, 3);
      if (checker == 0) {
        stick.power = getRandom(2000, 4500);
      }
      if (checker > stick.power) {
        checker = 0;

        stick.isLeftRelease = true;
        stick.isShot = true;
        whiteball.shoot(stick.power, stick.rotation * rotate);
        stick.ox = 955;
        stick.ismoving = true;
      } else {
        checker = checker + 40;
        stick.ox = stick.ox + 2;
      }
    }
  }
  /**
   * Calculate the nearest pocket from the nearest cpu ball.
   * finds the angle between three points,
   * white ball coordinates,nearest cpu ball and the nearest pocket coordinates
   */
  findNearestBallPocket() {
    if (player2.playerTurn) {
      let sort = sortArr(cpuball, cpuball.length, whiteball);

      let sortPockets = sortPocketFunction(
        allPockets,
        allPockets.length,
        sort[0][1][0],
        sort[0][1][1]
      );
      
      //  let ang= findAngle(sortPockets[0][1][0],sortPockets[0][1][1],whiteball.x,whiteball.y,  sort[0][1][0],
      //   sort[0][1][1])
      //   stick.rotation=ang
      //   if (checker == 0) {
      //     stick.power = getRandom(2000, 4500);
      //   }
      //   if (checker > stick.power) {
      //     checker = 0;

      //     stick.isLeftRelease = true;
      //     stick.isShot = true;
      //     whiteball.shoot(stick.power, stick.rotation * rotate);
      //     stick.ox=955
      //     stick.ismoving=true
      //   } else {
      //     checker = checker + 40;
      //     stick.ox = stick.ox + 2;
      //   }
      //       // let base = sort[0][1][0] - whiteball.x;
      //       // let perpendicular = sort[0][1][1] - whiteball.y;
      //       // stick.rotation = Math.atan2(perpendicular, base);
      //       // const rotate = getRandomFloat(0.9, 1.1, 3);
      //       // stick.power = getRandom(1500, 4000);
      //       // stick.isLeftRelease = true;
      //       // stick.isShot = true;
      //       // whiteball.shoot(stick.power, stick.rotation * rotate);
    }
  }
}
