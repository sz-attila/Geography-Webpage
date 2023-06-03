const quizForm = document.getElementById('quiz-form');
const questionContainer = document.getElementById('question-container');
const submitButton = document.getElementById('submit-button');
const resetButton = document.getElementById('reset-button');
const resultContainer = document.getElementById('result-container');
let score = 0;

const quizQuestions = [
    {
    question: 'Mi jellemző a Magyarországon élő nemzetiségekre?',
    answers: [
        { text: 'Magyarországon a lakosság kb. 30%-a tartozik más nemzetiséghez.', correct: false },
        { text: 'A nemzetiségeket kultúrájuk, nyelvük és közös történelmi múltjuk kötik össze.', correct: true },
        { text: 'A németek alkotják a legnagyobb nemzetiségi csoportot az országban.', correct: false },
        { text: 'A cigányságon belül nem különíthető el több különféle csoport.', correct: false }
    ]
    },
    {
    question: 'Hogyan alakul Magyarországon a népesség változása?',
    answers: [
        { text: 'A születések és a halálozások száma kiegyenlített.', correct: false },
        { text: 'Természetes úton növekszik.', correct: false },
        { text: 'Gyors ütemben növekszik.', correct: false },
        { text: 'Természetes úton csökken.', correct: true }
    ]
    },
    {
    question: 'Melyik település típusban él összességében legtöbb magyar?',
    answers: [
        { text: 'Város.', correct: true },
        { text: 'Község.', correct: false },
        { text: 'Falu.', correct: false }
    ]
    },
    {
    question: 'Melyik állítás igaz Budapestre?',
    answers: [
        { text: 'Budapest lassan fejlődött az első világháborúig.', correct: false },
        { text: 'Az M0-ás autópálya nem csökkenti lényegesen a városon áthaladó forgalmat.', correct: false },
        { text: 'Túlzottan erős a főváros-központúság hatása, ezért más területek fejlődése lemarad.', correct: true },
        { text: 'Budapest Európa "legzöldebb" városai közé sorolható.', correct: false }
    ]
    },
    {
    question: 'Mekkora a szántóföldek aránya?',
    answers: [
        { text: 'kb. 70%.', correct: false },
        { text: '<20%.', correct: false },
        { text: 'kb. 44%.', correct: true },
    ]
    },
    {
    question: 'Melyik állítás hamis a magyarországi energiagazdaságra?',
    answers: [
        { text: 'Magyarország energiaigénye alacsony, szinte teljes mértékben önellátó.', correct: true },
        { text: 'A vízenergia hasznosítása nem jelentős hazánkban.', correct: false },
        { text: 'A legfontosabb energiaforrásaink közé tartozik a kőolaj és a földgáz.', correct: false },
        { text: 'Az energiaforrások természetes anyagok vagy jelenségek, amelyekből energiát nyerhetünk.', correct: false }
    ]
    },
    {
    question: 'Melyik ipari ágazat számít Magyarország egyik húzóágazatának?',
    answers: [
        { text: 'Textilipar.', correct: false },
        { text: 'Bányászat.', correct: false },
        { text: 'Gépipar.', correct: true },
        { text: 'Építőanyag-ipar.', correct: false }
    ]
    },
    {
    question: 'Mit jelent az infrastruktúra fogalom?',
    answers: [
        { text: 'Egy város tömegközlekedési hálózata.', correct: false },
        { text: 'A gazdaság működését biztosító műszaki feltételek.', correct: true }
    ]
    },
    {
    question: 'Mely turizmus fajta nem jellemző Magyarországon?',
    answers: [
        { text: 'Spirituális turizmus.', correct: true },
        { text: 'Hivatásturizmus.', correct: false },
        { text: 'Gyógyturizmus.', correct: false },
        { text: 'Üdülőturizmus.', correct: false }
    ]
    },
    {
    question: 'Miért fontos az idegenforgalom Magyarországon?',
    answers: [
        { text: 'Mert a magyarországi munkavállalók 5%-át foglalkoztatják.', correct: false },
        { text: 'Magyarországon a GDP 4%-át az idegenforgalom adja.', correct: false },
        { text: 'A turisták közvetlenül hoznak bevételeket a szálláshelyeken.', correct: true }
    ]
    }
];

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

displayQuestions();


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

