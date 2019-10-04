// List of all possible characters for the random string
let characters = [];

// List with all string-character sublists
let string = [];

// List with the indexes of the string character in sublists
let stringIndex = [];

// List with all string-character sublists for the second exercise
let stringHuff = [];

// List with the indexes of the string character in sublists for the second exercise
let stringIndexHuff = [];

// List of the solution Trees
let solution = [];

// List of the solutions of the last exercise
let solHuffman = [];

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
    displayHuffman(i * 3);
  }
}

function displayTree(startingIndex) {
  solution.push(['']);
  inputString = GenString(startingIndex / 2);
  document.getElementById('inputTree' + (startingIndex + 1)).value = inputString.join('');
  document.getElementById('inputTree' + (startingIndex + 1)).disabled = true;
  document.getElementById('Treeextable' + (startingIndex + 1)).style.backgroundColor = "blue";
  // Calculate the solution
  HuffmanTree(baseTree(inputString, false), startingIndex, false);
}

// Display the second exercise
function displayHuffman(startingIndex) {
  solHuffman.push(['']);
  inputString = GenStringHuff(startingIndex / 3);
  randSlot = Math.floor(Math.random() * 3);
  // Calculate the solution
  // HuffmanTree(baseTree(inputString, true), startingIndex, true);
  // Display the code and the string together
  if (randSlot % 3 === 0 || (randSlot - 1) % 3  === 1) {
    document.getElementById('inputHuffman' + (startingIndex)).value = inputString.join('');
    document.getElementById('inputHuffman' + (startingIndex + 1)).value = inputString.join('');
    document.getElementById('inputHuffman' + (startingIndex)).disabled = true;
    document.getElementById('inputHuffman' + (startingIndex + 1)).disabled = true;
    document.getElementById('Huffmanextable' + (startingIndex)).style.backgroundColor = "blue";
    document.getElementById('Huffmanextable' + (startingIndex + 1)).style.backgroundColor = "blue";
  }
  // Otherwise only display the string
  else {
    document.getElementById('inputHuffman' + (startingIndex + 2)).value = inputString.join('');
    document.getElementById('inputHuffman' + (startingIndex + 2)).disabled = true;
    document.getElementById('Huffmanextable' + (startingIndex + 2)).style.backgroundColor = "blue";
  }
}

// Generate a random string for the tree exercise
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

// Generate a random string for the huffman exercise
function GenStringHuff(startingIndex) {
  stringIndexHuff.push([startingIndex.toString(10)]);
  stringHuff.push([startingIndex.toString(10)]);
  for (let i = 0; i < Math.random() * 20 + 5; i++) {
    stringIndexHuff[startingIndex].push(Math.floor(Math.random() * characters.length));
    stringHuff[startingIndex].push(characters[stringIndexHuff[startingIndex][i + 1]]);
  }
  // Remove the startingIndex element from the sublist
  stringIndexHuff[startingIndex].shift();
  stringHuff[startingIndex].shift();
  return stringHuff[startingIndex];
}

// Generate the base of the huffman-Tree
function baseTree(string, huff) {
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
function HuffmanTree(base, startingIndex, huff) {
  // Let the Tree grow until it reaches a probabillity of 1
  if (base[0] === 1) var growing = false;
  else var growing = true;
  while (growing) {
    // Round the values to 0.1%
    var roundedBase = [];
    for (let i = 0; i < base.length; i++) roundedBase.push(Math.round(base[i] * 1000) / 10);
    if (huff) solHuffman[startingIndex] += roundedBase + '\n';
    else solution[startingIndex / 2] += roundedBase + '\n';
    base[base.length - 2] = (base[base.length - 1] + base[base.length - 2]);
    base.pop();
    base.sort(function(a, b){return b - a});
    if (base[0] === 1) {
      growing = false;
    }
  }
  if (huff) solHuffman[startingIndex] += 1;
  else solution[startingIndex / 2] += 1;
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

// Check whether the given input matches the solution for the Huffman exercise
function checkHuffman(message, index) {
  // If the input matches the solution display a green background
  if (message === solHuffman[index]) {
    document.getElementById('Huffmanextable' + index).style.backgroundColor = "green";
  }
  // If the input is wrong display a red background
  else {
    document.getElementById('Huffmanextable' + index).style.backgroundColor = "red";
  }
}

// Reset the starting and solution values and background colors
function resetTree() {
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

// Reset the starting and solution values and background colors
function resetHuffman() {
  for (let index = 0; index < 8; index++) {
    document.getElementById('inputHuffman' + index).value = '';
    document.getElementById('inputHuffman' + index).disabled = false;
    document.getElementById('Huffmanextable' + index).style.backgroundColor = "white";
  }
  stringHuff = [];
  stringIndexHuff = [];
  solHuffman = [];
  for (let i = 0; i < 4; i++) displayHuffman(i * 3);
}

// Display the solution value
function solutionTree(index) {
  document.getElementById('inputTree' + index).value = solution[index / 2];
  document.getElementById('Treeextable' + index).style.backgroundColor = "green";
}

// Display the solution value for the second exercise
function solutionHuffman(index) {
  document.getElementById('inputHuffman' + index).value = solHuffman[index];
  document.getElementById('Huffmanextable' + index).style.backgroundColor = "green";
}
