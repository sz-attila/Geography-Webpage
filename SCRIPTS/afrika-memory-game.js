const game = document.getElementById('game');
const startButton = document.getElementById('start');
const answerInput = document.getElementById('answer');
const timer = document.getElementById('timer');
const guessedList = document.getElementById('guessed-countries');
const guessesRemaining = document.getElementById('guesses-remaining');

let countries = [];
let guessedCountries = [];
let timeLeft = 300;
let timerInterval;

startButton.addEventListener("click", () => {
    fetch("SCRIPTS/afrika.json")
        .then(response => response.json())
        .then(data => {
            countries = data.map(country => ({
                name: country.name.trim().toLowerCase(),
                image: country.image,
                capital: country.capital
            }));
            startGame();
        })
        .catch(error => {
            console.error(error);
            alert("Nem sikerült betölteni az adatokat! Próbáld újra később!");
        });
});

function startGame() {
    guessedCountries = [];
    guessedList.innerHTML = '';

    startButton.disabled = true;
    answerInput.disabled = false;
    answerInput.focus();

    startTimer();
    updateGuessesRemaining();

    answerInput.addEventListener('keydown', function(event) {
        if (event.keyCode === 13) {
            checkAnswer();
        }
    });
}

function checkAnswer() {
    const guess = answerInput.value.trim().toLowerCase();

    answerInput.value = '';

    for (let i = 0; i < countries.length; i++) {
        const country = countries[i];

        if (country.name === guess && !guessedCountries.includes(country)) {
            guessedCountries.push(country);

            const guessedListItem = document.createElement('div');
            const countryName = document.createElement('h1');
            const capitalCity = document.createElement('p');
            const countryImage = document.createElement('img');
            countryName.textContent = country.name.trim().toUpperCase();
            countryName.style.fontSize = '18px';

            capitalCity.textContent = `Főváros: ${country.capital}`;
            countryImage.src = country.image;
            guessedListItem.appendChild(countryName);
            guessedListItem.appendChild(countryImage);
            guessedListItem.appendChild(capitalCity);
            guessedList.appendChild(guessedListItem);
            guessedList.style.border = '1px solid saddlebrown';
            if (guessedCountries.length === countries.length) {
                endGame('won');
            }

            updateGuessesRemaining();
            break;
        }
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft === 0) {
            endGame('lost');
        }
    }, 1000);
}

function endGame(outcome) {
    clearInterval(timerInterval);
    answerInput.disabled = true;

    if (outcome === 'won') {
        alert('Gratulálok kitaláltad az összes országot!');
    } else {
        alert('Lejárt az idő!');
    }
    startButton.disabled = false;
}

function updateGuessesRemaining() {
    const remaining = countries.length - guessedCountries.length;
    guessesRemaining.textContent = `${remaining} ország maradt hátra`;
}