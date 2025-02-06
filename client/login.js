document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      student_login: form.get("student_login"),
      password: form.get("password"),
    }),
  };
  console.log(options.body);
  const response = await fetch(
    "https://lingoquest-backend.onrender.com/users/login",
    options
  );
  const data = await response.json();
  console.log(data);

  if (response.status == 200) {
    console.log(data.token);
    localStorage.setItem("token", data.token);
    window.location.assign("dashboard.html");
  } else {
    alert(data.error);
  }
});
