let titleElement = document.getElementById("title");
let statsElement = document.getElementById("stats");
let nameInputElement = document.getElementById("nameInput");
let reactionButtonElement = document.getElementById("reactionButton");

let currentPlayer;
let bestPlayer = localStorage.getItem("bestPlayer");
let bestScore = Number(localStorage.getItem("bestScore"));

let timer;
let waitTimer;
let speedMS = 0;
const MS = 1;
let playing = false;
let reacting = false;

let countdownTimer;
let countdownCount = 4;

console.log(`Best player: ${bestPlayer}; Best Score: ${bestScore}`);

if (bestScore == 0) {
  titleElement.textContent = "⚡ Reaction time";
} else {
  titleElement.textContent = `Current Highscore. Player: ${bestPlayer}; Speed: ${bestScore}MS`;
}

function resetScores() {
  if (playing || reacting) {
    console.log("can't do that");
    return;
  }
  resetH1();
  bestPlayer = null;
  localStorage.setItem("bestPlayer", bestPlayer);
  bestScore = 0;
  localStorage.setItem("bestScore", bestScore);
}

function resetH1() {
  titleElement.textContent = "⚡ Reaction time";
  statsElement.textContent = "Нэрээ бичээд «Эхлэх» дар";
}

function start() {
  if (playing) {
    console.log("Already playing!");
    return;
  }
  countdownCount = 4;
  speedMS = 0;
  titleElement.textContent = "⚡ Reaction time";
  currentPlayer = nameInputElement.value;
  console.log(`Current player name: ${currentPlayer}`);
  playing = true;
  countdownStart();
}

function startTimer() {
  console.log(`Button green!`);
  reacting = true;
  reactionButtonElement.style.backgroundColor = "green";
  timer = setInterval(timeSpeed, MS);
}

function getRandomTime() {
  return Math.random() * 1000 + 1000;
}

function timeSpeed() {
  speedMS += MS;
  //   console.log(`speedMS: ${speedMS}`);
}

function react() {
  if (!reacting) {
    return;
  }
  reacting = false;
  playing = false;
  clearInterval(timer);
  reactionButtonElement.style.backgroundColor = "grey";

  compareScores();
}

function compareScores() {
  if (speedMS < bestScore || bestScore == 0) {
    bestPlayer = currentPlayer;
    localStorage.setItem("bestPlayer", bestPlayer);
    bestScore = speedMS;
    localStorage.setItem("bestScore", bestScore);
    titleElement.textContent = `New Highscore! Player: ${bestPlayer}; Speed: ${bestScore}MS`;
  } else {
    titleElement.textContent = `Current Highscore. Player: ${bestPlayer}; Speed: ${bestScore}MS`;
  }
  statsElement.textContent = `Speed: ${speedMS}MS `;
}

function countdownStart() {
  countdownTimer = setInterval(countdown, 1000);
  reactionButtonElement.textContent = countdownCount;
}

function countdown() {
  countdownCount--;
  reactionButtonElement.textContent = countdownCount;
  if (countdownCount <= 0) {
    clearInterval(countdownTimer);
    reactionButtonElement.textContent = "";
    waitTimer = getRandomTime();
    reactionButtonElement.style.backgroundColor = "red";
    setTimeout(startTimer, waitTimer);
  }
}
