/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//creating variables for each player
var scores, roundScore, activePlayer;
scores = [0,0];
roundScore = 0;
activePlayer = 0;

// change the styling of element with class .dice and make it dissappear using display: none;
document.querySelector('.dice').style.display = 'none';

// use get elements by id which is used only to select ids and faster than queryselector
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

// define a function
function nextPlayer(){
    //reset the current player score to 0
    document.getElementById('current-' + activePlayer).textContent = '0';
    //next player "changing the activePlayer using ternary operator            
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //reset the roundscore counter
    roundScore = 0; 
    //toggle a class between the 2 players to know which is the active one
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //when dice=1 make the dice dissappear 
    document.querySelector('.dice').style.display = 'none';
}


// create event listener containing an annonymous function, which can't be called outside the event, check them here: https://developer.mozilla.org/en-US/docs/Web/Events

document.querySelector('.btn-roll').addEventListener('click', function(){
    //1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;
    
    //2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
    //3. Update the round score but only IF the rolled number is not one.
    if (dice > 1)
        {
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
    else
        {
            //next player
            nextPlayer();
        }
});

document.querySelector('.btn-hold').addEventListener('click',function(){
    //add current score to the global score
    scores[activePlayer] += roundScore;
    //update the user interface UI
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    //check if player won the game
    
    // next player
    nextPlayer();
});







