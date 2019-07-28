/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//UI Variables
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
const btnNew = document.querySelector(".btn-new");
const dice = document.querySelector(".dice");

//Code variables
let roundScore, activePlayer;
const scores = [0, 0];
//INIT
Init();
///////////////////////////////////////////////////////
///////New
btnNew.addEventListener("click", () => {
  btnRoll.classList.toggle("right");
  Init();
});
///////////////////////////////////////////////////////
/////ROLL
btnRoll.addEventListener("click", () => {
  let diceValue = Math.floor(Math.random() * 6 + 1);

  if (diceValue != 1) {
    roundScore += diceValue;
    document.getElementById(`current-${activePlayer}`).textContent = roundScore;
  } else {
    switchp();
  }
  dice.style.display = "block";
  dice.src = `dice-${diceValue}.png`;
});
///////////////////////////////////////////////////////
/////HOLD
btnHold.addEventListener("click", () => {
  scores[activePlayer] += roundScore;
  document.getElementById(`score-${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 30) {
    winner();
  } else {
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];
    switchp();
  }
});

///////////////////////////////////////////////////////
/////HELPERS
function switchp() {
  roundScore = 0;
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  activePlayer == 0 ? (activePlayer = 1) : (activePlayer = 0);

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  btnRoll.classList.toggle("right");

  /* if (activePlayer == 0) {
    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    btnRoll.classList.remove("right");
  } else {
    document.querySelector(".player-1-panel").classList.add("active");
    document.querySelector(".player-0-panel").classList.remove("active");
    btnRoll.classList.add("right");
  }*/
}

function Init() {
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.querySelector(`.player-1-panel`).classList.remove("winner");
  document.querySelector(`.player-0-panel`).classList.remove("winner");
  roundScore = 0;
  activePlayer = 0;
  scores[0] = 0;
  scores[1] = 0;
  dice.style.display = "none";
  btnNew.style.display = "none";
  btnHold.style.display = "block";
  btnRoll.style.display = "block";
}

function winner() {
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.add("winner");
  btnNew.style.display = "block";
  btnHold.style.display = "none";
  btnRoll.style.display = "none";
}
