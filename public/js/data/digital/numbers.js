// Stores all the solutions to the exercises
let solution = [];

// Displays all the exercises
function displayExercise(n) {
  for (let i = 0; i < n; i++) {
    displayConvert(i);
  }
  for (let i = 0; i < n; i++) {
    displayComplement(i);
  }
  for (let i = 0; i < n; i++) {
    displayFloat(i);
  }
}

// Displays the format conversion exercise
function displayConvert(index) {
  solution.push([Math.floor(Math.random() * 100 * (index + 1))]);
  solution[index].push((solution[index][0] >>> 0).toString(16).toUpperCase(), (solution[index][0] >>> 0).toString(2));
  randSlot = Math.floor(Math.random() * 3);
  var fieldList = document.getElementsByClassName("convertexercise");
  var inputList = document.getElementsByClassName("inputConvert");
  var buttonList = document.getElementsByClassName("convertSolution");
  inputList[randSlot + 3 * index].value = solution[index][randSlot];
  inputList[randSlot + 3 * index].disabled = true;
  fieldList[randSlot + 3 * index].style.backgroundColor = "blue";
  buttonList[randSlot + 3 * index].style.visibility = 'hidden';
}

// Displays the format complementexercise
function displayComplement(index) {
  solution.push([Math.floor((Math.random() - 0.5) * Math.random() * 150 * (index + 1))]);
  let a = solution[index + 4][0];
  if (a < 0) {
    var bin = (solution[index + 4][0] >>> 0).toString(2).substring(17);
  }
  else {
    var bin = (a >>> 0).toString(2);
    var zeros = 15 - bin.length;
    for (let i = 0; i < zeros; i++) bin = '0'.concat(bin);
  }
  solution[index + 4].push((Math.abs(a) >>> 0).toString(2), bin);
  var fieldList = document.getElementsByClassName("complementexercise");
  var inputList = document.getElementsByClassName("inputComplement");
  var buttonList = document.getElementsByClassName("complementSolution");
  if (Math.random() < 0.5) {
    inputList[0 + 3 * index].value = solution[index + 4][0];
    inputList[0 + 3 * index].disabled = true;
    fieldList[0 + 3 * index].style.backgroundColor = "blue";
    buttonList[0 + 3 * index].style.visibility = 'hidden';
  }
  else {
    inputList[2 + 3 * index].value = solution[index + 4][2];
    inputList[2 + 3 * index].disabled = true;
    fieldList[2 + 3 * index].style.backgroundColor = "blue";
    buttonList[2 + 3 * index].style.visibility = 'hidden';
  }
}

// Displays the format floatexercise
function displayFloat(index) {
  solution.push([(Math.random() - 0.5) * Math.random() * 150 * (((index + 1) / 3) ** 13)]);
  solution[index + 8].push(Math.sign(Math.sign(solution[index + 8][0]) + 1) - Math.sign(solution[index + 8][0]), exponent(solution[index + 8][0]), mantissa(Math.abs(solution[index + 8][0])));
  var fieldList = document.getElementsByClassName("floatexercise");
  var inputList = document.getElementsByClassName("inputFloat");
  var buttonList = document.getElementsByClassName("floatSolution");
  if (Math.random() < 0.5) {
    inputList[0 + 4 * index].value = solution[index + 8][0];
    inputList[0 + 4 * index].disabled = true;
    fieldList[0 + 4 * index].style.backgroundColor = "blue";
    buttonList[0 + 4 * index].style.visibility = 'hidden';
  }
  else {
    inputList[1 + 4 * index].value = solution[index + 8][1];
    inputList[1 + 4 * index].disabled = true;
    fieldList[1 + 4 * index].style.backgroundColor = "blue";
    buttonList[1 + 4 * index].style.visibility = 'hidden';
    inputList[2 + 4 * index].value = solution[index + 8][2];
    inputList[2 + 4 * index].disabled = true;
    fieldList[2 + 4 * index].style.backgroundColor = "blue";
    buttonList[2 + 4 * index].style.visibility = 'hidden';
    inputList[3 + 4 * index].value = solution[index + 8][3];
    inputList[3 + 4 * index].disabled = true;
    fieldList[3 + 4 * index].style.backgroundColor = "blue";
    buttonList[3 + 4 * index].style.visibility = 'hidden';
  }
}

