const flag = document.getElementById("flag");
const answer = document.getElementById("answer");
const result = document.getElementById("result");
const score = document.getElementById("score");
const pointsSpan = score.appendChild(document.createElement("span"));
const start = document.getElementById("start");
const restart = document.getElementById("restart");

let flags = [];
let points = 0;
let currentFlagIndex = 0;
let flagsRemaining = 10;

answer.style.display = "none";
restart.style.display = "none";
score.style.display = "none";
result.style.display = "none";

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
  usedFlagIndices = [];
  currentFlagIndex = getRandomFlagIndex();
  flag.src = flags[currentFlagIndex].image;
  start.style.display = "none";
  answer.style.display = "block";
  result.style.display = "block";
  flag.style.display = "block";
  score.style.display = "block";
  restart.style.display = "none";
  pointsSpan.textContent = points;
  score.textContent = 'Pontszám: ' + points;
  result.textContent = "";
  nextFlag();
}

function nextFlag() {
  if (usedFlagIndices.length >= flags.length) {
    finishGame();
    return;
  }
  
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("answer-buttons-container");
  flag.insertAdjacentElement("afterend", buttonsContainer);

  currentFlagIndex = getRandomFlagIndex();
  flag.src = flags[currentFlagIndex].image;

  const correctAnswer = flags[currentFlagIndex].name;
  const answerOptions = [correctAnswer];
  while (answerOptions.length < 4) {
    const randomIndex = Math.floor(Math.random() * flags.length);
    const randomAnswer = flags[randomIndex].name;
    if (!answerOptions.includes(randomAnswer)) {
      answerOptions.push(randomAnswer);
    }
  }
  
  for (let i = answerOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answerOptions[i], answerOptions[j]] = [answerOptions[j], answerOptions[i]];
  }

  const answerButtons = answerOptions.map(answer => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-button");
    button.addEventListener("click", () => {
      if (answer === correctAnswer) {
        points++;
        pointsSpan.textContent = points;
        result.textContent = "Helyes!";
        result.style.color = "green";
        score.textContent = 'Pontszám: ' + points;
      } else {
        result.textContent = "Helytelen! A helyes válasz: " + correctAnswer + " volt.";
        result.style.color = "red";
        score.textContent = 'Pontszám: ' + points;
      }
      answerButtons.forEach(button => button.remove());
      flagsRemaining--;
      if (flagsRemaining > 0) {
        nextFlag();
      } else {
        finishGame();
      }
    });
    buttonsContainer.appendChild(button);
    return button;
  });
}

function finishGame() {
  flag.style.display = "none";
  answer.style.display = "none";
  result.style.display = "none";
  restart.style.display = "block";
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

