

/* 

1. Wait for start to be pressed and once pressed do the following
2. Pick a random currentWord that has not been picked already from the questions list
3. Show current word blanks, score, and number of guesses left
4. listen for user input and when user inputs do the following
5. check if the letter is in the current word if so add it to the display if not add it to the wrong list
6. If user guesses the word give 1 point
7. if user does not guess the word show game over! 

*/

var hangWords = ["plutonium", "sandman", "delorean", "casino", "clock", "billboard", "manure", "lorraine", "pepsi", "butthead", "heavy", "griff", "hilldale", "jigowatt", "marty", "almanac", "dreamboat", "square", "velocity", "skateboard", ];
var startGame = 0; //Begins the game 0 off 1 on 2 the game already started and continues to a new round.
var currWord; // Holds the value for the current word
var wrongChoices = []; //lists all the wrong characters chosen
var gameStatus = []; //shows the current letters guessed and blanks left
var wins = 0; //keeps score of rounds won
var remainingGuesses = 6; //Remaining Guesses



//Setup Audio Controls
var x = document.getElementById("myAudio"); 

function playAudio() { 
    x.play(); 
} 

function pauseAudio() { 
    x.pause(); 
} 





	///////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////
	//if user presses a key
	document.onkeyup = function(event){
		//If game is beginning




		var char = event.key;
		char = char.toLowerCase(); //make input lower case


		if(startGame == 0 || startGame == 2)
		{
			if(startGame == 0)
			{
			wins = 0;
			document.getElementById( 'playBtn' ).style.display = 'inline-block';
			document.getElementById( 'pauseBtn' ).style.display = 'inline-block';

			playAudio();

			newGame(); //reset code values
			newRound(); //set a new round
			}
			
			if(startGame == 2)
			{
				remainingGuesses = 6; 
				wrongChoices = [];

				nextRoundSetup();
				newRound();
			}
		}
		//Verify char selected
		else
		{
			evaluator(char); //a key has been pressed check it
		}
	
	}
	///////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////


	///////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////
	// 1. Begin the game or set a new round
	var newRound = function(){

		//If there are still words in the list pick a new word
		if(hangWords.length != 0)
		{
			//console.log("There is something in the list!!");
			var picker = Math.floor(Math.random() * hangWords.length); //pick an array element number
			//console.log("you picked: " + hangWords[picker]);


			
			currWord = hangWords[picker];//save the current word
			hangWords.splice(picker, 1); //remove item from the array

			for(i = 0; i < currWord.length; i++)
			{
				gameStatus[i] = "_ "; //set up the game with new blanks
			}
		
			updateGameStatus(gameStatus); // update the game display
		}
		else
		{
			//there is nothing in the list left to play!
			gameOver();
		}
	}
	///////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////



	///////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////
	var evaluator = function(check){
		//THE CURRENT LETTER GUESSED IS NOT PART OF THE CURRENT WORD!!!
		if(currWord.indexOf(check) < 0){
			//Check if the guess is in the list of bad choices
			if(wrongChoices.includes(check) )
			{
				// Do nothing
			}
			//Not already guessed will add to the wrong list
			else
			{
				wrongChoices.push(check); 

				var updateWrong = wrongChoices.toString();
				updateWrong = updateWrong.replace(/,/g, " ");

				document.getElementById("wrong").innerHTML = updateWrong; //Print the updated list

				remainingGuesses = remainingGuesses - 1;
				document.getElementById("guessLeft").innerHTML = "Guesses Left: " + remainingGuesses;

				if(remainingGuesses == 0){
					gameOver();
				}

			}	
		}
		//THE CURRENT LETTER GUESSED IS IN THE CURRENT WORD!! 
		else{
			for(var i = 0; i < currWord.length; i++) 
			{
				if(currWord[i] === check)
		    	{
					gameStatus[i] = check;
	    		}
			}
			updateGameStatus(gameStatus);
			finishRound(gameStatus);
		}
	}
	///////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////




			var updateGameStatus = function(status)
			{
				status = status.toString(); //move entire array to a string
				status = status.replace(/,/g, " "); //remove commas from the string
	
				document.getElementById("guesses").innerHTML = status; //print to the screen
			}



			var gameOver = function(){
				document.getElementById("pregame").innerHTML = "Press any key to begin playing BTF Hangman";
				document.getElementById("guesses").innerHTML = "";
				document.getElementById("wrongGuesses").innerHTML = "";
				document.getElementById("gameEnd").innerHTML = "GAME OVER";
				document.getElementById("guessLeft").innerHTML = "";
				document.getElementById("wrong").innerHTML = "";

				remainingGuesses = 6; 
				startGame = 0;
			}


 			var newGame = function(){
 			index = [];
			wrongChoices = [];
			currWord = "";
			hangWords = ["plutonium", "sandman", "delorean", "casino", "clock", "billboard", "manure", "lorraine", "pepsi", "butthead", "heavy", "griff", "hilldale", "jigowatt", "marty", "almanac", "dreamboat", "square", "velocity", "skateboard", ];
			startGame = 1; //round is set turn on evaluator for next key press

			document.getElementById("pregame").innerHTML = "";
			document.getElementById("wrongGuesses").innerHTML = "Wrong Guesses";
			document.getElementById("guessLeft").innerHTML = "Guesses Left: " + remainingGuesses;
			document.getElementById("gameEnd").innerHTML = "";
			document.getElementById("winning").innerHTML = "Wins: " + wins + " /20";
			}

				var finishRound = function(status){
				if(status.includes("_ ") ){
				//User has not won yet
				}
				else
				{
					wins = wins + 1;
					document.getElementById("winning").innerHTML = "Wins: " + wins + " /20";
					document.getElementById("pregame").innerHTML = "Press any key to start next round";

					startGame = 2;
				}
			}

			var nextRoundSetup = function(){
				currWord = ""; //reset for next round
				gameStatus = [];
				startGame = 1;
				remainingGuesses = 6; 
				wrongChoices = [];

				document.getElementById("guessLeft").innerHTML = "Guesses Left: " + remainingGuesses;
				document.getElementById("wrong").innerHTML = ""; 
				document.getElementById("pregame").innerHTML = "";

			}


