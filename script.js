const quiz = [
    {
        question: "1- O que é dengue?",
        answers: ["Uma doença viral", "Uma bactéria", "Uma alergia", "Um fungo"],
        correct: 0
    },
    {
        question: "2- Qual é o vetor da dengue?",
        answers: ["Aedes aegypti", "Culex", "Anopheles", "Mansonia"],
        correct: 0
    },
    {
        question: "3- Quais são os sintomas da dengue?",
        answers: ["Febre, dor de cabeça e dor no corpo", "Tosse e espirros", "Náusea e vômito", "Erupções na pele"],
        correct: 0
    },
    {
        question: "4- Como a dengue é transmitida?",
        answers: ["Pelo mosquito Aedes aegypti", "Pelo ar", "Pela água", "Por contato físico"],
        correct: 0
    },
    {
        question: "5- Qual é a forma mais eficaz de prevenir a dengue?",
        answers: ["Eliminando criadouros de mosquitos", "Tomando vacinas", "Usando antibióticos", "Usando repelentes"],
        correct: 0
    },
    {
        question: "6- Qual é o nome científico do mosquito transmissor da dengue?",
        answers: ["Aedes aegypti", "Culex pipiens", "Anopheles gambiae", "Mansonia titillans"],
        correct: 0
    },
    {
        question: "7- Em que tipo de ambiente o Aedes aegypti se reproduz?",
        answers: ["Água parada", "Solo seco", "Água corrente", "Folhagens"],
        correct: 0
    },
    {
        question: "8- Qual é o período de incubação da dengue?",
        answers: ["4 a 10 dias", "1 a 3 dias", "11 a 20 dias", "Mais de 20 dias"],
        correct: 0
    },
    {
        question: "9- A dengue pode evoluir para uma forma mais grave chamada:",
        answers: ["Dengue hemorrágica", "Febre amarela", "Malária", "Zika"],
        correct: 0
    },
    {
        question: "10- Qual órgão do governo brasileiro é responsável por controlar e prevenir a dengue?",
        answers: ["Ministério da Saúde", "Ministério da Educação", "Ministério da Agricultura", "Ministério do Meio Ambiente"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

function shuffleAnswers(answers) {
    const shuffled = answers
        .map((answer, index) => ({ answer, index }))
        .sort(() => Math.random() - 0.5);
    return shuffled;
}

function updateQuestion() {
    const questionElement = document.querySelector('.questao');
    const counterElement = document.querySelector('.contador');
    const answerButtons = document.querySelectorAll('.botao');

    const currentQuestion = quiz[currentQuestionIndex];
    
    const shuffledAnswers = shuffleAnswers(currentQuestion.answers);

    questionElement.textContent = currentQuestion.question;
    counterElement.textContent = `${currentQuestionIndex + 1}/${quiz.length}`;

    // Atualiza os botões de resposta com as respostas embaralhadas
    answerButtons.forEach((button, index) => {
        button.textContent = shuffledAnswers[index].answer;
        button.classList.remove('verde', 'vermelho'); // Limpa as classes de cor anteriores
        button.onclick = () => checkAnswer(shuffledAnswers[index].index);
    });
}

function checkAnswer(selectedIndex) {
    const answerButtons = document.querySelectorAll('.botao');
    const currentQuestion = quiz[currentQuestionIndex];

    if (selectedIndex === currentQuestion.correct) {
        answerButtons.forEach(button => {
            if (button.textContent === currentQuestion.answers[selectedIndex]) {
                button.classList.add('verde'); // Adiciona classe verde para resposta correta
            }
        });
        correctAnswers++;
    } else {
        answerButtons.forEach(button => {
            if (button.textContent === currentQuestion.answers[selectedIndex]) {
                button.classList.add('vermelho'); // Adiciona classe vermelha para resposta errada
            }
            if (button.textContent === currentQuestion.answers[currentQuestion.correct]) {
                button.classList.add('verde'); // Destaca a resposta correta em verde
            }
        });
        wrongAnswers++;
    }

    // Desabilita cliques adicionais após responder
    answerButtons.forEach(button => {
        button.onclick = null;
    });

    if (wrongAnswers > 3) {
        alert("Você errou mais de 3 questões. Por favor, reinicie o jogo.");
        resetGame();
    } else {
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quiz.length) {
                updateQuestion();
            } else {
                showFinalScore();
            }
        }, 1000); // Aguarda 1 segundo antes de avançar para a próxima pergunta
    }
}

function resetGame() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    updateQuestion();
    
    const questoesContainer = document.querySelector('.questoes-container');
    questoesContainer.style.display = 'block'; // Exibe o contêiner de questões
    
    const scoreContainer = document.querySelector('.score-container');
    scoreContainer.style.display = 'none'; // Oculta o contêiner de pontuação final
}

function showFinalScore() {
    const finalScore = document.querySelector('.final-score');
    const scoreContainer = document.querySelector('.score-container');
    const questoesContainer = document.querySelector('.questoes-container');
    
    finalScore.textContent = `Você completou o quiz! Pontuação final: ${correctAnswers} de ${quiz.length}`;
    
    questoesContainer.style.display = 'none'; // Oculta o contêiner de questões
    scoreContainer.style.display = 'block'; // Exibe o contêiner de pontuação final
}

document.addEventListener('DOMContentLoaded', () => {
    updateQuestion();

    const resetButton = document.querySelector('.reiniciar-jogo-botao');
    resetButton.addEventListener('click', resetGame);
});
