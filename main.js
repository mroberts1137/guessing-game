const startGameBtn = document.getElementById('startGameBtn');
startGameBtn.addEventListener('click', startGame);

const guessSchema = {
  min: 1,
  max: 100
};

function startGame() {
  // Choosing a random number between schema.min-max
  const targetNum =
    Math.floor(Math.random() * (guessSchema.max - guessSchema.min)) +
    guessSchema.min;
  //console.log('targetNum', targetNum);
  guesses = 0;
  isGuessCorrect = false;

  // Main game loop
  do {
    const guess = prompt(
      `Guess a number between ${guessSchema.min}-${guessSchema.max} or type "quit" to exit.`
    );
    if (guess.toLowerCase() === 'quit' || guess.toLowerCase() === 'exit')
      return;

    // validate user input
    const playerGuess = validateInput(guess);
    //console.log('playerGuess: ', playerGuess);
    // validateInput returns false or the number input -> integer.
    // we test with '===' in case input=0 which is falsey
    if (playerGuess === false) continue;

    // test if guess is equal, greater-than, or less-than target
    isGuessCorrect = testPlayerGuess(targetNum, playerGuess);
    guesses += 1;

    if (isGuessCorrect) alert(`You guessed correctly in ${guesses} guesses!`);
  } while (!isGuessCorrect);
}

function validateInput(input) {
  // sanitize input
  const sanitizedInput = parseInt(input);
  if (isNaN(sanitizedInput) || sanitizedInput === null) {
    alert('Your guess must be a number');
    return false;
  } else if (
    sanitizedInput < guessSchema.min ||
    sanitizedInput > guessSchema.max
  ) {
    alert(`Your guess must be between ${guessSchema.min}-${guessSchema.max}`);
    return false;
  } else return sanitizedInput;
}

function testPlayerGuess(target, guess) {
  switch (Math.sign(target - guess)) {
    case 0:
      alert('Correct');
      return true;
    case 1:
      alert('Your guess is too small. Try again.');
      return false;
    case -1:
      alert('Your guess is too large. Try again.');
      return false;
  }
}
