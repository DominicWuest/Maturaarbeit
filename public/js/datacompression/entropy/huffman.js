// List of all possible characters for the random string
let characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-'];

// Storage of indexes of displayed sign in TREE
let randCharListTREE = [];

// Setup all exercises
function displayExercise(n) {
  for (let i = 0; i < n; i++) {
    displayTREE(i * 2);
  }
}

function displayTREE(startingIndex) {
  inputsTREE = HuffmanTree(baseTree(GenTree(characters)));
  randChar = Math.round(Math.random() * (characters.length - 1));
  // Save the  indexes ot the characters to use them later to correct
  randCharListTREE.push(randChar);
  randSlot = Math.floor(Math.random() * 2);
  document.getElementById('inputTREE' + (startingIndex + randSlot)).value = inputsTREE[randChar][randSlot];
  document.getElementById('inputTREE' + (startingIndex + randSlot)).disabled = true;
  document.getElementById('TREEextable' + (startingIndex + randSlot)).style.backgroundColor = "blue";
}

// Generate the solutions for random generated Strings or Trees
function GenTree(alphabet) {
  // Generate a random string
  string = []
  s = []
  for (let i = 0; i < Math.random() * 20 + 5; i++) {
    string.push(Math.floor(Math.random() * 27));
  }
  document.getElementById('TREEextable1').textContent = string;
  inputs = HuffmanTree(string);
  document.getElementById('TREEextable0').textContent = string;
  return inputs;
}

// Generate a huffman-tree for a string
function HuffmanTree(base) {
  if (base[0] === 1.0) return;
  base[base.lenght - 2] = (base[base.lenght - 1] + base[base.lenght - 2], 2);
  base.lenght = base.lenght - 1;
  base.sort(function(a, b){return b - a});
  document.getElementById('inputTREE0').value = base;
  HuffmanTree(base);
}

// Generate the base of the huffman-tree
function baseTree(string) {
  base = [];
  base.push(string.filter((v) => (v === value)).length / string.lenght);
  base.sort(function(a, b){return b - a});
  document.getElementById('inputTREE0').value = base;
  return base;
}

// Check whether the given input matches the solution for the TREE exercise
function checkTREE(message, index) {
  // If the input matches the solution display a green background
  if (message === inputsTREE[randCharListTREE[Math.floor(index * 0.5)]][index % 2]) {
    document.getElementById('TREEextable' + index).style.backgroundColor = "green";
  }
  // If the input is wrong display a red background
  else {
    document.getElementById('TREEextable' + index).style.backgroundColor = "red";
  }
}

// Reset the starting and solution values and background colors
function resetTREE() {
  for (let index = 0; index < 16; index++) {
    document.getElementById('inputTREE' + index).value = '';
    document.getElementById('inputTREE' + index).disabled = false;
    document.getElementById('TREEextable' + index).style.backgroundColor = "white";
  }
  randCharListTREE = [];
  for (let i = 0; i < 4; i++) displayTREE(i * 4);
}

// Display the solution value
function solutionTREE(index) {
  document.getElementById('inputTREE' + index).value = inputsTREE[randCharListTREE[Math.floor(index * 0.5)]][index % 2];
  document.getElementById('TREEextable' + index).style.backgroundColor = "green";
}
