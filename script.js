"use strict";
//Selecting Elements
const score = document.querySelectorAll(".score");
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScoreEl0 = document.querySelector("#current--0");
const currentScoreEl1 = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector(".player--1");

const scoresMain = [0, 0];
let currentScore = 0; // initiating a new varaible that'll hold the score 
let activePlayer = 0; // intitiating this variable so i can dynamically select based on player number. where "player0" is the first player by default and "player1" is the second

function switchPlayer(){
  //switch to next player.
  document.getElementById(`current--${activePlayer}`).textContent = 0; // set current score to zero dynamically before/immediately the switch
  //remove active class from player one
  player0El.classList.toggle('player--active');
  //move active claass to player two
  player1El.classList.toggle('player--active');
  //checks if the "player--active" is present in player1El to change its actve clayer to player  1
  if (activePlayer === 0) {
    activePlayer = 1;
    currentScore = 0;
  } else activePlayer = 0;
}

//loop for setting the initial score to 0
score.forEach(function (scoreElement){
    scoreElement.innerHTML = "0";
})

// hide the dice 
diceEl.classList.add("hidden");

//display dice when the button is clicked
btnRoll.addEventListener("click", e=>{
    //1. generating a random dice roll using math.random fuction
    const dice = Math.trunc(Math.random() * 6)+ 1;
    // 2. display dice roll
    diceEl.classList.remove("hidden"); // this displays the dice by removing the hidden class
    diceEl.src = `dice-${dice}.png` // this selects the "src" attribute in the img tag and equates it to the "dice" wwhich is the random generator to loop through the pics available
    
    // 3. check if diced rolled is equals one
    if(dice !== 1){
        currentScore = currentScore + dice;// added diced rolled to current score
        // this selects the element dynamically depending on the active player
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        switchPlayer();
        // activePlayer = activePlayer === 0 ? 1 : 0;
        
    }
     
}) 

// For user holding score;
btnHold.addEventListener("click", e=>{
    //1. This  adds scores to active player's score
    scoresMain[activePlayer] += currentScore;
    //selecting the scores dynamically 
    document.getElementById(`score--${activePlayer}`).textContent = scoresMain[activePlayer];

    //2. check to see if score is >= 100
    if (scoresMain[activePlayer] >= 100) {
        // selecting the winner thorugh its element and adding a winning class to it 
        document.querySelector(`player--${activePlayer}`).classList.add("player--winner");
    }

    //3. Switch player
    switchPlayer();
})


