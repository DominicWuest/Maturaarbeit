// List of all possible characters for the random string
let characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-'];

// List with all string-character sublists
let string = [];

// List with the indexes of the string character in sublists
let stringIndex = [];

// List of the solution trees
let solution = [[''], [''], [''], ['']];

// Setup all exercises
function displayExercise(n) {
  for (let i = 0; i < n; i++) {
    displayTREE(i * 2);
  }
}

function displayTREE(startingIndex) {
  inputString = GenString(startingIndex / 2);
  document.getElementById('inputTREE' + (startingIndex + 1)).value = inputString.join('');
  document.getElementById('inputTREE' + (startingIndex + 1)).disabled = true;
  document.getElementById('TREEextable' + (startingIndex + 1)).style.backgroundColor = "blue";
  // Calculate the solution
  HuffmanTree(baseTree(inputString), startingIndex);
}

// Generate the solutions for random generated Strings or Trees
function GenString(startingIndex) {
  stringIndex.push([startingIndex.toString(10)]);
  string.push([startingIndex.toString(10)]);
  for (let i = 0; i < Math.random() * 2 + 5; i++) {
    stringIndex[startingIndex].push(Math.floor(Math.random() * 27));
    string[startingIndex].push(characters[stringIndex[startingIndex][i + 1]]);
  }
  // Remove the startingIndex element from the sublist
  stringIndex[startingIndex].shift();
  string[startingIndex].shift();
  return string[startingIndex];
}

// Generate the base of the huffman-tree
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

// Generate a huffman-tree on a base
function HuffmanTree(base, startingIndex) {
  // Let the tree grow until it reaches a probabillity of 1
  var growing = true;
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

// Check whether the given input matches the solution for the TREE exercise
function checkTREE(message, index) {
  // If the input matches the solution display a green background
  if (message === solution[index / 2]) {
    document.getElementById('TREEextable' + index).style.backgroundColor = "green";
  }
  // If the input is wrong display a red background
  else {
    document.getElementById('TREEextable' + index).style.backgroundColor = "red";
  }
}

// Reset the starting and solution values and background colors
function resetTREE() {
  for (let index = 0; index < 8; index++) {
    document.getElementById('inputTREE' + index).value = '';
    document.getElementById('inputTREE' + index).disabled = false;
    document.getElementById('TREEextable' + index).style.backgroundColor = "white";
  }
  string = [];
  stringIndex = [];
  solution = [[''], [''], [''], ['']];
  for (let i = 0; i < 4; i++) displayTREE(i * 2);
}

// Display the solution value
function solutionTREE(index) {
  document.getElementById('inputTREE' + index).value = solution[index / 2];
  document.getElementById('TREEextable' + index).style.backgroundColor = "green";
}
