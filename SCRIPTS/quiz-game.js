const quizForm = document.getElementById('quiz-form');
const questionContainer = document.getElementById('question-container');
const submitButton = document.getElementById('submit-button');
const resetButton = document.getElementById('reset-button');
const resultContainer = document.getElementById('result-container');

// Define the quiz questions and answers
const quizQuestions = [
    {
    question: 'Mi az ausztriai mezőgazdaság fő ágazata?',
    answers: [
        { text: 'Növénytermesztés', correct: false },
        { text: 'Állattenyésztés', correct: true },
    ]
    },
    {
    question: 'Mi Csehország nehézipari központja?',
    answers: [
        { text: 'Karlovy Vary', correct: false },
        { text: 'Ostrava', correct: true },
        { text: 'České Budějovice', correct: false },
        { text: 'Prága', correct: false }
    ]
    },
    {
    question: 'Mi mondható tipikus skandináv jellegzetességnek?',
    answers: [
        { text: 'A házakat alapvetően téglákból készítik, és élénk színűre festik.', correct: false },
        { text: 'Az emberek általában kimértek, mindenhova sietve, de időben érkeznek.', correct: false },
        { text: 'Az északi emberek praktikusan, időjáráshoz alkalmazkodva öltözködnek.', correct: true }
    ]
    },
    {
    question: 'Melyik térségben található Európa legnagyobb nehézipari tömörülése?',
    answers: [
        { text: 'Volgamenti Gazdasági Körzet', correct: false },
        { text: 'Torino-Milánó-Genova ipari háromszög', correct: false },
        { text: 'Ruhr-vidék', correct: true },
        { text: 'Közép-Anglia', correct: false }
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
