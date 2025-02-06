// landing.js
function setupEventListeners() {
    const teacherLogin = document.querySelector('#teachers');
    const studentLogin = document.querySelector('#students');

    teacherLogin.addEventListener('click', buttonClick);
    studentLogin.addEventListener('click', buttonClick);
}

function buttonClick(e) {
    e.preventDefault();
    window.location.href = "login.html";
}

module.exports = { setupEventListeners, buttonClick };
