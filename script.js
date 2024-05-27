const quizData = [
    {
        question: "Если птица сядет на оголённый провод, почему её не ударит током?",
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
        options: [
            "Оптическим интерферометром невозможно поймать гравитационную волну",
            "Свет в принципе не взаимодействует с гравитационными волнами",
            "Принцип работы гравитационных антенн делает их не чувствительными к растяжению света гравитационными волнами"
        ],
        correct: 2,
        explanation: "Принцип работы гравитационных антенн делает их не чувствительными к растяжению света гравитационными волнами."
    }
    // Add more questions here
];

let currentQuestion = 0;
let userAnswers = [];

function loadQuestion(index) {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';

    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerText = quizData[index].question;
    quizContainer.appendChild(questionElement);

    const optionsElement = document.createElement('ul');
    optionsElement.classList.add('options');

    quizData[index].options.forEach((option, i) => {
        const optionItem = document.createElement('li');
        const optionInput = document.createElement('input');
        optionInput.type = 'radio';
        optionInput.name = 'option';
        optionInput.value = i;
        optionInput.id = `option${i}`;
        optionInput.disabled = userAnswers[index] !== undefined;

        if (userAnswers[index] === i) {
            optionInput.checked = true;
        }

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
    explanationElement.innerText = quizData[index].explanation;
    quizContainer.appendChild(explanationElement);

    if (userAnswers[index] !== undefined) {
        quizContainer.classList.add('answered');
    } else {
        quizContainer.classList.remove('answered');
    }

    optionsElement.addEventListener('change', (e) => {
        userAnswers[index] = parseInt(e.target.value);
        explanationElement.style.display = 'block';
        quizContainer.classList.add('answered');
    });
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion(currentQuestion);
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(currentQuestion);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion(currentQuestion);
});
