const teacherLogin = document.querySelector('#teachers')
const studentLogin = document.querySelector('#students')

teacherLogin.addEventListener('click', buttonClick)
studentLogin.addEventListener('click', buttonClick)

function buttonClick(e) {
    e.preventDefault()
    window.location.href = "http://127.0.0.1:5501/login.html";
}

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    console.log(form)

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: form.get("firstName"),
            lastName: form.get("lastName"),
            student_login: form.get("student_login"),
            password: form.get("password")
        })
    }

    const response = await fetch("http://localhost:3000/users/register", options);
    const data = await response.json();
    console.log(data)

    if (response.status == 201) {
        alert("success")
        window.location.assign("login.html");
    } else {
        alert(data.error);
    }
})