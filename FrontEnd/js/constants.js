const ballDiameter = 27;
const ballFriction = 0.975;
const maxPower = 4500;
const ballPositions = [
  { xPosition: 600, yPosition: 250 - 28 / 2 },
  { xPosition: 624, yPosition: 222 },
  { xPosition: 650, yPosition: 265 },
  { xPosition: 676, yPosition: 251 },
  { xPosition: 676, yPosition: 193 },
  { xPosition: 703, yPosition: 250 - 28 / 2 },
  { xPosition: 703, yPosition: 294 },
  { xPosition: 650, yPosition: 250 - 28 / 2 },
  { xPosition: 624, yPosition: 251 },
  { xPosition: 650, yPosition: 207 },
  { xPosition: 676, yPosition: 222 },
  { xPosition: 676, yPosition: 279 },
  { xPosition: 703, yPosition: 208 },
  { xPosition: 703, yPosition: 179 },
  { xPosition: 703, yPosition: 265 },
];
const radiusBigpocket = 43;
const radiusSmallpocket = 20;
const bigPocketCenters = [
  { xPosition: 25, yPosition: 23 },
  { xPosition: 25, yPosition: 462 },
  { xPosition: 885, yPosition: 25 },
  { xPosition: 885, yPosition: 462 },
];
const smallPocketCenters = [
  { xPosition: 455, yPosition: 13 },
  { xPosition: 455, yPosition: 476 },
];

const allPockets = [
  { x: 25, y: 23 },
  { x: 25, y: 462 },
  { x: 885, y: 25 },
  { x: 885, y: 462 },
  { x: 455, y: 13 },
  { x: 455, y: 476 },
];
const assetsLoader = document.getElementById("assetsloader");
const scoreCard = document.getElementById("scorecard");
const gameBox = document.getElementById("gamebox");
const gameMenu = document.getElementById("gamemenu");
const doublebutton = document.getElementById("two");
const displayBallList = document.getElementById(
  "scorecard__scorebox--profile--balllist"
);
const playerName = document.getElementById("scorecard__scorebox--profile--txt");
const playerprofile = document.getElementById(
  "scorecard__scorebox--ballProfile"
);
const submitBtn = document.getElementById("submitButton");
const nameInput = document.getElementById("nameInput");
const scorebutn=document.getElementById("score")
const scoreScreen=document.getElementById("scoreScreen")
const scoreExit=document.getElementById("scoreScreen__exitbtn")
const waystoPlayButn=document.getElementById("waysToPlay")
let score = [];
let scorecontent=[]
let assets = {};
let loadingindex = 0;
let isloading = true;
const socket = io("http://localhost:3000", {
  withCredentials: true,
});
let ballList = [];
let pocketedBallAtInstant = [];

let vscpu = false;
let cpu = false;
let multiplayer = null;
let online = false;
let cpuball = [];
let checker = 0;
let hiddenballs = 0;
let nextturn = false;
let collided = false;
let firstcollidedball = "";
let i = 1;
let foul = false;
let playerList = [];
let ballCollideAudio = new Audio("./sound/BallsCollide2.wav");
let sideAudio = new Audio("./sound/Side.wav");
let pocketAudio = new Audio("./sound/Hole.wav");
let strikeAudio = new Audio("./sound/Strike.wav");
let foulAudio = new Audio("./sound/foul1.mp3");
let themeAudio = new Audio("./sound/Bossa Antigua.mp3");
foulAudio.volume = 0.2;
themeAudio.volume = 0.2;
