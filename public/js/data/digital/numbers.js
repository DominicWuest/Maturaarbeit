// Stores all the solutions to the exercises
let solution = [];

// Displays all the exercises
function displayExercise(n) {
  for (let i = 0; i < n; i++) {
    displayConvert(i);
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

function checkConvert(message, index) {
  if (message == solution[Math.floor(index / 3)][index % 3]) {
    document.getElementsByClassName("convertexercise")[index].style.backgroundColor = "green";
  }
  else {
    document.getElementsByClassName("convertexercise")[index].style.backgroundColor = "red";
  }
}

function solutionConvert(index) {
  document.getElementsByClassName("inputConvert")[index].value = solution[Math.floor(index / 3)][index % 3];
  document.getElementsByClassName("convertexercise")[index].style.backgroundColor = "green";
}

function resetConvert() {
  for (let i = 0; i < 12; i++) {
    document.getElementsByClassName("inputConvert")[i].value = '';
    document.getElementsByClassName("inputConvert")[i].disabled = false;
    document.getElementsByClassName("convertexercise")[i].style.backgroundColor = "white";
    document.getElementsByClassName("convertSolution")[i].style.visibility = 'visible';
  }
  solution = [];
  for (let i = 0; i < 4; i++) displayConvert(i);
}
