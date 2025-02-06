const home = document.querySelector('#buttons button')

home.addEventListener('click', buttonClick)

function buttonClick(e) {
    e.preventDefault()
    window.location.assign('./dashboard.html')
}

let quizData = [];

// DOM elements#
const gameContainer = document.getElementById('gameContainer');
const question = document.querySelector('.question')
const scores = document.querySelector('#scoreContainer p span')
const startButton = document.getElementById('start');
const optionContainer = document.getElementById('optionContainer');


let currentQuestion = 0;
let score = 0;


let level = document.getElementById('difficulty').value;

//quiz state variables
let quizState = {
  start: true,
  playing: false,
  endQuiz: false,
};



startButton.addEventListener('click',()=>{
  if (score > 0) {
    postScore(score);
    scores.textContent = 0;
  }
  fetchQuizData();
});

async function fetchQuizData() {
  try {
    const level = document.getElementById('difficulty').value;
    const response = await fetch(`https://lingoquest-backend.onrender.com/spanish/games/translate/${level}`);
    const quizData = await response.json();
    currentQuestion = 0;
    score = 0;
    gameContainer.style.display = 'block';
    startButton.style.display = 'none';
    quizState.start = false;
    quizState.playing = true;
    loadQuestion(quizData);
  } catch (error) {
    console.error('Error fetching quiz data:', error);
  }
}

function loadQuestion(quizData) {
 
  if (!quizState.playing || currentQuestion >= quizData.length) {
    endQuiz();
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

  optionContainer.innerHTML = '';
  options.forEach(option => {
    const button = document.createElement('button');
    button.className = 'option-button';
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
  const feedback = document.createElement('p');
  if (selected === correct) {
    score++;
    scores.textContent = score;
    feedback.textContent = 'Correct!';
    feedback.classList.add('correct-feedback');
  } else {
    feedback.textContent = `Wrong! Correct answer: ${correct}`;
    feedback.classList.add('wrong-feedback');
  }

  if (score === 10) {
    feedback.textContent = 'Congratulations! You have got full score on the quiz!';
    feedback.classList.add('full-score');
  }
  gameContainer.appendChild(feedback);

  setTimeout(() => feedback.remove(), 1500); // Remove feedback after 2 seconds
}

const endQuiz = () => {
  quizState.playing = false;
  quizState.endQuiz = true;

  question.innerHTML = `<h2>Quiz Finished! Final Score: ${score}</h2>`;
  optionContainer.innerHTML = '';
  startButton.style.display = 'block';

  // Post the final score after updates
  postScore(score);
};


async function postScore(score) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not logged in. Unable to post score.');
      return;
    }
  
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
      body: JSON.stringify({ "score":score })
    };
    const response = await fetch(`https://lingoquest-backend.onrender.com/student/marks/score`, options);
    if (response.ok) {
      alert('Score posted successfully!');
    } else {
      const errorData = await response.json();
      alert(`Error posting score: ${errorData.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error posting score:', error);
  }
}
