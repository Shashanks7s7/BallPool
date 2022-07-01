/**
 *
 * @param {string} imgname -name of the image file
 * @returns {object} -Image Object with increment of loadingindex by 1
 */
function assetsload(imgname) {
  let image = new Image();
  image.src = `./images/${imgname}`;
  loadingindex = loadingindex - 1;
  image.onload = function () {
    loadingindex = loadingindex + 1;
  };
  return image;
}
assets.tableTwo = assetsload("table3.png");
assets.table = assetsload("table2.png");
assets.stick = assetsload("stick.png");
assets.whiteball = assetsload("white_ball.png");
assets.redball = assetsload("red_ball.png");
assets.yellowball = assetsload("yellow_ball.png");
assets.blackball = assetsload("black_ball.png");
assets.ballinhand = assetsload("ball_in_hand.png");
assets.singleplayer = assetsload("MvsC.png");
assets.twoplayer = assetsload("MvsM.png");
assets.logo = assetsload("fav.png");

/**
 * checks the loadingindex value untill all images are completely loaded
 * if loading index ==0, then main game menu screen is loaded
 */
let checkAssetsLoader = setInterval(() => {
  if (loadingindex === 0) {
    clearInterval(checkAssetsLoader);

    let count = 200;
    let removePreloader = setInterval(() => {
      if (count <= 0) {
        clearInterval(removePreloader);
        assetsLoader.style.display = "none";
        if (localStorage.getItem("playerName") != null) {
          gameMenu.style.display = "block";
        } else {
          document.getElementById("login").style.display = "block";
        }
        isloading = false;
      } else {
        count -= 2;
        assetsLoader.style.opacity = count + "%";
      }
    }, 10);
  }
}, 100);

document.getElementById("one").addEventListener("click", function () {
  themeAudio.play();
  gameMenu.style.display = "none";
  scoreCard.style.display = "block";
  gameBox.style.display = "flex";
  playerList.pop();
  player2 = new Player("CPU", "CPU", "", 7, false, false);
  playerList.push(player2);
  vscpu = true;
  cpu = new CPU();
  cpu.findnearestball();
});
document.getElementById("two").addEventListener("click", function () {
  gameMenu.style.display = "none";
  scoreCard.style.display = "block";
  gameBox.style.display = "flex";
  themeAudio.play();
});
document.getElementById("three").addEventListener("click", function () {
  themeAudio.play();
  gameMenu.style.display = "none";

  scoreExit.style.display = "block";
  document.getElementById("room").style.display = "block";
});
scoreExit.addEventListener("click", function (e) {
  gameMenu.style.display = "block";
  document.getElementById("blank").style.display = "none";
  document.getElementById("room").style.display = "none";
  scoreExit.style.display = "none";
  e.stopPropagation();
});
