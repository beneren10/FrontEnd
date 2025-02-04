const home = document.querySelector('#buttons button')

home.addEventListener('click', buttonClick)

function buttonClick(e) {
    e.preventDefault()
    window.location.href = "http://www.google.co.uk";
}
