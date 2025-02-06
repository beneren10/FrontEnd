const home = document.querySelector('#buttons button')

home.addEventListener('click', buttonClick)

function buttonClick(e) {
    e.preventDefault()
    window.location.assign('./dashboard.html')
}

document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.assign('./landing.html')
})

let quizData = [];

// DOM elements#
const gameContainer = document.getElementById('gameContainer');
const question = document.querySelector('.question')
const scores = document.querySelector('#scoreContainer p span')
const startButton = document.getElementById('start');

let currentQuestion = 0;
let score = 0;
let level = document.getElementById('difficulty').value;

startButton.addEventListener('click',()=>{
  fetchQuizData();
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
    postScore(score);
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
    button.className = "btn btn-lg bg-warning border-muted text-dark"
    button.style.minWidth = "250px"
    button.style.minHeight = '100px'
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
    const token = localStorage.getItem('token');
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorisation': token
      },
      body: JSON.stringify({ score })
    };
    const response = await fetch(`http://localhost:3000/student/marks/score`, options)
    if (response.ok) {
      alert('Score posted successfully!');
    } else {
      alert('Error posting score');
    }
  } catch (error) {
    console.error('Error posting score:', error);
  }
}