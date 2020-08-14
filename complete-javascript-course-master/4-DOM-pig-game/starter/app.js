/*
* How to create our fundamental game variables
* How to generate a random number
* How to manipulate the DOM
* How to read from the DOM
* How to change CSS styles
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer;
var player1, player2;

scores = [0,0]
roundScore = 0;
activePlayer = 0;
scoreWinner = 20;
scoreWinnerPremium = 17
validWinner = false;
validLoser = false;

document.querySelector('.dice').style.display = 'none';
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
iconActivePlayer();

document.querySelector('.btn-roll').addEventListener('click', function() {
  var dice = Math.floor(Math.random() * 6) + 1;
  var diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  diceDOM.src = `dice-${dice}.png`;
  sumCurrentPlayer(dice);
});

document.querySelector('.btn-new').addEventListener('click',function(){
  validWinner = false;
  validLoser = false;
  clearScores();
  iconActivePlayer(true);
  document.getElementById('name-0').textContent = prompt('Player 1 digite seu nome: ');
  document.getElementById('name-1').textContent = prompt('Player 2 digite seu nome: ');
});

document.querySelector('.btn-hold').addEventListener('click', function(){ 
  sumScoreCurrentPlayer();
  activePlayer = activePlayer === 0 ? 1 : 0;
  clearCurrentScores();
  iconActivePlayer();  
});

function clearScores(){
  scores = [0,0]
  roundScore = 0;
  activePlayer = 0; 
};

function sumCurrentPlayer(dice){
  document.getElementById(`current-${activePlayer}`).textContent = roundScore +=dice;
}

function clearCurrentScores(){
  roundScore = 0;
  document.getElementById(`current-${activePlayer}`).textContent = 0;
}

function sumScoreCurrentPlayer(){
  scores[activePlayer] += roundScore;
  document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
  validWinnerPlayer();
}

function validWinnerPlayer(){
  var scoreValid = document.getElementById(`score-${activePlayer}`).textContent  

  switch (true) {
    case  parseInt(scoreValid) === 17:
      validWinner = true;
      alert('Parabéns você atingiu pontuação coringa')
      break;
    case  parseInt(scoreValid) === 20:
      validWinner = true;
      alert('Parabéns você atingiu pontuação.')
      break;
    case parseInt(scoreValid) > 20:
      validLoser = true;
      alert('Sinto muito você ultrapassou a pontuação.')
      break;
    }
    validPlay();
}

function validPlay(){
  if (validLoser === true) {
    var element = document.getElementById(`player-${activePlayer}-panel`);
    element.classList.remove('active');
    element.classList.add('loserPlayer');
  }
  
  if (validWinner === true) {
    var element = document.getElementById(`player-${activePlayer}-panel`);
    element.classList.remove('active');
    element.classList.add('winnerPlayer');
    document.getElementById(`name-${activePlayer}`).textContent = 'CONGRATULATIONS'
  }
}

function iconActivePlayer(){
  if (activePlayer === 0){
    var element0 = document.getElementById(`player-0-panel`);
    element0.classList.add('active');
    var element1 = document.getElementById(`player-1-panel`);
    element1.classList.remove('active');
  } else{
      var element1 = document.getElementById(`player-1-panel`);
      element1.classList.add('active');
      var element0 = document.getElementById(`player-0-panel`);
      element0.classList.remove('active');
  }  
}