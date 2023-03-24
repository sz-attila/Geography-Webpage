const flag = document.getElementById("flag");
const answer = document.getElementById("answer");
const submit = document.getElementById("submit");
const result = document.getElementById("result");
const score = document.getElementById("score");
const pointsSpan = score.appendChild(document.createElement("span"));
const start = document.getElementById("start");
const restart = document.getElementById("restart");

let usedFlagIndices = [];
let flags = [];
let points = 0;
let currentFlagIndex = 0;
let flagsRemaining = 10;

answer.style.display = "none";
submit.style.display = "none";
restart.style.display = "none";
score.style.display = "none";
result.style.display = "none";

answer.addEventListener("input", () => {
  submit.disabled = !answer.value;
});

submit.addEventListener("click", () => {
  const guess = answer.value.toLowerCase();
  const correctAnswer = flags[currentFlagIndex].name.toLowerCase();
  if (guess === correctAnswer) {
    points++;
    pointsSpan.textContent = points;
    result.textContent = "Helyes!";
    result.style.color = "green";
    score.textContent = "Pontszám: " + points;
  } else {
    result.textContent = "Helytelen! A helyes válasz: " + correctAnswer + " volt.";
    result.style.color = "red";
    score.textContent = "Pontszám: " + points;
  }
  answer.value = "";
  flagsRemaining--;
  clearInterval(timerId);
  if (flagsRemaining > 0) {
    nextFlag();
  } else {
    finishGame();
  }
});

start.addEventListener("click", () => {
  fetch("SCRIPTS/easy-flags.json")
    .then(response => response.json())
    .then(data => {
      flags = data;
      restartGame();
    })
    .catch(error => {
      console.error(error);
      alert("Nem sikerült betölteni a zászlókat! Próbáld újra később!");
    });
});

restart.addEventListener("click", () => {
  restartGame();
});

function restartGame() {
  points = 0;
  pointsSpan.textContent = points;
  flagsRemaining = 10;
  currentFlagIndex = getRandomFlagIndex();
  flag.src = flags[currentFlagIndex].image;
  start.style.display = "none";
  answer.style.display = "block";
  submit.style.display = "block";
  result.style.display = "block";
  timer.style.display = "block";
  flag.style.display = "block";
  score.style.display = "block";
  restart.style.display = "none";
  pointsSpan.textContent = points;
  score.textContent = 'Pontszám: ' + points;
  result.textContent = "";
  usedFlagIndices = [];
  remainingTime = TIME_LIMIT;
  clearInterval(timerId);
  startCountdown();
}

const TIME_LIMIT = 20;
let timerDisplay = document.getElementById("timer");
let timerId;
let remainingTime;

function startCountdown() {
  remainingTime = TIME_LIMIT;
  timerDisplay.textContent = `Hátralévő idő: ${remainingTime}s`;
  clearInterval(timerId);
  timerId = setInterval(() => {
    remainingTime--;
    if (remainingTime < 0) {
      clearInterval(timerId);
      flagsRemaining--;
      if (flagsRemaining > 0) {
        nextFlag();
      } else {
        finishGame();
      }
    } else {
      timerDisplay.textContent = `Hátralévő idő: ${remainingTime}s`;
    }
  }, 1000);
}

function nextFlag() {
  currentFlagIndex = getRandomFlagIndex();
  flag.src = flags[currentFlagIndex].image;
  startCountdown();
}

function finishGame() {
  submit.removeEventListener("click", () => {
    clearInterval(timerId);
  });
  answer.style.display = "none";
  submit.style.display = "none";
  result.style.display = "none";
  timer.style.display = "none";
  flag.style.display = "none";
  score.style.display = "block";
  restart.style.display = "block";
  pointsSpan.textContent = points;
  score.textContent = `Összesen ${points} zászlót sikerült eltalálnod!`;
}

function getRandomFlagIndex() {
  let index = Math.floor(Math.random() * flags.length);
  while (usedFlagIndices.includes(index)) {
    index = Math.floor(Math.random() * flags.length);
  }
  usedFlagIndices.push(index);
  return index;
}