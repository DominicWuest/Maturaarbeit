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

// Array with all tree solutions with indicators what the code sign is
let checkHuff = [];

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
  uniqueChar = inputString.filter(function(item, pos) {
    return inputString.indexOf(item) == pos;
  })
  HuffmanTree(baseTree(inputString, startingIndex, false, uniqueChar), startingIndex, false);
}

// Display the second exercise
function displayHuffman(startingIndex) {
  solHuffman.push(['']);
  inputString = GenStringHuff(startingIndex / 3);
  // Copy the list into a temporary variable because it gets changed in the solution functions
  var temp = inputString.slice();
  randSlot = Math.floor(Math.random() * 2);
  // Calculate the solution
  uniqueChar = temp.filter(function(item, pos) {
    return temp.indexOf(item) == pos;
  })
  HuffmanTree(baseTree(inputString, startingIndex, true, uniqueChar), startingIndex, true);
  HuffmanCode(startingIndex, temp, uniqueChar);
  solHuffman.push(temp.join(''));
  // If the third slot is chosen display just the string
  if (randSlot === 1) {
    document.getElementById('inputHuffman' + (startingIndex + 2)).value = temp.join('');
    document.getElementById('inputHuffman' + (startingIndex + 2)).disabled = true;
    document.getElementById('Huffmanextable' + (startingIndex + 2)).style.backgroundColor = "blue";
    document.getElementById('solButton' + (startingIndex + 2)).style.visibility = 'hidden';
  }
  // Otherwise display the code and the string together
  if (randSlot === 0) {
    document.getElementById('inputHuffman' + (startingIndex)).value = solHuffman[startingIndex];
    document.getElementById('inputHuffman' + (startingIndex + 1)).value = solHuffman[startingIndex + 1];
    document.getElementById('inputHuffman' + (startingIndex)).disabled = true;
    document.getElementById('inputHuffman' + (startingIndex + 1)).disabled = true;
    document.getElementById('Huffmanextable' + (startingIndex)).style.backgroundColor = "blue";
    document.getElementById('Huffmanextable' + (startingIndex + 1)).style.backgroundColor = "blue";
    document.getElementById('solButton' + (startingIndex)).style.visibility = 'hidden';
    document.getElementById('solButton' + (startingIndex + 1)).style.visibility = 'hidden';
  }
}

// Generate a random string for the tree exercise
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

// Generate a random string for the huffman exercise
function GenStringHuff(startingIndex) {
  for (let i = 0; i < Math.random() * 20 + 5; i++) {
    if (i === 0) {
      stringIndexHuff.push([Math.floor(Math.random() * characters.length)]);
      stringHuff.push([characters[stringIndexHuff[startingIndex][i]]]);
    }
    else {
      stringIndexHuff[startingIndex].push(Math.floor(Math.random() * characters.length));
      stringHuff[startingIndex].push(characters[stringIndexHuff[startingIndex][i]]);
    }
  }
  return stringHuff[startingIndex];
}

// Generate the base of the huffman-Tree
function baseTree(string, startingIndex, huff, fixedString) {
  base = [];
  for (let i = 0; i < fixedString.length; i++) base.push([fixedString[i]]);
  // Save the length of the string to access it when the string is changed
  var divider = string.length;
  // Put the probabillity values into the subarray with the sign
  for (let i = 0; i < fixedString.length; i++) {
    base[i].push(string.filter((v) => (v === string[0])).length / divider);
    // Remove characters that were already used
    var value = string[0];
    for (let q = 0; q < base[i][1] * divider; q++) {
      var index = string.indexOf(value);
      if (index !== -1) var a = string.splice(index, 1);
    }
  }
  base.sort(function(a,b){return b[1] - a[1]});
  return base;
}

// Generate a huffman-Tree on a base
function HuffmanTree(base, startingIndex, huff) {
  // Let the Tree grow until it reaches a probabillity of 1
  if (base[0][1] === 1) var growing = false;
  else var growing = true;
  if (huff) checkHuff.push([]);
  while (growing) {
    // Round the values to 0.1%
    var roundedBase = [];
    for (let i = 0; i < base.length; i++) roundedBase.push([base[i][0], Math.round(base[i][1] * 1000) / 10]);
    var solutionArray = [];
    for (let i = 0; i < base.length; i++) solutionArray.push([base[i][0], base[i][1]]);
    if (huff) {
      solutionArray[roundedBase.length - 2].push(0);
      solutionArray[roundedBase.length - 1].push(1);
      checkHuff[startingIndex / 3].push(solutionArray);
      solHuffman[startingIndex] += roundedBase + '\n';
    }
    else solution[startingIndex / 2] += roundedBase + '\n';
    base[base.length - 2] = [(base[base.length - 2][0] + base[base.length - 1][0]), (base[base.length - 2][1] + base[base.length - 1][1])];
    base.pop();
    base.sort(function(a,b){return b[1] - a[1]});
    if (1 - base[0][1] < 0.000000001) {
      if (huff) solHuffman[startingIndex] += base[0][0] + ',100';
      else solution[startingIndex / 2] += base[0][0] + ',100';
      growing = false;
    }
  }
  return;
}

// Creates the encoded binary value of the string
function HuffmanCode(startingIndex, string, uniqueString) {
  // Variable where the code will be stored in
  var code = '';
  // Calculate the code for each sign
  var encoded = [];
  for (let i = 0; i < uniqueString.length; i++) {
    var codeSign = '';
    // Access the planes from the lowest and extract the solution values
    for (var z = checkHuff[startingIndex / 3].length - 1; z > -1; z -= 1) {
      for (let w = 0; w < checkHuff[startingIndex / 3][z].length; w++) {
        if (checkHuff[startingIndex / 3][z][w][0].includes(uniqueString[i])) {
          if (checkHuff[startingIndex / 3][z][w][2] === 0 || checkHuff[startingIndex / 3][z][w][2] === 1) {
            codeSign += checkHuff[startingIndex / 3][z][w][2];
          }
        }
      }
    }
    encoded.push(codeSign);
  }
  // Add the precalculated codes to the solution by their occurance
  for (let i = 0; i < string.length; i++) {
    code += encoded[uniqueString.indexOf(string[i])]
  }
  // add the finished code to the solution array
  solHuffman.push(code);
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
  for (let index = 0; index < 12; index++) {
    document.getElementById('inputHuffman' + index).value = '';
    document.getElementById('inputHuffman' + index).disabled = false;
    document.getElementById('Huffmanextable' + index).style.backgroundColor = "white";
    document.getElementById('solButton' + index).style.visibility = 'visible';
  }
  stringHuff = [];
  stringIndexHuff = [];
  solHuffman = [];
  checkHuff = [];
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
