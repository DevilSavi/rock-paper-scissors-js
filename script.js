let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  loses: 0,
  ties: 0
};

updateScoreElement();

let isAutoPlay = false;
let intervalId;
let buttonElement = document.querySelector('.js-auto-play-button');
let paraElement = document.querySelector('.js-reset-score-confirm');

// const autoPlay = () => {

// };
function autoPlay() {
  if (!isAutoPlay) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlay = true;
    buttonElement.innerHTML = 'Stop Playing';
  } else {
    clearInterval(intervalId);
    isAutoPlay = false;
    buttonElement.innerHTML = 'Auto Play';
  }
}
buttonElement.addEventListener('click', () => {
    autoPlay();
  })

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });
document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });
document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    confirmResetScore();
  });

const resetScore = () => {
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

const confirmResetScore = () => {
  let  paraElement = document.querySelector('.js-reset-score-confirm');
  paraElement.innerHTML = '<p>Are you sure you want to reset the score? <button class="reset-confirm-button js-reset-yes-button">Yes</button><button class="reset-confirm-button js-reset-no-button">No</button></p>';

  document.querySelector('.js-reset-yes-button')
  .addEventListener('click', () => {
     resetScore();
     paraElement.innerHTML = ''
  });
  document.querySelector('.js-reset-no-button')
  .addEventListener('click', () => {
     paraElement.innerHTML = '';
  });

  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'y') {
      resetScore();
      paraElement.innerHTML = '';
    } else if (event.key === 'n') {
      paraElement.innerHTML = '';
    }
  });
}

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    confirmResetScore();
  };
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  
  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'scissors') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'rock') {
      result = 'You Lose.';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'You Lose.';
    }
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'You Lose.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You Lose.') {
    score.loses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon"> <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNubmer = Math.random();

  let computerMove = '';

  if (randomNubmer >= 0 && randomNubmer < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNubmer >= 1 / 3 && randomNubmer < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNubmer >= 2 / 3 && randomNubmer < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}