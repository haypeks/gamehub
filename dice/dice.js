'use strict';

// selecting elements
const player1 = document.querySelector('.player--1');
const player2 = document.querySelector('.player--2');
const score1 = document.querySelector('#score--1');
const score2 = document.getElementById('score--2');
const dice = document.querySelector('.dice');
const current1 = document.getElementById('current--1');
const current2 = document.getElementById('current--2');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let scores, currentScore, activePlayer, playing;

//Starting Conditions
const init = () => {
  scores = [0, 0, 0];
  currentScore = 0;
  activePlayer = 1;
  playing = true;

  dice.classList.add('hidden');
  score1.textContent = 0;
  score2.textContent = 0;
  current1.textContent = 0;
  current2.textContent = 0;
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
};

init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

//Rolling Dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    const rollDice = Math.trunc(Math.random() * 6) + 1;
    console.log(rollDice);

    // display dice
    dice.classList.remove('hidden');
    dice.src = `dice-${rollDice}.svg`;

    // check for roll dice
    if (rollDice !== 1) {
      // Add dice to current score
      currentScore += rollDice; // currentScore = currentScore + dice
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current1.textContent = currentScore; //displayCurrent score
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    //Add current score to active player's score
    scores[activePlayer] += currentScore;
    console.log(currentScore);
    console.log(scores[activePlayer]);
    //scores[1] =scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if player's score is >=100
    if (scores[activePlayer] >= 50) {
      //Finish the game
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch the player
      switchPlayer();
    }
  }
});

//Reset the Game

btnNew.addEventListener('click', init);
