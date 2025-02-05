let quizData = [];

// DOM elements#
const gameContainer = document.getElementById('gameContainer');
const question = document.querySelector('.question')
const scores = document.querySelector('#scoreContainer p span')

let currentQuestion = 0;
let score = 0;
let level = document.getElementById('difficulty').value;

async function fetchQuizData(level) {
  try {
    console.log('hit')
    const response = await fetch(`http://localhost:3000/spanish/games/translate/:${level}`);
    const quizData = await response.json();
    console.table('Quiz Data:', quizData);
    currentQuestion = 0;
    score = 0;
    // gameContainer.style.display = 'block';
    loadQuestion();
  } catch (error) {
    console.error('Error fetching quiz data:', error);
  }
}

// async function startQuiz() {
//     const difficulty = document.getElementById('difficulty').value;
//     try {
//       const response = await fetch(difficulty);
//       quizData = await response.json();
//       currentQuestion = 0;
//       score = 0;
//       gameContainer.style.display = 'block';
//       loadQuestion();
//     } catch (error) {
//       console.error('Error loading quiz data:', error);
//     }
//   }

function loadQuestion() {
    console.log("inside loadQuestion");
  if (currentQuestion >= quizData.length) {
   question.innerHTML = `<h2>Quiz Finished! Final Score: ${score}</h2>`;
    return;
  }

  const questionData = quizData[currentQuestion];
  console.log(questionData);
  question.innerHTML = `Translate: ${questionData.question}`;
  
  const options = [
    questionData.english, 
    questionData.fool_1, 
    questionData.fool_2, 
    questionData.fool_3
  ];
  
  // Shuffle the options randomly
  options.sort(() => Math.random() - 0.5);

  const optionContainer = document.getElementById('optionContainer');
  optionContainer.innerHTML = '';
  
  options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.onclick = () => checkAnswer(option, questionData.english);
    optionContainer.appendChild(button);
  });
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    score++;
    scores.textContent = score;
    alert('Correct!');
  } else {
    alert(`Wrong! Correct answer: ${correct}`);
  }
  currentQuestion++;
  loadQuestion();
}
