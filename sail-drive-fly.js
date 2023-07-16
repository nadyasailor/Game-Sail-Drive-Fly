// Modal Box
let modal = document.getElementById("myModal");
let btn = document.getElementById("howToPlay-button");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Game moves

let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'sail') {
    if (computerMove === 'sail') {
      result = 'Tie'
    } else if (computerMove === 'drive') {
      result = 'You lose'
    } else if (computerMove === 'fly') {
      result = 'You win';
    }
  } else if (playerMove === 'drive') {
    if (computerMove === 'sail') {
      result = 'You win'
    } else if (computerMove === 'drive') {
      result = 'Tie'
    } else if (computerMove === 'fly') {
      result = 'You lose';
    }
  } else if (playerMove === 'fly') {
    if (computerMove === 'sail') {
      result = 'You lose'
    } else if (computerMove === 'drive') {
      result = 'You win'
    } else if (computerMove === 'fly') {
      result = 'Tie';
    }
  }

  if (result === 'You win') {
    score.wins += 1;
  } else if (result === 'You lose') {
    score.losses += 1;
  } else if (result === 'Tie') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.getElementById("result-id").style.display = "block";
  document.getElementById("moves-id").style.display = "block";

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `(You chose <img src="icons/${playerMove}-icon.png" class = "result-icon">, computer chose <img src="icons/${computerMove}-icon.png" class = "result-icon">)`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  document.getElementById("result-id").style.display = "none";
  document.getElementById("moves-id").style.display = "none";
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >=0 && randomNumber < 1 / 3) {
    computerMove = 'sail';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'drive';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'fly';
  };

  return computerMove;
}