// Calculates the fp exponent of a number
function exponent(n) {
  var exp = 127;
  while (Math.abs(n) > 2) {
    exp++;
    n = n / 2;
  }
  while (Math.abs(n) < 1 && n != 0) {
    exp--;
    n = n * 2;
  }
  if (n == 0) exp = 0;
  exp = (exp >>> 0).toString(2);
  while (exp.length < 8) exp = '0'.concat(exp);
  return exp;
}

// Caltulates the mantissa of a number
function mantissa(n) {
  while (n > 2) n = n / 2;
  while (n < 1 && n != 0) n = n * 2;
  if (n > 1) n = n - 1;
  var mant = [];
  for (let i = 1; i < 15; i++) {
    if (n > 2 ** (-i)) {
      n = n - 2 ** (-i);
      mant.push(1);
    }
    else mant.push(0);
  }
  mant = mant.join('');
  return mant;
}

// Checks the input value
function checkConvert(message, index) {
  if (message == solution[Math.floor(index / 3)][index % 3]) {
    document.getElementsByClassName("convertexercise")[index].style.backgroundColor = "green";
  }
  else {
    document.getElementsByClassName("convertexercise")[index].style.backgroundColor = "red";
  }
}

// Checks the input value
function checkComplement(message, index) {
  if (message == solution[Math.floor(index / 3) + 4][index % 3]) {
    document.getElementsByClassName("complementexercise")[index].style.backgroundColor = "green";
  }
  else {
    document.getElementsByClassName("complementexercise")[index].style.backgroundColor = "red";
  }
}

// Checks the input value
function checkFloat(message, index) {
  if (message == solution[Math.floor(index / 4) + 8][index % 4]) {
    document.getElementsByClassName("floatexercise")[index].style.backgroundColor = "green";
  }
  else {
    document.getElementsByClassName("floatexercise")[index].style.backgroundColor = "red";
  }
}

// Displays the solution to the user
function solutionConvert(index) {
  document.getElementsByClassName("inputConvert")[index].value = solution[Math.floor(index / 3)][index % 3];
  document.getElementsByClassName("convertexercise")[index].style.backgroundColor = "green";
}

// Displays the solution to the user
function solutionComplement(index) {
  document.getElementsByClassName("inputComplement")[index].value = solution[Math.floor(index / 3) + 4][index % 3];
  document.getElementsByClassName("complementexercise")[index].style.backgroundColor = "green";
}

// Displays the solution to the user
function solutionFloat(index) {
  document.getElementsByClassName("inputFloat")[index].value = solution[Math.floor(index / 4) + 8][index % 4];
  document.getElementsByClassName("floatexercise")[index].style.backgroundColor = "green";
}

// Displays new exercises
function resetConvert() {
  for (let i = 0; i < 12; i++) {
    document.getElementsByClassName("inputConvert")[i].value = '';
    document.getElementsByClassName("inputConvert")[i].disabled = false;
    document.getElementsByClassName("convertexercise")[i].style.backgroundColor = "white";
    document.getElementsByClassName("convertSolution")[i].style.visibility = 'visible';
  }
  for (let i = 0; i < 4; i++) solution.shift();
  for (let i = 0; i < 4; i++) displayConvert(i);
}

// Displays new exercises
function resetComplement() {
  for (let i = 0; i < 12; i++) {
    document.getElementsByClassName("inputComplement")[i].value = '';
    document.getElementsByClassName("inputComplement")[i].disabled = false;
    document.getElementsByClassName("complementexercise")[i].style.backgroundColor = "white";
    document.getElementsByClassName("complementSolution")[i].style.visibility = 'visible';
  }
  for (let i = 0; i < 4; i++) solution.pop();
  for (let i = 0; i < 4; i++) displayComplement(i);
}

// Displays new exercises
function resetFloat() {
  for (let i = 0; i < 16; i++) {
    document.getElementsByClassName("inputFloat")[i].value = '';
    document.getElementsByClassName("inputFloat")[i].disabled = false;
    document.getElementsByClassName("floatexercise")[i].style.backgroundColor = "white";
    document.getElementsByClassName("floatSolution")[i].style.visibility = 'visible';
  }
  for (let i = 0; i < 4; i++) solution.pop();
  for (let i = 0; i < 4; i++) displayFloat(i);
}
