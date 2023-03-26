const quizForm = document.getElementById('quiz-form');
const questionContainer = document.getElementById('question-container');
const submitButton = document.getElementById('submit-button');
const resetButton = document.getElementById('reset-button');
const resultContainer = document.getElementById('result-container');

const quizQuestions = [
    {
        question: 'Kik voltak Észak-Amerika őslakói?',
        answers: [
            { text: 'Az aztékok.', correct: false },
            { text: 'Az inkák.', correct: false },
            { text: 'Az indiánok.', correct: true },
            { text: 'A maják.', correct: false }
        ]
        },
    {
    question: 'Mi jellemző Amerika városiasodásásra?',
    answers: [
        { text: 'Az amerikai népesség kevesebb mint háromnegyed része városlakó.', correct: false },
        { text: 'A vidéki településeken nem terjed a városi életmód.', correct: false },
        { text: 'Az urbanizáció nagyon gyors a kontinensen, ami együtt jár a városok területének terjeszkedésével.', correct: true },
        { text: 'Az infrastruktúra lassan fejlődik.', correct: false }
    ]
    },
    {
    question: 'Miért lett az Egyesült Államok vezető gazdasági ágazata a szolgáltatások?',
    answers: [
        { text: 'Mert az aktív keresők mintegy 35%-a ebben a gazdasági ágban dolgozik.', correct: false },
        { text: 'Mert az USA gazdasági fejlődésének kezdetén a természeti erőforrások és a bevándorlók nem szolgáltak alapul.', correct: false },
        { text: 'Mert innen származik az ország GDP-jének is mintegy 65%-a.', correct: false },
        { text: 'Mert az új, csúcstechnológiát alkalmazó ipari ágazatok egyre inkább felváltják a nyersanyagigényes és hagyományos ipari ágazatokat.', correct: true }
    ]
    },
    {
    question: 'Válaszd ki a helyes párt!',
    answers: [
        { text: 'New York - főváros.', correct: false },
        { text: 'Boston - kutatás-fejlesztés fellegvára.', correct: true },
        { text: 'Detroit - déli térség ipari és pénzügyi központja.', correct: false },
        { text: 'New Orleans - a NASA kutató-fejlesztő központja.', correct: false }
    ]
    },
    {
    question: 'Mi nem jellemző az USA mezőgazdasági helyzetére?',
    answers: [
        { text: 'Az ország valamivel kevesebb mint 25%-át foglalkoztatja.', correct: true },
        { text: 'A természeti adottságokhoz igazodva övekbe rendeződött.', correct: false },
        { text: 'A világ legnagyobb élelmiszer- és takarmányexportőre.', correct: false },
        { text: 'Farmokon folyik a mezőgazdaság.', correct: false }
    ]
    },
    {
    question: 'Válaszd ki azt a gazdasági térséget, ahol található a Szilícium-völgy!',
    answers: [
        { text: 'Nagy-tavak térsége (Chicago és Detroit).', correct: false },
        { text: 'Az ország déli részén (New Orleans és Atlanta).', correct: false },
        { text: 'Texas államban (Dallas és Houston).', correct: false },
        { text: 'Az ország nyugati részén (San Francisco és Los Angeles).', correct: true }
    ]
    },
    {
    question: 'Melyik állítás hamis az USA déli térségének a gazdaságáról?',
    answers: [
        { text: 'A déli térség azért is fontos, mert közel fekszik Latin-Amerikához, ahonnan olcsóbb munkaerő érkezik.', correct: true },
        { text: 'Mexikói-öböl kőolaj- és földgáznyersanyagainak modern vegyipara is itt található.', correct: false },
        { text: 'Az űreszközök indítása a Floridai-félszigetről végzik.', correct: false },
        { text: 'Miami kiemelt turisztikai célpont.', correct: false }
    ]
    },
    {
    question: 'Melyik állítás igaz az USA északi térségének a gazdaságáról?',
    answers: [
        { text: 'Az Amerikai Egyesült Államok első iparvidékei itt alakultak ki.', correct: true },
        { text: 'Chicago, amely az autógyártás fellegvára, az elmúlt évtizedekben lendült fel.', correct: false },
        { text: 'A hagyományos nehézipari ágazatok és a gépkocsigyártás helyét nem váltotta fel új iparág.', correct: false }
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
