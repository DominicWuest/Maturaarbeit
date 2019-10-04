// List of all possible characters for the random string
let characters = [];

// List with all string-character sublists
let string = [];

// List with the indexes of the string character in sublists
let stringIndex = [];

// List of the solution Trees
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
    displayTree(i * 2);
  }
}

function displayTree(startingIndex) {
  solution.push(['']);
  inputString = GenString(startingIndex / 2);
  document.getElementById('inputTree' + (startingIndex + 1)).value = inputString.join('');
  document.getElementById('inputTree' + (startingIndex + 1)).disabled = true;
  document.getElementById('Treeextable' + (startingIndex + 1)).style.backgroundColor = "blue";
  // Calculate the solution
  HuffmanTree(baseTree(inputString), startingIndex);
}

// Generate the solutions for random generated Strings or Trees
function GenString(startingIndex) {
  stringIndex.push([startingIndex.toString(10)]);
  string.push([startingIndex.toString(10)]);
  for (let i = 0; i < Math.random() * 20 + 5; i++) {
    stringIndex[startingIndex].push(Math.floor(Math.random() * characters.length));
    string[startingIndex].push(characters[stringIndex[startingIndex][i + 1]]);
  }
  // Remove the startingIndex element from the sublist
  stringIndex[startingIndex].shift();
  string[startingIndex].shift();
  return string[startingIndex];
}

// Generate the base of the huffman-Tree
function baseTree(string) {
  base = [];
  // Save the length of the string to be able to acces it when the string is changed
  var divider = string.length;
  var ino = 0;
  for (let i = 0; i < divider; i++) {
    base.push(string.filter((v) => (v === string[ino])).length / divider);
    var value = string[ino];
    for (let q = 0; q < base[i] * divider; q++) {
      var index = string.indexOf(value);
      if (index !== -1) var a = string.splice(index, 1);
    }
    ino = ino + 1 - base[i] * divider;
  }
  base.sort(function(a, b){return b - a});
  // Remove the remaing zeros
  while (base[base.length - 1] === 0) base.pop();
  return base;
}

// Generate a huffman-Tree on a base
function HuffmanTree(base, startingIndex) {
  // Let the Tree grow until it reaches a probabillity of 1
  if (base[0] === 1) var growing = false;
  else var growing = true;
  while (growing) {
    // Round the values to 0.1%
    var roundedBase = [];
    for (let i = 0; i < base.length; i++) roundedBase.push(Math.round(base[i] * 1000) / 10);
    solution[startingIndex / 2] += roundedBase + '\n';
    base[base.length - 2] = (base[base.length - 1] + base[base.length - 2]);
    base.pop();
    base.sort(function(a, b){return b - a});
    if (base[0] === 1) {
      growing = false;
    }
  }
  solution[startingIndex / 2] += 1;
  return;
}

// Check whether the given input matches the solution for the Tree exercise
function checkTree(message, index) {
  // If the input matches the solution display a green background
  if (message === solution[index / 2]) {
    document.getElementById('Treeextable' + index).style.backgroundColor = "green";
  }
  // If the input is wrong display a red background
  else {
    document.getElementById('Treeextable' + index).style.backgroundColor = "red";
  }
}

// Reset the starting and solution values and background colors
function resetTree() {
  console.log('reset');
  for (let index = 0; index < 8; index++) {
    document.getElementById('inputTree' + index).value = '';
    document.getElementById('inputTree' + index).disabled = false;
    document.getElementById('Treeextable' + index).style.backgroundColor = "white";
  }
  string = [];
  stringIndex = [];
  solution = [];
  for (let i = 0; i < 4; i++) displayTree(i * 2);
}

// Display the solution value
function solutionTree(index) {
  document.getElementById('inputTree' + index).value = solution[index / 2];
  document.getElementById('Treeextable' + index).style.backgroundColor = "green";
}
