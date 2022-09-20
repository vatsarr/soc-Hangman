const fetch = require('node-fetch');

function updateGameState(secretWord, gameState, userEntry) {
  for (let i = 0; i < secretWord.length; i++) {
    const letter = secretWord[i];
    if (userEntry === letter) {
      gameState[i] = userEntry;
      secretWord[i] = '-';
    }
  }
}

function didUserWin(secretWord, inputArray, userEntry) {
  let arraycheck = inputArray.join('');
  if (arraycheck === secretWord || userEntry === secretWord) {
    return true;
  } else {
    return false;
  }
}




module.exports = { updateGameState, didUserWin };