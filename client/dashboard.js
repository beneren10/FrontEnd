window.addEventListener("DOMContentLoaded", fetchAPIscores);

function fetchAPIscores() {
  fetchScores();
}

async function fetchScores() {
  try {
    const options = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      `https://lingoquest-backend.onrender.com/student/marks/leaders`,
      options
    );
    if (response.ok) {
      const postedCard = await response.json();
      updateLeaderboard(postedCard);
    } else {
      throw "Error http status code " + response.status;
    }
  } catch (err) {
    console.log(err);
  }
}

function updateLeaderboard(scores) {
  document.querySelector("#first-one").textContent = scores[0].firstname;
  document.querySelector("#last-one").textContent = scores[0].lastname;
  document.querySelector("#score-one").textContent = scores[0].total_marks;

  document.querySelector("#first-two").textContent = scores[1].firstname;
  document.querySelector("#last-two").textContent = scores[1].lastname;
  document.querySelector("#score-two").textContent = scores[1].total_marks;

  document.querySelector("#first-three").textContent = scores[2].firstname;
  document.querySelector("#last-three").textContent = scores[2].lastname;
  document.querySelector("#score-three").textContent = scores[2].total_marks;
}

module.exports = {
  fetchAPIscores,
  fetchScores,
  updateLeaderboard,
};
