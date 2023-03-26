const quizForm = document.getElementById('quiz-form');
const questionContainer = document.getElementById('question-container');
const submitButton = document.getElementById('submit-button');
const resetButton = document.getElementById('reset-button');
const resultContainer = document.getElementById('result-container');

const quizQuestions = [
    {
    question: 'Melyik ország nem tartozik a "kis tigrisek" közé?',
    answers: [
        { text: 'Tajvan.', correct: false },
        { text: 'Dél-Korea.', correct: false },
        { text: 'Szingapúr.', correct: false },
        { text: 'Japán.', correct: true }
    ]
    },
    {
    question: 'Melyik állítás igaz Japán mezőgazdaságára?',
    answers: [
        { text: 'Japán nem rendelkezik hatalmas halászflottával.', correct: false },
        { text: 'Japán területének nagy része hegyvidék, így csak 12% -át lehet művelni.', correct: true },
        { text: 'Kisparaszti gazdaságai alacsony termésátlagokat hoznak össze.', correct: false },
        { text: 'Az éghajlati adottságok miatt évente egyszer lehet aratni.', correct: false }
    ]
    },
    {
    question: 'Melyik része a gépgyártásnak nem tartozik a legfontosabbak közé Japán?',
    answers: [
        { text: 'Repülőgépgyártás.', correct: true },
        { text: 'Hajógyártás.', correct: false },
        { text: 'Személygépkocsigyártás.', correct: false },
        { text: 'Robottechnika kifejlesztése.', correct: false }
    ]
    },
    {
    question: 'Melyik állítás igaz Japán iparára?',
    answers: [
        { text: 'Japán ásványkincsekben gazdag, ezért a világ egyik legnagyobb nyersanyagexportálója.', correct: false },
        { text: 'Az ipar a Honshu sziget délkeleti partjára koncentrálódik.', correct: true },
        { text: 'A külkereskedelem az ország számára nem létfontosságú.', correct: false },
        { text: 'Tokió-Jokohama városa az ipari termelés felét adja.', correct: false }
    ]
    },
    {
    question: 'Mi jelenti a fő problémát a japán népességben?',
    answers: [
        { text: 'A társadalmat túlzott formalitás jellemzi, ami néha idegesítő lehet másoknak.', correct: false },
        { text: 'A túlzott egészségtelen étkezés miatt alacsony a születéskor várható élettartam.', correct: false },
        { text: 'Japán társadalma egy öregedő népesség.', correct: true },
        { text: 'Nagyon sok vallás van jelen az országban, amiért gyakran történnek konfliktusok.', correct: false }
    ]
    },
    {
    question: 'Mi jellemző Kína népességére?',
    answers: [
        { text: 'A népességszám a 2020-as évek végére stagnált, majd enyhén elkezdett csökkenni.', correct: true },
        { text: 'Kína népessége rendkívül egyenletesen oszlik az országban.', correct: false },
        { text: 'A migráció nem jellemző. 1-2 ezer kínai hagyja el az országot évente.', correct: false },
        { text: 'Kína népessége 1960 és 2005 között megduplázódott, azonban az utóbbi években sem csökkent a növekedés üteme.', correct: false },
    ]
    },
    {
    question: 'Melyik állítás hamis a kínai mezőgazdaságra?',
    answers: [
        { text: 'Kína munkaereje közül körülbelül negyede a mezőgazdaságban dolgozik.', correct: false },
        { text: 'A nomád állattenyésztés a nyugati Kínában a mezőgazdaság vezető ágazata.', correct: false },
        { text: 'Kína a Föld legnagyobb gabonatermelői közé tartozik.', correct: false },
        { text: 'Az elmúlt évtizedekben Kína nem ért el különösebb fejlődést a mezőgazdaságban.', correct: true }
    ]
    },
    {
    question: 'Melyik módszert alkalmazza a kínai állam a népesség növekedésének lassítására?',
    answers: [
        { text: 'Támogatja az emberek kivándorlását az országból.', correct: false },
        { text: 'Bevezették az "Egy család, egy gyermek" törvényét.', correct: true }
    ]
    },
    {
    question: 'Melyik állítás nem tartozik az indiai népesség problémái közé?',
    answers: [
        { text: 'India rendkívül sűrűn lakott ország.', correct: false },
        { text: 'Az indiai városok körül kialakult nyomornegyedek a városi élet szerves részét képezik.', correct: false },
        { text: 'Az ország északi részét fenyegeti az elsivatagosodás.', correct: true },
        { text: 'A lakosság negyede analfabéta.', correct: false }
    ]
    },
    {
    question: 'Hol található a "fekete arany" térsége?',
    answers: [
        { text: 'Törökországban.', correct: false },
        { text: 'Arab-félszigeten.', correct: true },
        { text: 'Koreai-félszigeten.', correct: false },
        { text: 'Kínában.', correct: false }
    ]
    }
];

let score = 0;

function displayQuestions() {
    quizQuestions.forEach((question, index) => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    const questionText = document.createElement('h2');
    questionText.innerText = `${index + 1}. ${question.question}`;
    questionElement.appendChild(questionText);
    question.answers.forEach(answer => {
        const answerLabel = document.createElement('label');
        answerLabel.classList.add('answer');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `question${index}`;
        input.value = answer.text;
        input.style.marginRight = '10px';
        answerLabel.appendChild(input);
        const answerText = document.createElement('span');
        answerText.innerText = answer.text;
        answerLabel.appendChild(answerText);
        questionElement.appendChild(answerLabel);
        
    });
    questionContainer.appendChild(questionElement);
});
}

function showResult() {
    const answerInputs = document.querySelectorAll('input:checked');
    answerInputs.forEach(answerInput => {
    const questionIndex = answerInput.name.slice(-1);
    const selectedAnswer = answerInput.value;
    const correctAnswer = quizQuestions[questionIndex].answers.find(answer => answer.correct).text;
    if (selectedAnswer === correctAnswer) {
        score++;
    } else {
        const mistakeElement = document.createElement('div');
        const mistakeText = document.createElement('p');
        mistakeText.innerText = `${parseInt(questionIndex) + 1}. kérdés: Helytelen! A helyes válasz: "${correctAnswer}"`;
        mistakeText.style.fontSize = '20px';
        mistakeText.style.webkitTextStroke = '1px purple';
        mistakeElement.appendChild(mistakeText);
        resultContainer.appendChild(mistakeElement);
    }
});

    resultContainer.insertAdjacentHTML('beforeend', `<h2>Pontszám: ${score}/${quizQuestions.length}.</h2>`);
    submitButton.disabled = true;

}

function resetQuiz() {
    score = 0;
    resultContainer.innerHTML = '';
    questionContainer.innerHTML = '';
    displayQuestions();
}

resetButton.addEventListener('click', resetQuiz);

function submitQuiz() {
    const answerInputs = document.querySelectorAll('input[type="radio"]:checked');
    if (answerInputs.length !== quizQuestions.length) {
      alert('Tölts ki minden mezőt!.');
      return;
    }
    showResult();
}

submitButton.addEventListener('click', event => {
    event.preventDefault();
    submitQuiz();
});

displayQuestions();
