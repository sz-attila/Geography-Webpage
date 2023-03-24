let countries = [];

const mapContainer = document.getElementById("map-container");
const startButton = document.getElementById("start");
const blindMap = document.getElementById("blindmap");
const countryList = document.getElementById("country-list");
const submitButton = document.getElementById("submit");
const restartButton = document.getElementById("restart");
const resultEl = document.getElementById("result");

mapContainer.style.display = "none";
blindMap.style.display = "none";
countryList.style.display = "none";
submitButton.style.display = "none";
restartButton.style.display = "none";
startButton.style.display = "block";

startButton.addEventListener("click", () => {
    fetch("SCRIPTS/europa.json")
      .then(response => response.json())
      .then(data => {
        countries = data;
        startGame();
      })
      .catch(error => {
        console.error(error);
        alert("Nem sikerült betölteni az adatokat! Próbáld újra később!");
      });
  });

function startGame() {
    mapContainer.style.display = "block";
    blindMap.style.display = "block";
    countryList.style.display = "block";
    submitButton.style.display = "block";
    restartButton.style.display = "block";
    startButton.style.display = "none";
    resultEl.textContent = "";

    generateCountryList();

    submitButton.addEventListener("click", handleSubmit);

}

function generateCountryList() {
    countryList.innerHTML = "";

    countries.sort((a, b) => a.id - b.id);

    for (let i = 0; i < countries.length; i++) {
        const country = countries[i];

        const rowEl = document.createElement("div");

        const nameEl = document.createElement("span");
        nameEl.innerText = country.id; 

        const guessEl = document.createElement("input");
        guessEl.type = "text";
        guessEl.style.width = "300px";
        guessEl.setAttribute("data-country-id", country.id);
        guessEl.placeholder = "Írd be az ország nevét!";

        guessEl.addEventListener('keydown', function(event) {
            if (event.keyCode === 13) {
                handleSubmit();
            }
        });

        rowEl.appendChild(nameEl);
        rowEl.appendChild(guessEl);

        countryList.appendChild(rowEl);
    }
}

function handleSubmit() {
    let correctAnswers = 0;
    let totalAnswers = countries.length;

    for (let i = 0; i < countries.length; i++) {
        const country = countries[i];
        const guessEl = document.querySelectorAll("#country-list input")[i];
        const guess = guessEl.value.trim().toLowerCase();

        if (guess === country.name.trim().toLowerCase()) {
            guessEl.style.backgroundColor = "green";
            correctAnswers++;
        } else if (guess === "") {
            guessEl.style.backgroundColor = "initial";
        } else {
            guessEl.style.backgroundColor = "red";
        }
    }
    
    resultEl.style.display = "block";
    resultEl.textContent = "Összesen " + correctAnswers + " helyes válaszod volt " + totalAnswers + " országból.";
}
  
restart.addEventListener("click", () => {
        startGame();
    });
