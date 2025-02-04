const teacherLogin = document.querySelector('#teachers')
const studentLogin = document.querySelector('#students')

teacherLogin.addEventListener('click', buttonClick)
studentLogin.addEventListener('click', buttonClick)

function buttonClick(e) {
    e.preventDefault()
    window.location.href = "http://127.0.0.1:5501/login.html";
}