const home = document.querySelector('#buttons button')

home.addEventListener('click', buttonClick)

function buttonClick(e) {
    e.preventDefault()
    window.location.href = "http://127.0.0.1:5501/FrontEnd/dashboard.html";
}

const one = document.querySelector('#one p')
const two = document.querySelector('#two p')
const three = document.querySelector('#three p')
const four = document.querySelector('#four p')

async function fetchQuestions(){
    const url = `localhost:3000/questions`
    try {
        const response = await fetch(url);

        if (!response.ok){
            throw new Error(("This message is from space, run away now"))
        }
        const questions = await response.json()
        add(questions)

    }catch(error) {
    console.log(error + "hello world")
    }
}

function add(questions){
    const { a,b,c,d } = questions
    addOne(a)
    addTwo(b)
    addThree(c)
    addFour(d)
}