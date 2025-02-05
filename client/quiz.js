let quizData = [];

// DOM elements#
const gameContainer = document.getElementById('gameContainer');
const question = document.querySelector('.question')
const scores = document.querySelector('#scoreContainer p span')
const startButton = document.getElementById('start');

let currentQuestion = 0;
let score = 0;

startButton.addEventListener('click',()=>{
  fetchQuizData();
  if (score > 0) {
    postScore(score);
    scores.textContent = 0;
  }
});

async function fetchQuizData() {
  try {
    const level = document.getElementById('difficulty').value;
    const response = await fetch(`http://localhost:3000/spanish/games/translate/${level}`);
    const quizData = await response.json();
    currentQuestion = 0;
    score = 0;
    gameContainer.style.display = 'block';
    loadQuestion(quizData);
  } catch (error) {
    console.error('Error fetching quiz data:', error);
  }
}

function loadQuestion(quizData) {
  if (currentQuestion >= quizData.length) {
   question.innerHTML = `<h2>Quiz Finished! Final Score: ${score}</h2>`;
    return;
  }

  const questionData = quizData[currentQuestion];
  question.textContent = `Translate: ${questionData.question}`;
  
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
    button.onclick = () =>{
      checkAnswer(option, questionData.english);
      currentQuestion++;
      loadQuestion(quizData);
    } 
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
}

async function postScore(score) {
  try {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ score })
    };
    const response = await fetch(`http://localhost:3000/spanish/games/score`, options)
    if (response.ok) {
      alert('Score posted successfully!');
    } else {
      alert('Error posting score');
    }
  } catch (error) {
    console.error('Error posting score:', error);
  }
}