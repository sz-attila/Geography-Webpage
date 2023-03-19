let usedFlagIndices = [];
let flags = [];
let points = 0;
let currentFlagIndex = 0;
let flagsRemaining = 10;

const flag = document.getElementById("flag");
const answer = document.getElementById("answer");
const submit = document.getElementById("submit");
const result = document.getElementById("result");
const score = document.getElementById("score");
const pointsSpan = score.appendChild(document.createElement("span"));
const start = document.getElementById("start");
const restart = document.getElementById("restart");

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
    score.textContent = 'Pontszám: ' + points;
  } else {
    result.textContent = "Helytelen!";
    result.style.color = "red";
    score.textContent = 'Pontszám: ' + points;
  }
  answer.value = "";
  flagsRemaining--;
  if (flagsRemaining > 0) {
    nextFlag();
  } else {
    finishGame();
  }
});

start.addEventListener("click", () => {
  fetch("flags.json")
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
  flag.style.display = "block";
  score.style.display = "block";
  restart.style.display = "none";
  pointsSpan.textContent = points;
  score.textContent = 'Pontszám: ' + points;
  usedFlagIndices = [];
}

function nextFlag() {
  currentFlagIndex = getRandomFlagIndex();
  flag.src = flags[currentFlagIndex].image;
}

function finishGame() {
  answer.style.display = "none";
  submit.style.display = "none";
  result.style.display = "none";
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

answer.style.display = "none";
submit.style.display = "none";
restart.style.display = "none";
score.style.display = "none";
result.style.display = "none";

start.focus();