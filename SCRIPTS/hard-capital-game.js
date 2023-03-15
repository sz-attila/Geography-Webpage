let usedCountryIndices = [];
let countries = [];
let points = 0;
let currentCountryIndex = 0;
let countriesRemaining = 10;

const country = document.getElementById("country");
const answer = document.getElementById("answer");
const submit = document.getElementById("submit");
const result = document.getElementById("result");
const score = document.getElementById("score");
const pointsSpan = score.appendChild(document.createElement("span"));
const start = document.getElementById("start");
const restart = document.getElementById("restart");

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
  const correctAnswer = countries[currentCountryIndex].capital.toLowerCase();
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
  countriesRemaining--;
  clearInterval(timerId);
  if (countriesRemaining > 0) {
    nextCountry();
  } else {
    finishGame();
  }
});

start.addEventListener("click", () => {
  fetch("SCRIPTS/hard-capital.json")
    .then(response => response.json())
    .then(data => {
      countries = data;
      restartGame();
    })
    .catch(error => {
      console.error(error);
      alert("Nem sikerült betölteni az országokat! Próbáld újra később!");
    });
});

restart.addEventListener("click", () => {
  restartGame();
});

function restartGame() {
  points = 0;
  pointsSpan.textContent = points;
  countriesRemaining = 10;
  currentCountryIndex = getRandomCountryIndex();
  country.textContent = countries[currentCountryIndex].name;
  start.style.display = "none";
  answer.style.display = "block";
  submit.style.display = "block";
  result.style.display = "block";
  timer.style.display = "block";
  country.style.display = "block";
  score.style.display = "block";
  restart.style.display = "none";
  pointsSpan.textContent = points;
  score.textContent = 'Pontszám: ' + points;
  result.textContent = "";
  usedCountryIndices = [];
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
      countriesRemaining--;
      if (countriesRemaining > 0) {
        nextCountry();
      } else {
        finishGame();
      }
    } else {
      timerDisplay.textContent = `Hátralévő idő: ${remainingTime}s`;
    }
  }, 1000);
}

function nextCountry() {
  currentCountryIndex = getRandomCountryIndex();
  country.textContent = countries[currentCountryIndex].name;
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
  country.style.display = "none";
  score.style.display = "block";
  restart.style.display = "block";
  pointsSpan.textContent = points;
  score.textContent = `Összesen ${points} fővárost sikerült eltalálnod!`;
}

function getRandomCountryIndex() {
  let index = Math.floor(Math.random() * countries.length);
  while (usedCountryIndices.includes(index)) {
    index = Math.floor(Math.random() * countries.length);
  }
  usedCountryIndices.push(index);
  return index;
}