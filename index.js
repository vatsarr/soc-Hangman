//Risto
const functions = require('./functions');
const gameWord = require('./words');

let vowelsArray = ['A', 'E', 'I', 'O', 'U'];
let tryAgain = true;
const secretWord = [];

game();

async function game() {
  
  while (tryAgain) {

    const rawWord = await gameWord.getWord();
    const secretWord = rawWord.toUpperCase();
    const secretWordLetters = [...secretWord];
    const gameState = new Array(secretWordLetters.length).fill(`-`);
    const usedLetters = [];

    const vowelsAmount = secretWordLetters.reduce((vowels, letter) => vowelsArray.includes(letter) ? vowels + 1 : vowels, 0);
    const consonantAmount = secretWordLetters.length - vowelsAmount;
    
    let attempts = 6;
    const hint = `The hidden word contains ${vowelsAmount} vowels and ${consonantAmount} consonants 💡 \n`;
    let hintYes = true;

    console.log(`- H - A - N - G - M - A - N - \n`);
    prompt(`Press any key to start the game...`);
    console.clear();


    while (true) {
      console.log(`- H - A - N - G - M - A - N - \n`);
      let hintsInput = prompt(`Do you want a hint 💡 ? [YES/NO]`).toUpperCase();

      if (hintsInput === 'YES' || hintsInput === 'Y') {
        hintYes = true;
        console.clear();
        break;
      } else if (hintsInput === 'NO' || hintsInput === 'N') {
        hintYes = false;
        console.clear();
        break;
      } else {
        continue;
      }
    }


    while (attempts > 0) {

      const isString = (string) => /[A-Za-z]/.test(string);

      console.log(`- H - A - N - G - M - A - N - \n`);
      console.log(`You have ${attempts} tries. \nHere's what you're guessing: \n \n${gameState.join(' ')} \n`);
      console.log(`Letters or words that you have already guessed: ${usedLetters} \n \n`);

      if (hintYes) {
        console.log(hint);
      } else {
        hintYes = false;
      }

      let userInput = prompt('Enter a letter or a word: ').toUpperCase();

      if (isString(userInput) && secretWordLetters.includes(userInput)) {
        usedLetters.push(userInput);
        console.clear();
      } else if (isString(userInput)) {
        usedLetters.push(userInput);
        console.clear();
        attempts--;
      } else {
        attempts--;
        console.log(`\nYou have to enter a letter or a word!\n`);
        console.log;
      } //input validation

      console.clear();

      functions.updateGameState(secretWordLetters, gameState, userInput,);

      const didUserWinState = functions.didUserWin(secretWord, gameState, userInput);

      if (didUserWinState) {
        console.log(`- H - A - N - G - M - A - N - \n`);
        console.log(`You WIN 🏆 ! You guessed the word - '${secretWord}'\n`);
      } else if (!didUserWinState && attempts === 0) {
        console.log(`You LOST 😡 ! \n\nThe correct word was: '${secretWord}'\n`);
      }

      if (didUserWinState === true || !didUserWinState && attempts === 0) {
        const restartInput = prompt('Press any key to try again or Q to quit ... ').toUpperCase();
        if (restartInput === 'Q') {
          console.clear();
          console.log(`So sad 😭 ! Baiiii `);
          tryAgain = false;
          break;
        } else {
          console.clear();
          tryAgain = true;
          break;
        }
      }
    }
  }
}
