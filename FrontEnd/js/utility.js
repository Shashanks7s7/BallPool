/**
 *
 * @param {number} num - Any int or float or other number.
 * @returns {String} - in the form of px
 * Used in DOM where we have to give string value.
 */
function toPX(num) {
  return `${num}px`;
}
/**
 * Gives the random int value between minimum and maximum value.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
/**
 * Find the distance betn two co-ordinates (x1,y1) & (x2,y2).
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns
 */
function distance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}
/**
 * Gives the random float value between minimum and maximum value with the defined decimals.
 * @param {number} min
 * @param {number} max
 * @param {number} decimals
 * @returns
 */
function getRandomFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}

function rotate2(vx, vy, angle) {
  return {
    x: vx * Math.cos(angle) - vy * Math.sin(angle),
    y: vx * Math.sin(angle) + vy * Math.cos(angle),
  };
}

/**
 * Perform the elastic collision between two balls.
 * @param {object} ball 
 * @param {object} nextball 
 */
function resolveCollision(ball, nextball) {
  const xSpeedDiff = ball.vx - nextball.vx;
  const ySpeedDiff = ball.vy - nextball.vy;
  const xDist = nextball.x - ball.x;
  const yDist = nextball.y - ball.y;
  if (xSpeedDiff * xDist + ySpeedDiff * yDist >= 0) {
    const angle = -Math.atan2(nextball.y - ball.y, nextball.x - ball.x);
    const m1 = ball.mass;
    const m2 = nextball.mass;
    const u1particle = rotate2(ball.vx, ball.vy, angle);
    const u2otherparticle = rotate2(nextball.vx, nextball.vy, angle);
    const s1 = {
      x:
        (u1particle.x * (m1 - m2)) / (m1 + m2) +
        (u2otherparticle.x * 2 * m2) / (m1 + m2),
      y: u1particle.y,
    };
    const s2 = {
      x:
        (u2otherparticle.x * (m1 - m2)) / (m1 + m2) +
        (u1particle.x * 2 * m1) / (m1 + m2),
      y: u2otherparticle.y,
    };
    const sFinal1 = rotate2(s1.x, s1.y, -angle);
    const sFinal2 = rotate2(s2.x, s2.y, -angle);

    ball.vx = sFinal1.x;
    ball.vy = sFinal1.y;
    nextball.vx = sFinal2.x;
    nextball.vy = sFinal2.y;
  }
}
function sortFunction(a, b) {
  if (a[0] === b[0]) {
    return 0;
  } else {
    return a[0] < b[0] ? -1 : 1;
  }
}

/**
 * Sort the array based on distance from a particular point.
 * @param {Array} arr 
 * @param {number} n 
 * @param {Object} p 
 * @returns 
 */
function sortArr(arr, n, p) {
  var vp = new Array(n);

  for (var i = 0; i < n; i++) {
    var dist = Math.pow(p.x - arr[i].x, 2) + Math.pow(p.y - arr[i].y, 2);

    vp[i] = [dist, [arr[i].x, arr[i].y]];
  }

  vp.sort(sortFunction);
  return vp;
}
function sortPocketFunction(arr, n, x, y) {
  var vp = new Array(n);

  for (var i = 0; i < n; i++) {
    var dist = Math.pow(x - arr[i].x, 2) + Math.pow(y - arr[i].y, 2);

    vp[i] = [dist, [arr[i].x, arr[i].y]];
  }

  vp.sort(sortFunction);
  return vp;
}

/**
 * Find the angle between three cordinates following the triangle rule.
 * In Triangle ABC, gives the angle of ABC or CBA.
 * @param {number} Ax 
 * @param {number} Ay 
 * @param {number} Bx 
 * @param {number} By 
 * @param {number} Cx 
 * @param {number} Cy 
 * @returns 
 */
function findAngle(Ax, Ay, Bx, By, Cx, Cy) {
  let AB = Math.sqrt(Math.pow(Bx - Ax, 2) + Math.pow(By - Ay, 2));
  let BC = Math.sqrt(Math.pow(Bx - Cx, 2) + Math.pow(By - Cy, 2));
  let AC = Math.sqrt(Math.pow(Cx - Ax, 2) + Math.pow(Cy - Ay, 2));
  return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
}
