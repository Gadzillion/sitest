const quizData = [
    {
        question: "Если птица сядет на оголённый провод, почему её не ударит током?",
        image: "image1.jpg",
        options: [
            "Разность потенциалов между лапами птиц слишком мала для протекания заметного тока",
            "Все провода, на которые садятся птицы, покрыты слоем изоляции",
            "Птицы — это не живые существа, а дроны теневого правительства, они подзаряжаются, сидя на проводах"
        ],
        correct: 0,
        explanation: "Разность потенциалов между лапами птиц слишком мала для протекания заметного тока."
    },
    {
        question: "Если гравитационные волны влияют на размер всех тел, то они должны растягивать и длины электромагнитных волн. Как тогда возможно зарегистрировать гравитационную волну с помощью оптического интерферометра?",
        image: "image2.jpg",
        options: [
            "Оптическим интерферометром невозможно поймать гравитационную волну",
            "Свет в принципе не взаимодействует с гравитационными волнами",
            "Принцип работы гравитационных антенн делает их не чувствительными к растяжению света гравитационными волнами"
        ],
        correct: 2,
        explanation: "Принцип работы гравитационных антенн делает их не чувствительными к растяжению света гравитационными волнами."
    },
    // Add more questions here, total 10 questions
    {
        question: "Third question example?",
        image: "image3.jpg",
        options: ["Option 1", "Option 2", "Option 3"],
        correct: 0,
        explanation: "Explanation for third question."
    },
    {
        question: "Fourth question example?",
        image: "image4.jpg",
        options: ["Option 1", "Option 2", "Option 3"],
        correct: 1,
        explanation: "Explanation for fourth question."
    },
    {
        question: "Fifth question example?",
        image: "image5.jpg",
        options: ["Option 1", "Option 2", "Option 3"],
        correct: 2,
        explanation: "Explanation for fifth question."
    },
    {
        question: "Sixth question example?",
        image: "image6.jpg",
        options: ["Option 1", "Option 2", "Option 3"],
        correct: 0,
        explanation: "Explanation for sixth question."
    },
    {
        question: "Seventh question example?",
        image: "image7.jpg",
        options: ["Option 1", "Option 2", "Option 3"],
        correct: 1,
        explanation: "Explanation for seventh question."
    },
    {
        question: "Eighth question example?",
        image: "image8.jpg",
        options: ["Option 1", "Option 2", "Option 3"],
        correct: 2,
        explanation: "Explanation for eighth question."
    },
    {
        question: "Ninth question example?",
        image: "image9.jpg",
        options: ["Option 1", "Option 2", "Option 3"],
        correct: 0,
        explanation: "Explanation for ninth question."
    },
    {
        question: "Tenth question example?",
        image: "image10.jpg",
        options: ["Option 1", "Option 2", "Option 3"],
        correct: 1,
        explanation: "Explanation for tenth question."
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];

function loadQuestion(index) {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';

    const questionData = quizData[index];

    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerText = questionData.question;
    quizContainer.appendChild(questionElement);

    const imageElement = document.createElement('img');
    imageElement.src = questionData.image;
    quizContainer.appendChild(imageElement);

    const optionsElement = document.createElement('ul');
    optionsElement.classList.add('options');

    questionData.options.forEach((option, i) => {
        const optionItem = document.createElement('li');
        const optionInput = document.createElement('input');
        optionInput.type = 'radio';
        optionInput.name = 'option';
        optionInput.value = i;
        optionInput.id = `option${i}`;
        optionInput.disabled = userAnswers[index] !== undefined;

        const optionLabel = document.createElement('label');
        optionLabel.htmlFor = `option${i}`;
        optionLabel.innerText = option;

        optionItem.appendChild(optionInput);
        optionItem.appendChild(optionLabel);
        optionsElement.appendChild(optionItem);
    });

    quizContainer.appendChild(optionsElement);

    const explanationElement = document.createElement('div');
    explanationElement.classList.add('explanation');
    explanationElement.innerText = questionData.explanation;
    quizContainer.appendChild(explanationElement);

    if (userAnswers[index] !== undefined) {
        quizContainer.classList.add('answered');
        explanationElement.style.display = 'block';
        displayAnswerFeedback(index);
    } else {
        quizContainer.classList.remove('answered');
        explanationElement.style.display = 'none';
    }

    document.getElementById('prev-btn').disabled = index === 0;
    document.getElementById('next-btn').disabled = index === quizData.length - 1;
    document.getElementById('next-btn').style.display = userAnswers[index] !== undefined ? 'block' : 'none';
    document.getElementById('submit-btn').style.display = userAnswers[index] === undefined ? 'block' : 'none';
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
        document.getElementById('quiz').classList.add('answered');
        document.querySelector('.explanation').style.display = 'block';
        displayAnswerFeedback(currentQuestionIndex);
        document.getElementById('next-btn').style.display = 'block';
        document.getElementById('submit-btn').style.display = 'none';
    }
}

function displayAnswerFeedback(index) {
    const options = document.querySelectorAll('.options input');
    options.forEach(option => {
        const optionValue = parseInt(option.value);
        if (optionValue === quizData[index].correct) {
            option.nextElementSibling.classList.add('correct');
        } else if (optionValue === userAnswers[index]) {
            option.nextElementSibling.classList.add('incorrect');
        }
    });
}

function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
}

function showResults() {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';
    const score = userAnswers.filter((answer, index) => answer === quizData[index].correct).length;

    const resultImage = document.createElement('img');
    resultImage.src = 'result_image.jpg'; // Replace with actual result image path
    quizContainer.appendChild(resultImage);

    const scoreElement = document.createElement('div');
    scoreElement.classList.add('score');
    scoreElement.innerText = `You scored ${score} out of ${quizData.length}`;
    quizContainer.appendChild(scoreElement);

    const jokeElement = document.createElement('div');
    jokeElement.classList.add('joke');
    if (score <= 3) {
        jokeElement.innerText = "Better luck next time!";
    } else if (score <= 6) {
        jokeElement.innerText = "Not bad, but you can do better!";
    } else if (score <= 9) {
        jokeElement.innerText = "Great job, almost perfect!";
    } else {
        jokeElement.innerText = "Perfect score! You're a genius!";
    }
    quizContainer.appendChild(jokeElement);

    const restartButton = document.createElement('button');
    restartButton.classList.add('restart-btn');
    restartButton.innerText = 'Restart Quiz';
    restartButton.onclick = restartQuiz;
    quizContainer.appendChild(restartButton);
}

function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    loadQuestion(currentQuestionIndex);
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion(currentQuestionIndex);
});
