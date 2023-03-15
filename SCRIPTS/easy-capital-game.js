let countries = [];
let points = 0;
let currentCountryIndex = 0;
let countriesRemaining = 10;

const country = document.getElementById("country");
const answer = document.getElementById("answer");
const result = document.getElementById("result");
const score = document.getElementById("score");
const pointsSpan = score.appendChild(document.createElement("span"));
const start = document.getElementById("start");
const restart = document.getElementById("restart");

answer.style.display = "none";
restart.style.display = "none";
score.style.display = "none";
result.style.display = "none";

start.addEventListener("click", () => {
  fetch("SCRIPTS/easy-capital.json")
    .then(response => response.json())
    .then(data => {
      countries = data;
      restartGame();
    })
    .catch(error => {
      console.error(error);
      alert("Nem sikerült betölteni az országokat! Kérlek próbáld újra később.");
    });
});

restart.addEventListener("click", () => {
  restartGame();
});

function restartGame() {
  points = 0;
  pointsSpan.textContent = points;
  countriesRemaining = 10;
  usedCountryIndices = [];
  currentCountryIndex = getRandomCountryIndex();
  country.textContent = countries[currentCountryIndex].name;
  start.style.display = "none";
  answer.style.display = "block";
  result.style.display = "block";
  country.style.display = "block";
  score.style.display = "block";
  restart.style.display = "none";
  pointsSpan.textContent = points;
  score.textContent = 'Pontszám: ' + points;
  result.textContent = "";
  nextCountry();
}

function nextCountry() {
  if (usedCountryIndices.length >= countries.length) {
    finishGame();
    return;
  }
  
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("answer-buttons-container");
  country.insertAdjacentElement("afterend", buttonsContainer);

  currentCountryIndex = getRandomCountryIndex();
  country.textContent = countries[currentCountryIndex].name;

  const correctAnswer = countries[currentCountryIndex].capital;
  const answerOptions = [correctAnswer];
  while (answerOptions.length < 4) {
    const randomIndex = Math.floor(Math.random() * countries.length);
    const randomAnswer = countries[randomIndex].capital;
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
      countriesRemaining--;
      if (countriesRemaining > 0) {
        nextCountry();
      } else {
        finishGame();
      }
    });
    buttonsContainer.appendChild(button);
    return button;
  });
}

function finishGame() {
  country.style.display = "none";
  answer.style.display = "none";
  result.style.display = "none";
  restart.style.display = "block";
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

