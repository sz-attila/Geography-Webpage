const quizForm = document.getElementById('quiz-form');
const questionContainer = document.getElementById('question-container');
const submitButton = document.getElementById('submit-button');
const resetButton = document.getElementById('reset-button');
const resultContainer = document.getElementById('result-container');

const quizQuestions = [
    {
    question: 'Mi Afrika legmagasabb hegysége?',
    answers: [
        { text: 'Kilimandzsáró.', correct: true },
        { text: 'Atlasz.', correct: false },
        { text: 'Tibeszti.', correct: false },
        { text: 'Elgon.', correct: true }
    ]
    },
    {
    question: 'Melyik nyelven beszélnek a legttöbben Afrikában?',
    answers: [
        { text: 'Angol.', correct: false },
        { text: 'Arab.', correct: true },
        { text: 'Francia.', correct: false },
        { text: 'Törzsi nyelvek.', correct: false }
    ]
    },
    {
    question: 'Hogy hívják a Szahara vándorait?',
    answers: [
        { text: 'Mandigók.', correct: false },
        { text: 'Hauszák.', correct: false },
        { text: 'Fulbék.', correct: false },
        { text: 'Tuaregek.', correct: true }
    ]
    },
    {
    question: 'Mi Afrika legfejlettebb gazdasági központja?',
    answers: [
        { text: 'Fokváros.', correct: false },
        { text: 'Tunisz.', correct: false },
        { text: 'Johannesburg.', correct: true },
        { text: 'Kairó.', correct: false }
    ]
    },
    {
    question: 'Melyik állítás igaz Afrika mezőgazdaságára?',
    answers: [
        { text: 'A sivatagos terülteken jellegzetes az oázisgazdálkodás.', correct: true },
        { text: 'Afrika területének kb. 30% megművelt terület.', correct: false },
        { text: 'Az afrikai lakosság többsége nagy parcellákon, kezdetleges eszközökkel, 1-2 fajta növényt termeszt.', correct: false },
        { text: 'A tengerpartokon, ahol rosszabb minőségűek az utak, kisebb területű parasztgazdálkodás folyik.', correct: false }
    ]
    },
    {
    question: 'Mi jellemző a Száhel-övre?',
    answers: [
        { text: 'Növekszik a a természetes növényzet.', correct: false },
        { text: 'A kunyhókat téglaházak váltották fel.', correct: false },
        { text: 'Egyre kevesebb az állatartás.', correct: false },
        { text: 'Folytatódik az elsivatagosodás', correct: true }
    ]
    },
    {
    question: 'Melyik állattartási forma a legjellemzőbb Afrikára?',
    answers: [
        { text: 'Istállozó állattartás.', correct: false },
        { text: 'Nomád pásztorkodás.', correct: true },
        { text: 'Nagyüzemi állattartás.', correct: false }
    ]
    },
    {
    question: 'Mi jellemző az afrikai népességre?',
    answers: [
        { text: 'Afrika népessége rendkívül egyenletesen oszlik el.', correct: false },
        { text: 'A népesség rendkívül lassan növekszik.', correct: false },
        { text: 'A népesség mintegy 40%-a 14 év alatti gyermek.', correct: true },
        { text: 'Sok afrikai országban az anyáknak csak 1-2 gyermeke születik.', correct: false }
    ]
    },
    {
    question: 'Melyik állítás igaz Ausztráliáról?',
    answers: [
        { text: 'Északkeleti partjai mentén húzódik a Nagy-korallzátony.', correct: true },
        { text: 'A Kelet-ausztráliai ősföld az alapja, amelynek több helyen ősi hegységek emelkednek ki.', correct: false },
        { text: 'A Nagy-Artézi-medencét édes vízű tavak töltik ki.', correct: false },
        { text: 'A népesség nagy része a kontinens belső részein telepedett le.', correct: false }
    ]
    },
    {
    question: 'Melyik a legnépesebb ausztrál város?',
    answers: [
        { text: 'Canberra.', correct: false },
        { text: 'Perth.', correct: false },
        { text: 'Melbourne.', correct: false },
        { text: 'Sydney.', correct: true }
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
