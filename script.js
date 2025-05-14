// 🟣 STEP 1: Shuffle the original `qu` and pick 5 random questions
// ❗ Make sure this code is placed AFTER your original `qu` array is loaded.
let shuffledQuestions = qu.sort(() => 0.5 - Math.random()).slice(0, 5); // ✅ pick 5 random
let questionSet = shuffledQuestions; // ✅ use this in place of `qu`

// 🌟 Variables and DOM references
const startBtnw = document.querySelector('.startbtnw');
const guide = document.querySelector('.guide');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-sec');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
const nextBtn = document.querySelector('.next-btn');

let questionCounter = 0;
let questionNumb = 1;
let userScore = 0;

startBtnw.onclick = () => {
    guide.classList.add('active');
    main.classList.add('active');
};

exitBtn.onclick = () => {
    guide.classList.remove('active');
    main.classList.remove('active');
};

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    guide.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQue(0);
    questionCount(1);
    headerScore();
};

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    // 🟣 Reset values and pick 5 new questions
    questionCounter = 0;
    questionNumb = 1;
    userScore = 0;
    shuffledQuestions = qu.sort(() => 0.5 - Math.random()).slice(0, 5); // ✅ re-pick 5 questions
    questionSet = shuffledQuestions;

    showQue(questionCounter);
    questionCount(questionNumb);
    headerScore();
};

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    // 🟣 Reset values and pick 5 new questions
    questionCounter = 0;
    questionNumb = 1;
    userScore = 0;
    shuffledQuestions = qu.sort(() => 0.5 - Math.random()).slice(0, 5); // ✅ re-pick 5 questions
    questionSet = shuffledQuestions;

    showQue(questionCounter);
    questionCount(questionNumb);
};

nextBtn.onclick = () => {
    if (questionCounter < questionSet.length - 1) { // ✅ changed from qu to questionSet
        questionCounter++;
        showQue(questionCounter);
        questionNumb++;
        questionCount(questionNumb);
        nextBtn.classList.remove('active');
    } else {
        showResultBox();
    }
};

const optionList = document.querySelector('.option-list');

function showQue(index) {
    const queText = document.querySelector('.question-text');
    queText.textContent = `${questionSet[index].numb} Q/ ${questionSet[index].question}`; // ✅ changed to questionSet

    let optionTag = `
    <div class="option"><span>${questionSet[index].options[0]}</span></div>
    <div class="option"><span>${questionSet[index].options[1]}</span></div>
    <div class="option"><span>${questionSet[index].options[2]}</span></div>
    <div class="option"><span>${questionSet[index].options[3]}</span></div>
    `;

    optionList.innerHTML = optionTag;
    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++)
        option[i].setAttribute('onclick', 'optionSelected(this)');
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questionSet[questionCounter].answer; // ✅ changed to questionSet
    let allOptions = optionList.children.length;

    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    } else {
        answer.classList.add('wrong');
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disable');
    }

    nextBtn.classList.add('active');
}

function questionCount(index) {
    const queTotal = document.querySelector('.question-counting');
    queTotal.textContent = `${index} of ${questionSet.length} questions`; // ✅ changed to questionSet
}

function headerScore() {
    const headerScoreTxet = document.querySelector('.header-score');
    headerScoreTxet.textContent = `score: ${userScore} / ${questionSet.length}`; // ✅ changed to questionSet
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your score: ${userScore} out of ${questionSet.length}`; // ✅ changed to questionSet

    const circulrPro = document.querySelector('.circuler-progres');
    const proValue = document.querySelector('.progres-value');
    let progresStartValue = -1;
    let progresEndValue = (userScore / questionSet.length) * 100; // ✅ changed to questionSet
    let speed = 20;

    let progres = setInterval(() => {
        progresStartValue++;
        circulrPro.style.background = `conic-gradient(#c40094 ${progresStartValue * 3.6}deg , rgba(255 ,255,255,0.1) 0deg)`;
        proValue.textContent = `${progresStartValue}%`;
        if (progresStartValue == Math.round(progresEndValue)) {
            clearInterval(progres);
        }
    }, speed);
}
