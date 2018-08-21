/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// creating variables for each player
var scores, roundScore, activePlayer, gamePlaying, dice0score=0, dice1score=0;

// initialize the variables values & reset everything by calling init function 
init();


// define a function
function nextPlayer(){
    //reset the old score of the current player
    dice0score = 0;
    dice1score = 0;
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
    var alldices = document.querySelectorAll('.dice');
    for( var idx = 0; idx < alldices.length; idx++)
        {
            alldices[idx].style.display = 'none';
        }
    //document.querySelector('.dice').style.display = 'none';
}


// create event listener containing an annonymous function, which can't be called outside the event, check them here: https://developer.mozilla.org/en-US/docs/Web/Events

document.querySelector('.btn-roll').addEventListener('click', function(){
    
    //if the gamePlaying, then do the following actions
    if(gamePlaying)
        {
                //1. Random number
                var dice0 = Math.floor(Math.random() * 6) + 1;
                var dice1 = Math.floor(Math.random() * 6) + 1;
                //2. Display the result
                var alldices = document.querySelectorAll('.dice');
                for( var idx = 0; idx < alldices.length; idx++)
                    {
                        alldices[idx].style.display = 'block';
                        if(idx==0)
                            alldices[idx].src = 'dice-' + dice0 + '.png';
                        else
                            alldices[idx].src = 'dice-' + dice1 + '.png';
                            
                    }
    
                //3. Update the round score but only IF the rolled number is not one or 2 sixes in a row
                if(dice0score === 6 && dice1score === 6 && dice0 === 6 && dice1 === 6)
                    {
                        // if the rolled number of a player is two sixes in a row lose entire saved score
                        scores[activePlayer] = 0;
                        document.getElementById('score-' + activePlayer).textContent = 0;
                        nextPlayer();
                    }
                else if (dice0 > 1 && dice1 > 1)
                    {
                        //add score
                        roundScore += dice0+dice1;
                        document.querySelector('#current-' + activePlayer).textContent = roundScore;
                        dice0score = dice0;
                        dice1score = dice1;
                    }
                else
                    {
                        //next player
                        nextPlayer();
                    }
        }

});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if (gamePlaying)
        {
            //add current score to the global score
            scores[activePlayer] += roundScore;
            //update the user interface UI
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
            //check if player won the game
            if (scores[activePlayer] >= 50)
                {
                    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                    // change the styling of element with class .dice and make it dissappear using display: none;
                    var alldices = document.querySelectorAll('.dice');
                    for( var idx = 0; idx < alldices.length; idx++)
                    {
                        alldices[idx].style.display = 'none';
                    }
                    // remove the active class from winner and add the winner class
                    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                    gamePlaying = false;
                }
            else
                {
                    // next player
                    nextPlayer();
                }
        }
    
});

//event listener on clicking the button new to call the function init to reset everything
document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    // change the styling of element with class .dice and make it dissappear using display: none;
    var alldices = document.querySelectorAll('.dice');
    for( var idx = 0; idx < alldices.length; idx++)
        {
            alldices[idx].style.display = 'none';
        }
    // use get elements by id which is used only to select ids and faster than queryselector
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
}


