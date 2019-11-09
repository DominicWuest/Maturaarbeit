// List of all possible characters for the random string
let characters = [];

// List with all string-character sublists
let string = [];

// List with the indexes of the string character in sublists
let stringIndex = [];


// Setup all exercises
function displayExercise(n) {
  // Add the letters to characters according to their probabillity in german texts, source: https://de.wikipedia.org/wiki/Buchstabenh%C3%A4ufigkeit
  for (let i = 0; i < 65; i++) characters.push('a');
  for (let i = 0; i < 19; i++) characters.push('b');
  for (let i = 0; i < 31; i++) characters.push('c');
  for (let i = 0; i < 51; i++) characters.push('d');
  for (let i = 0; i < 174; i++) characters.push('e');
  for (let i = 0; i < 17; i++) characters.push('f');
  for (let i = 0; i < 30; i++) characters.push('g');
  for (let i = 0; i < 48; i++) characters.push('h');
  for (let i = 0; i < 76; i++) characters.push('i');
  for (let i = 0; i < 3; i++) characters.push('j');
  for (let i = 0; i < 12; i++) characters.push('k');
  for (let i = 0; i < 34; i++) characters.push('l');
  for (let i = 0; i < 25; i++) characters.push('m');
  for (let i = 0; i < 98; i++) characters.push('n');
  for (let i = 0; i < 25; i++) characters.push('o');
  for (let i = 0; i < 8; i++) characters.push('p');
  for (let i = 0; i < 1; i++) characters.push('q');
  for (let i = 0; i < 70; i++) characters.push('r');
  for (let i = 0; i < 73; i++) characters.push('s');
  for (let i = 0; i < 62; i++) characters.push('t');
  for (let i = 0; i < 44; i++) characters.push('u');
  for (let i = 0; i < 7; i++) characters.push('v');
  for (let i = 0; i < 19; i++) characters.push('w');
  for (let i = 0; i < 1; i++) characters.push('x');
  for (let i = 0; i < 1; i++) characters.push('y');
  for (let i = 0; i < 11; i++) characters.push('z');
  for (let i = 0; i < n; i++) {
    displayEncode(i * 2);
  }
}

function displayEncode(startingIndex) {
  inputString = GenString(startingIndex / 2);
  document.getElementById('inputEncode' + startingIndex).value = inputString.join('');
  document.getElementById('inputEncode' + startingIndex).disabled = true;
  document.getElementById('exerciseEncode' + startingIndex).style.backgroundColor = "blue";
}

// Generate a random string
function GenString(startingIndex) {
  for (let i = 0; i < Math.random() * 20 + 5; i++) {
    if (i === 0) {
      stringIndex.push([Math.floor(Math.random() * characters.length)]);
      string.push([characters[stringIndex[startingIndex][i]]]);
    }
    else {
      stringIndex[startingIndex].push(Math.floor(Math.random() * characters.length));
      string[startingIndex].push(characters[stringIndex[startingIndex][i]]);
    }
  }
  return string[startingIndex];
}
