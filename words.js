const fetch = require('node-fetch');

async function getWord() {
  const url = 'https://random-word-api.herokuapp.com/word';
  const response = await fetch(url);
  const data = await response.json();
  return data[0];
}

//let gameWord = ['BOOK', 'CAR', 'HOME', 'APPLE', 'PINEAPPLE', 'OXYGEN', 'PIZZA', 'JACKPOT', 'BLIZZARD', 'ORGANIZATION'];

module.exports = { getWord };


