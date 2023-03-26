const quizForm = document.getElementById('quiz-form');
const questionContainer = document.getElementById('question-container');
const submitButton = document.getElementById('submit-button');
const resetButton = document.getElementById('reset-button');
const resultContainer = document.getElementById('result-container');

const quizQuestions = [
    {
    question: 'Micsodák a fjordok?',
    answers: [
        { text: 'Észak-atlanti áramlás, amitől nem fagynak be az öblök.', correct: false },
        { text: 'Hosszú, keskeny, mély, U alakú öblök, amelyeket a jégkorszakbeli gleccserek formáltak.', correct: true },
        { text: 'Így hívják Norvégia halászflottáját.', correct: false },
        { text: 'A tipikus skandináv módra megépített, élénk színű házak.', correct: false }
    ]
    },
    {
    question: 'Melyik orosz gazdasági körzetnek van megadva helytelenül a központja?',
    answers: [
        { text: 'Északnyugati Gazdasági Körzet - Szentpétervár.', correct: false },
        { text: 'Központi Gazdasági Körzet - Moszkva.', correct: false },
        { text: 'Uráli Gazdasági Körzet - Nyizsnyij Novgorod.', correct: true }
    ]
    },
    {
    question: 'Miért kétarcú Oroszország?',
    answers: [
        { text: 'A lakosság vagy nagyon fiatal vagy nagyon öreg.', correct: false },
        { text: 'Az orosz emberek vagy nagyon gazdagok vagy nagyon szegények.', correct: false },
        { text: 'Az orosz embereket nem igazán jellemzi az őszinteség.', correct: false },
        { text: 'Az életkörülmények a falvakban nagyon eltérőek a városoktól.', correct: true }
    ]
    },
    {
    question: 'Mi a fő indoka annak, hogy nem egyértelmű Spanyolország gazdaságának a megitélése?',
    answers: [
        { text: 'Az ország túl sok államadossággal rendelkezik.', correct: true },
        { text: 'Túl sok a hajléktalan ember a nagyvárosokban.', correct: false },
        { text: 'A spanyol emberek híresen lazán állnak hozzá a munkához, ezért a gazdaság nem tud igazán kiemelkedni.', correct: false }
    ]
    },
    {
    question: 'Melyik állítás hamis a Balkán-félszigetről?',
    answers: [
        { text: 'A Balkán-félsziget lakóinak többsége szláv népcsoportba tartozik.', correct: false },
        { text: 'A nemzetiségek keveredése sok problémát okoz a térségben.', correct: false },
        { text: 'A Balkán-félsziget a kontinens legszegényebb országainak ad otthont.', correct: false },
        { text: 'Annak ellenére, hogy kirobbant a délszláv háború 1990-ben, kevesen hagyták el az országot.', correct: true }
    ]
    },
    {
    question: 'Melyik ország nem tartozik az Egyesült Királysághoz?',
    answers: [
        { text: 'Anglia.', correct: false },
        { text: 'Skócia.', correct: false },
        { text: 'Írország.', correct: true },
        { text: 'Wales.', correct: false }
    ]
    },
    {
    question: 'Melyik állítás igaz az ipari forradalomra?',
    answers: [
        { text: 'Az első nehézipari körzet Közép-Angliában jött létre.', correct: true },
        { text: 'Az ipari forradalom a 16. században Nyugat-Európából indult el.', correct: false },
        { text: 'Az ipari forradalom akkor kezdődött amikor az alapanyag feldolgozókat elköltöztették a nyersanyaglelőhelyektől.', correct: false },
        { text: 'Kevés ember talált munkát a szolgáltatásokban.', correct: false }
    ]
    },
    {
    question: 'Melyik állítás illik a francia mezőgazdaságra?',
    answers: [
        { text: 'A hűvös, csapadékos északnyugati régióban a növénytermesztés az uralkodó tevékenység.', correct: false },
        { text: 'Franciaország az Európai Unió mezőgazdasági nagyhatalma, az aktív keresők 15%-át foglalkoztatja.', correct: false },
        { text: 'A mediterrán déli részen az olajfa és a citrusfélék, valamint illóolajban gazdag növények díszítik a területet.', correct: true },
        { text: 'A kisbirtokok a német típusú szövetkezetekhez hasonló összefogás révén tudnak érvényesülni.', correct: false }
    ]
    },
    {
    question: 'Miért sokszínű Franciaország népessége?',
    answers: [
        { text: 'Az Európai Unióban itt van a legmagasabb életszínvonal.', correct: false },
        { text: 'A korábbi gyarmatokból, különösen Afrikából, sok bevándorló érkezett Franciaországba.', correct: true },
        { text: 'A francia kultúra népszerűsége világszinten vonza az embereket.', correct: false }
    ]
    },
    {
    question: 'Mely lépés nem tette lehetővé a Benelux államok gazdasági fellendülését a második világháború után?',
    answers: [
        { text: 'Közös fizetőeszköz.', correct: true },
        { text: 'Egymás közti vámok eltörlése.', correct: false },
        { text: 'Szabad mozgás az áruk, munkaerő és tőke számára.', correct: false }
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
