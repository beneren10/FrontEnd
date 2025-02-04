const teacherLogin = document.querySelector('#teachers')
const studentLogin = document.querySelector('#students')

teacherLogin.addEventListener('click', buttonClick)
studentLogin.addEventListener('click', buttonClick)

function buttonClick(e) {
    e.preventDefault()
    window.location.href = "http://127.0.0.1:5501/login.html";
}

const formSelection = document.querySelector('#registerForm')

formSelection.addEventListener('submit', getData)

function getData(e){
    e.preventDefault()
    const formData = new FormData(formSelection);
    const formObject = Object.fromEntries(formData.entries()); // Convert FormData to an object
    console.log(formObject)
    // postCard(formObject)
    formSelection.reset()
    // comment out with backend fucntionality!!!
    window.location.href = "http://127.0.0.1:5501/login.html";
}    

async function postCard(data) {
    try {
        console.log(data.date)
        const response = await fetch(`http://localhost:3003/diary/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: formObject.firstName,
                lastName: formObject.lastName,
                studentLogin: formObject.studentLogin,
                password: formObject.password
            })
        })
        if (response.ok) {xw
            const postedCard = await response.json()
            window.location.href = "http://127.0.0.1:5501/FrontEnd/login.html";
        } else {
            throw "Error http status code " + response.status
        }
    } catch (err) {
        console.log(err)
    }
}
