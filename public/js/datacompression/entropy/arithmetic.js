// List of all possible characters for the random string
let characters = [];

// List with all string-character sublists
let string = [];

// Array containing all the solutions for the exercises
let solution = [];

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
  let uniqueChar = inputString.filter(function(item, pos) {
    return inputString.indexOf(item) == pos;
  })
  cloneString = inputString.slice();
  let startInterval = probabillity(cloneString, uniqueChar).slice();
  solution.push(startInterval);
  for (let i = 0; i < inputString.length; i++) {
    for (let q = 0;  q < uniqueChar.length; q++) {
      if (startInterval[q].includes(inputString[i])) var elementIndex = q;
    }
    startInterval = subInterval(startInterval, elementIndex);
    solution.push(startInterval);
  }
  document.getElementById('inputEncode' + startingIndex).value = inputString.join('');
  document.getElementById('inputEncode' + startingIndex).disabled = true;
  document.getElementById('exerciseEncode' + startingIndex).style.backgroundColor = "blue";
}

// Generate a random string
function GenString(startingIndex) {
  for (let i = 0; i < Math.random() * 20 + 5; i++) {
    if (i === 0) {
      string.push([characters[Math.floor(Math.random() * characters.length)]]);
    }
    else {
      string[startingIndex].push(characters[Math.floor(Math.random() * characters.length)]);
    }
  }
  return string[startingIndex];
}

// Calculates the probabillity for a letter
function probabillity(workingString, fixedString) {
  let probabillities = [];
  for (let i = 0; i < fixedString.length; i++) probabillities.push([fixedString[i]]);
  var divider = workingString.length;
  // Put the probabillity values into the subarray with the sign
  for (let i = 0; i < fixedString.length; i++) {
    probabillities[i].push(workingString.filter((v) => (v === workingString[0])).length / divider);
    // Remove characters that were already used
    var value = workingString[0];
    for (let q = 0; q < probabillities[i][1] * divider; q++) {
      var index = workingString.indexOf(value);
      if (index !== -1) var a = workingString.splice(index, 1);
    }
  }
  // Sort the array in alphabetical order
  probabillities.sort(function(a,b){return characters.indexOf(a[0]) - characters.indexOf(b[0])});
  return probabillities;
}

// Generates the next subinterval, depending on the last interval and the next letter
function subInterval(startInterval, index) {
  console.log("start", startInterval);
  var firststart = 0;
  for (let i = 0; i < index; i++) {
    firststart = firststart + startInterval[i][1];
  }
  var nextInterval = [[startInterval[0][0], firststart]];
  var endinterval = startInterval[index - 1][1];
  for (let i = 1; i < startInterval.length; i++) {
    endinterval = endinterval + startInterval[0][1] * startInterval[i][1];
    nextInterval.push([startInterval[i][0], endinterval]);
  }
  console.log(nextInterval);
  return nextInterval;
}

// Check whether the given input matches the solution
function checkEncode(message, index) {
  // If the input matches the solution display a green background
  if (message === solution[index / 2]) {
    document.getElementById('exerciseEncode' + index).style.backgroundColor = "green";
  }
  // If the input is wrong display a red background
  else {
    document.getElementById('exerciseEncode' + index).style.backgroundColor = "red";
  }
}

// Reset the starting and solution values and background colors
function resetEncode() {
  for (let index = 0; index < 8; index++) {
    document.getElementById('inputEncode' + index).value = '';
    document.getElementById('inputEncode' + index).disabled = false;
    document.getElementById('exerciseEncode' + index).style.backgroundColor = "white";
  }
  string = [];
  solution = [];
  for (let i = 0; i < 4; i++) displayEncode(i * 2);
}

// Display the solution value
function solutionEncode(index) {
  document.getElementById('inputTree' + index).value = solution[index / 2];
  document.getElementById('Treeextable' + index).style.backgroundColor = "green";
}
