const leaderboard = document.querySelector('#leaderboard')

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
        const response = await fetch(`http://localhost:3003/users`, options)
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

scores = [
    {
      "First": "Mark",
      "Last": "Otto",
      "Score": 10
    },
    {
      "First": "Jacob",
      "Last": "Eren",
      "Score": 8
    },
    {
      "First": "Benjamin",
      "Last": "the Bean",
      "Score": 5
    }
  ]
  

function updateLeaderboard(scores){
    document.querySelector('#first-one').textContent = scores[0].First
    document.querySelector('#last-one').textContent = scores[0].Last
    document.querySelector('#score-one').textContent = scores[0].Score
   
    document.querySelector('#first-two').textContent = scores[1].First
    document.querySelector('#last-two').textContent = scores[1].Last
    document.querySelector('#score-two').textContent = scores[1].Score

    document.querySelector('#first-three').textContent = scores[2].First
    document.querySelector('#last-three').textContent = scores[2].Last
    document.querySelector('#score-three').textContent = scores[2].Score
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