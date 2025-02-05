const home = document.querySelector('#buttons button')

home.addEventListener('click', buttonClick)

function buttonClick(e) {
    e.preventDefault()
    window.location.href = "http://127.0.0.1:5501/FrontEnd/dashboard.html";
}

