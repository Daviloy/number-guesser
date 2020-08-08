(function(){
    // Cache DOM Elements
    const UIgame = document.querySelector('#game');
    const UIuserGuess = document.querySelector('#user-guess');
    const UIguessButton = document.querySelector('#guess-btn');
    const UImessage = document.querySelector('#message');
    const UIscore = document.querySelector('#current-score');
    const UIhighScore = document.querySelector('#high-score');

    // Game states
    // Minimum guess number to generate
    let min = 0;

    // Maximum guess number to generate
    let max = 10;

    // User score
    let score = 0;

    // Number of guesses available to the user
    let numGuesses = 5;

    // Random number generated between 1 and 10
    let guessNumber = getRandomNumber(min, max);

    // Generate a random number between a certain range
    function getRandomNumber(min, max){
        // return Math.floor(Math.random() * (max - min + 1) + min);
        return Math.ceil(min + Math.random() * (max - min));
    }

    // Retrieve and display the user's high score from local storage
    getHighScore();

    // Retrieve and display the user's high score from local storage
    function getHighScore(){
        let scoreLS = localStorage.getItem('highscore');

        if(scoreLS !== null){
            UIhighScore.textContent = scoreLS;
        }
    }

    // Message timeout ID
    let timerID;

    // Add an event listener to the entire app and use event delegation target the button specifically so the game can be replayed when clicked
    UIgame.addEventListener('mousedown', playAgain);

    // Replays the game by reloading the web page
    function playAgain(e){
        if(e.target.classList.contains('play-again')){
            window.location.reload();
        }
    }

    // Attach a mousedown event lister to check the user's guess
    UIguessButton.addEventListener('click', checkGuess);
    
    // Checks whether the user's guess matches the generated guess number
    function checkGuess(){
        // // Clear the setTimeout function by its ID
        // clearTimeout(timerID);

        // Get the user's guess and convert to a data type of number
        let userGuess = parseInt(UIuserGuess.value);
       
        // Validate the user guess input field
        if(isNaN(userGuess) || userGuess < min || userGuess > max){
            showMessage('Please enter a valid number between 1 and 10', 'error');
           
            // Clear the user guess input field after throwing an error
            UIuserGuess.value = '';
        }else{
            // Checks whether user's guess is equal to the generated guess number
            if(userGuess === guessNumber){
                // Show an alert to the user indicating that they won
                showMessage(userGuess + ' is correct. You Win!!!', 'success');

                // Increment the user's score
                score += 1;

                // Update the user's score in the UI
                UIscore.textContent = score;

                // Clear the user guess input field
                UIuserGuess.value = '';

                // Another random number generated between 1 and 10
                guessNumber = getRandomNumber(min, max);

                // Reset the number of guesses available to the user
                numGuesses = 5;
            }else{
                // If the user's guess is not equal to the generated guess number
                // Decrement the number of guesses available to the user by one
                numGuesses -= 1;

                // Check whether the user has not run out of guesses
                if(numGuesses !== 0){
                    // Check for when the user has only two guesses left
                    if(numGuesses === 2){
                        // Check whether the generated guess number is less than 5
                        if(guessNumber < 5){
                            // Give the user a hint indicating the generated guess number is less han 5
                            showMessage('Hint: The number is less than 5', 'error');
                        }else if(guessNumber > 5){
                            // Give the user a hint indicating the generated number is greated than 5
                            showMessage('Hint: The number is greater than 5', 'error');
                        }else{
                            // Show an error message to the user
                            showMessage(userGuess + ' is not correct. You have ' + numGuesses + ' guesses left', 'error');
                        }
                    }else{
                        // Show an error message to the user
                        showMessage(userGuess + ' is not correct. You have ' + numGuesses + ' guesses left', 'error');
                    }
                }else{
                    // Show an error message to the user
                    showMessage(userGuess + ' is not correct. Game Over!!!. The number is ' + guessNumber, 'error');

                    // Change the text of the submit button
                    UIguessButton.textContent = 'Play Again?';

                    // Add a class name to the submit button
                    UIguessButton.classList.add('play-again');

                    // Save the score to local storage if it is higher than the previous highscore
                    saveScore(score);
                }

                // Clear the user guess input field
                UIuserGuess.value = '';
            }
        }
    }

    // Display messages to the user
    function showMessage(message, type){
        // Clear the setTimeout function by its ID
        clearTimeout(timerID);

        // Declare a variable to hold the colour of the message text
        let colour;

        // Set the colour of the message based on the type
        type === 'error' ? colour = 'red' : colour = 'green';

        // Display the message in the UI
        UImessage.textContent = message;

        // Change the colour of the messag
        UImessage.style.color = colour;

        // Clear the message after 3 seconds
        clearMessage();
    }

    // Save score to local storage
    function saveScore(score){
        // Get the highscore from local storage
        let scoreLS = localStorage.getItem('highscore');

        // Check whether there is a highscore already set in local storage
        if(scoreLS === null){
            // Set the current score to the highscore and save to local storage
            localStorage.setItem('highscore', score);
        }else{
            // Check whether the current score is higher than the highscore in localstorage
            if(score > scoreLS){
                // Set the current score to the highscore and save to local storage
                localStorage.setItem('highscore', score);
            }
        }
    }

    // Clear the message after 3 seconds
    function clearMessage(){
        timerID = setTimeout(function(){
            // Clear the message in the UI
            UImessage.textContent = '';
        }, 3000);
    }
})();