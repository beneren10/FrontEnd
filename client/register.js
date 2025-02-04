const teacherLogin = document.querySelector('#teachers')
const studentLogin = document.querySelector('#students')

teacherLogin.addEventListener('click', buttonClick)
studentLogin.addEventListener('click', buttonClick)

function buttonClick(e) {
    e.preventDefault()
    window.location.href = "http://127.0.0.1:5501/FrontEnd/login.html";
}

const formSelection = document.querySelector('#registerForm')

formSelection.addEventListener('submit', getData)

function getData(e){
    e.preventDefault()
    const formData = new FormData(formSelection);
    const formObject = Object.fromEntries(formData.entries()); // Convert FormData to an object
    console.log(formObject)
    
       
    }    
