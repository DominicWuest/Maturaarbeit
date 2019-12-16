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
  randSlot = Math.floor(Math.random() * 3);
  var fieldList = document.getElementsByClassName("complementexercise");
  var inputList = document.getElementsByClassName("inputComplement");
  var buttonList = document.getElementsByClassName("complementSolution");
  inputList[randSlot + 3 * index].value = solution[index + 4][randSlot];
  inputList[randSlot + 3 * index].disabled = true;
  fieldList[randSlot + 3 * index].style.backgroundColor = "blue";
  buttonList[randSlot + 3 * index].style.visibility = 'hidden';
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
