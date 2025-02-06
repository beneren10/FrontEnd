window.addEventListener('DOMContentLoaded', fetchAPIscores)

function fetchAPIscores(){
    fetchScores()
}

async function fetchScores() {
    try {
      const options = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
        const response = await fetch(`http://localhost:3000/student/marks/leaders`, options)
        if (response.ok) {
            const postedCard = await response.json()
            updateLeaderboard(postedCard)
        } else {
            throw "Error http status code " + response.status
        }
    } catch (err) {
        console.log(err)
    }
}

function updateLeaderboard(scores){
    document.querySelector('#first-one').textContent = scores[0].firstname
    document.querySelector('#last-one').textContent = scores[0].lastname
    document.querySelector('#score-one').textContent = scores[0].total_marks
   
    document.querySelector('#first-two').textContent = scores[1].firstname
    document.querySelector('#last-two').textContent = scores[1].lastname
    document.querySelector('#score-two').textContent = scores[1].total_marks

    document.querySelector('#first-three').textContent = scores[2].firstname
    document.querySelector('#last-three').textContent = scores[2].lastname
    document.querySelector('#score-three').textContent = scores[2].total_marks
}

window.addEventListener('DOMContentLoaded', fetchName)

async function fetchName() {
  try {
    const options = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

      const response = await fetch(`http://localhost:3003/users`, options)
      if (response.ok) {
          const data = await response.json()
          updateName(data)
      } else {
          throw "Error http status code " + response.status
      }
  } catch (err) {
      console.log(err)
  }
}

function updateName(data){
  document.querySelector('#update-name').textContent = data
}

module.exports = {
  fetchAPIscores, fetchScores, updateLeaderboard, updateName
}