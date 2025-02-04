const home = document.querySelector('#login-form button')

home.addEventListener('click', buttonClick)

function buttonClick(e) {
    e.preventDefault()
    window.location.href = "http://127.0.0.1:5501/dashboard.html";
}

