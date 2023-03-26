const quizForm = document.getElementById('quiz-form');
const questionContainer = document.getElementById('question-container');
const submitButton = document.getElementById('submit-button');
const resetButton = document.getElementById('reset-button');
const resultContainer = document.getElementById('result-container');

const quizQuestions = [
    {
    question: 'Mi Csehország nehézipari központja?',
    answers: [
        { text: 'Karlovy Vary.', correct: false },
        { text: 'Ostrava.', correct: true },
        { text: 'České Budějovice.', correct: false }
    ]
    },
    {
    question: 'Melyik állítás igaz a lengyel mezőgazdaságra?',
    answers: [
        { text: 'A fő növények takarmánynövények, amelyeket a szarvasmarha tenyésztéséhez használnak.', correct: true },
        { text: 'Leginkább búzát, árpát és kukoricát termesztenek.', correct: false },
        { text: 'A sok hegyvidék miatt nem játszik nagy szerepet a mezőgazdaság.', correct: false },
        { text: 'Hatékony gazdálkodást folytatnak a kis parcellákon.', correct: false }
    ]
    },
    {
    question: 'Melyik város a magyar kisebbség központja Szlovákiában?',
    answers: [
        { text: 'Pozsony.', correct: false },
        { text: 'Dunaszerdahely.', correct: true },
        { text: 'Kassa.', correct: false }
    ]
    },
    {
    question: 'Melyik állítás igaz a román gazdaságra?',
    answers: [
        { text: 'Temesvár fontos gépipari központ.', correct: false },
        { text: 'A Dacia autógyár, amely a német Volkswagen tulajdonában van, Piteștiben működik, és az egyik legismertebb összeszerelő üzem Romániában.', correct: false },
        { text: 'Az elektronikai iparba, az informatikába és az autóiparba történt befektetések különösen jelentősek.', correct: true },
        { text: 'Bukarest nem éri el a kelet-közép-európai fővárosok fejlettségi szintjét.', correct: false }
    ]
    },
    {
    question: 'Melyik román város és ipari ágazat pár helytelen?',
    answers: [
        { text: 'Pitești - Dacia autógyár.', correct: false },
        { text: 'Brassó - Gépipar.', correct: false },
        { text: 'Temesvár - Textilipar', correct: true },
    ]
    },
    {
    question: 'Melyik ágazat kiemelkedő Ukrajnában?',
    answers: [
        { text: 'A mezőgazdaság, mert Ukrajna területének 71%-a művelhető, amely világszinten is jelentős arány.', correct: true },
        { text: 'A nehézipar, amely kőszénre, vas- és mangánércre épül.', correct: false },
        { text: 'Az energia gazdálkodás, ami a Dnyeper folyón kialakított vízerőműrendszerre és az atomerőművekre épül.', correct: false }
    ]
    },
    {
    question: 'Melyik állítás hamis Ausztriára?',
    answers: [
        { text: 'A kohászati központjaikhoz fejlett gépipar társul.', correct: false },
        { text: 'A növénytermesztés az elsődleges ágazata a mezőgazdaságnak.', correct: true },
        { text: 'Graz, a fa-, papír- és bútoripar központja.', correct: false },
        { text: 'Bécsben található a Nemzetközi Atomenergia Ügynökség és az OPEC központja.', correct: false }
    ]
    },
    {
    question: 'Melyik város Németország pénzügyi központja?',
    answers: [
        { text: 'Berlin.', correct: false },
        { text: 'München.', correct: false },
        { text: 'Bonn.', correct: false },
        { text: 'Frankfurt.', correct: true }
    ]
    },
    {
    question: 'Európa melyik része mondható a kontinens legnagyobb nehézipari tömörülésének?',
    answers: [
        { text: 'Ruhr-vidék, Németország.', correct: true },
        { text: 'Volgamenti Gazdasági Körzet, Oroszország.', correct: false },
        { text: 'Torino-Milánó-Genova ipari háromszög, Olaszország.', correct: false },
        { text: 'Közép-Anglia, Egyesült Királyság.', correct: false }
    ]
    },
    {
    question: 'Németországban a személygépkocsi-gyártás az egyik legnagyobb húzóágazat. Melyik város-személygépkocsi pár helytelen?',
    answers: [
        { text: 'BMW - München.', correct: false },
        { text: 'Mercedes-Benz - Stuttgart.', correct: false },
        { text: 'Ford - Köln.', correct: false },
        { text: 'Audi - Berlin.', correct: true },
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
