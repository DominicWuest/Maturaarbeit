// Index of the course to be displayed
let courseIndex;
// Time for Python code to run in ms until a timeout is declared
let timeoutBounds = 5000;
// Boolean indicating whether Python code is currently running or not
let running = false;
// Boolean indicating whether Python code has finished running
let finished = false;
// A boolean indicating whether all subexercises of the current exercise have been completed
let exerciseFinished;

// Parses the cookie of the exercise index, so that the user always sees the exercise he was last on
if (document.cookie.split(';').filter((item) => item.trim().startsWith('courseIndex=')).length) {
  let value = "; " + document.cookie;
  let parts = value.split("; courseIndex=");
  courseIndex = parseInt(parts.pop().split(";").shift());
}
// If no cookie exists
else courseIndex = 0;

// The index of the subexercise
let subexerciseIndex = 0;

// Gets called whenever the user runs their code. Compiles and runs the code. Appends the output to the output div
function runit() {
  // Don't do anything if there is Python code running
  if (running) return;
  running = true;
  finished = false;
  // Create the worker and send it data
  let worker = new Worker('/js/languages/pythonWorker.js');
  let code = document.getElementById('textarea').value;
  worker.postMessage(code);
  let myPre = document.getElementById('output');
  myPre.innerHTML = 'Compiling...';
  // Set timeout to check after timeoutBounds ms whether the code is still running
  let timeout = setTimeout(function () {
    // If the code hasn't finished running, declare a timeout and show an error in the output div
    if (!finished) {
      worker.terminate();
      myPre.innerHTML = '<span class="error">Dein Code hat zu lange gebraucht, um ausgeführt zu werden.\nHast du möglicherweise eine unendliche Schlaufe kreiert?</span>';
      checkSolution(null);
      running = false;
    }
  }, timeoutBounds);
  // The onmessage event gets triggered by the worker and it sends back the output of the code
  worker.onmessage = function(message) {
    myPre.innerHTML = message["data"];
    finished = true;
    running = false;
    clearTimeout(timeout);
    worker.terminate();
    checkSolution(myPre.innerHTML.trim());
  }
}

// Gets called whenever the users Python code has finished running
function checkSolution(output) {
  // Don't check the solution if the user has completed all subexercises
  if (exerciseFinished || courseIndex === 0) return;
  // If the outputmatches the expected output of the subexercise
  if (output === pythonCourses['exercises'][courseIndex]['subexercises'][subexerciseIndex]['output']) {
    document.getElementById('subExercise' + subexerciseIndex).classList.add('finishedSubexercise');
    document.getElementById('subExercise' + subexerciseIndex).classList.remove('incorrectSubexercise');
    // Set exerciseFinished to true if all subexercises have been completed
    if (subexerciseIndex === pythonCourses['exercises'][courseIndex]['subexercises'].length - 1) exerciseFinished = true;
    // Increment the subexerciseIndex and reset it if the user hasn't finished all subexercises yet
    else {
      resetSubexercise();
      subexerciseIndex++;
    }
  }
  // The output is incorrect
  else document.getElementById('subExercise' + subexerciseIndex).classList.add('incorrectSubexercise');
}

// Replaces the code in the textarea with the starting code of the subexercise
function resetSubexercise() {
  if (courseIndex === 0) document.getElementById('textarea').value = '';
  else document.getElementById('textarea').value = pythonCourses['exercises'][courseIndex]['subexercises'][subexerciseIndex]['startingCode'];
  document.getElementById('textarea').oninput();
}

// Gets called whenever the user changes the exercise. This function displays the exercises text
function displayExercise() {
  // Stop Python code from continuing to be executed
  finished = true;
  running = false;
  // Set the cookie for the course index to be the current course index
  document.cookie = "courseIndex=" + courseIndex + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  // Set the title of the exercise
  let exerciseTitle = document.getElementById('exerciseTitle');
  exerciseTitle.innerHTML = '<h1>' + pythonCourses['exercises'][courseIndex]['title'] + '</h1>';
  // Set the description of the exercise
  let textDiv = document.getElementById('exerciseText');
  textDiv.innerHTML = pythonCourses['exercises'][courseIndex]['description'];
  // Display all the subexercises
  for (subexercise of pythonCourses['exercises'][courseIndex]['subexercises']) textDiv.innerHTML += '<p class="subexercise" id="subExercise' + subexercise["index"] + '">' + subexercise['description'] + '</p>';
  // Hide the solution button if the exercise is free coding
  if (courseIndex === 0) {
    document.getElementsByClassName('solutionButtonDiv')[0].style.visibility = 'hidden';
    document.getElementsByName('solution')[0].style.visibility = 'hidden';
  }
  // Show the solution button if the exercise is not free coding
  else {
    document.getElementsByClassName('solutionButtonDiv')[0].style.visibility = 'visible';
    document.getElementsByName('solution')[0].style.visibility = 'visible';
  }
  // Make the new dropdown menu for all exercises
  makeDropdown();
  resetSubexercise();
  exerciseFinished = false;
  document.getElementById('textarea').oninput();
}

// Gets called when the solution button gets clicked, shows the solution for the subexercise
function showSolution() {
  document.getElementById('textarea').value = pythonCourses['exercises'][courseIndex]['subexercises'][subexerciseIndex]['solution'];
  document.getElementById('textarea').oninput();
}

function loaded() {
  // Add event listener for tabs and the enter key
  document.getElementById('textarea').addEventListener('keydown', function(event) {
    let caretPosition = event.target.selectionEnd;
    // If Enter key gets pressed
    if (event.keyCode === 13) {
      event.preventDefault();
      let textArea = document.getElementById('textarea');
      // The position of the cursor
      let cursorIndex = textArea.selectionStart - 1;
      // The current code
      let code = textArea.value;
      // Add a tab before the next line if the character before the cursor is a colon
      let colon = code.charAt(cursorIndex) === ':';
      // Split the code on newline characters to create an array containing all the lines of code
      let codeArray = textArea.value.split('\n');
      // The index of the cursor in the array
      let index;
      // The index of the position of the cursor in the string
      let length = cursorIndex;
      // Find out the position of the cursor in the 2D-Array of the code
      for (let i = 0; i < codeArray.length; i++) {
        let newLength = length - codeArray[i].length - 1;
        if (newLength < 0) {
          index = i;
          length++;
          break;
        }
        length = newLength;
      }
      // Set the right amount of tabs at the beginning of the line
      let newLine = '\t'.repeat(codeArray[index].match(/(\t*)?/)[0].length + (colon ? 1 : 0)) + codeArray[index].substring(length);
      // Include the new line in the code
      codeArray[index] = codeArray[index].substring(0, length);
      codeArray.splice(index + 1, 0, newLine);
      textArea.value = codeArray.join('\n');
      document.getElementById('textarea').oninput();
      // Set the cursor to the right posittion
      textArea.selectionEnd = caretPosition + (codeArray[index + 1].substring(0, length).split('\t').length);
      // Blur and focus the textarea so that the cursor is always focused
      document.getElementById('textarea').blur();
      document.getElementById('textarea').focus();
    }
    // If Tab key gets pressed
    else if (event.keyCode === 9) {
      let textArea = document.getElementById('textarea');
      // The index where the cursor is posititoned
      let cursorIndex = textArea.selectionStart - 1;
      let code = textArea.value;
      // The new code after inserting the tab
      let newCode = code.substring(0, cursorIndex + 1) + '\t' + code.substring(cursorIndex + 1, code.length);
      // Replace the text inside the textarea with the new code
      textArea.value = newCode;
      // Prevent default behaviour (focus other element)
      event.preventDefault();
      document.getElementById('textarea').oninput();
      // Set the selection end to where the tab was inserted
      textArea.selectionEnd = caretPosition + 1;
      // Blur and focus the textarea so that the cursor is always focused
      document.getElementById('textarea').blur();
      document.getElementById('textarea').focus();
    }
  });
  // Eventlistener for the textarea so that the code div lines up with the textarea
  document.getElementById('textarea').addEventListener('scroll', function(event) {
    let element = document.getElementById('code');
    // Set the scroll position of the code div to the scroll position of the textarea
    element.scrollLeft = event["target"]["scrollLeft"];
    element.scrollTop = event["target"]["scrollTop"];
  });
  makeDropdown();
  addHighlighting();
}

// Creates the dropdown
function makeDropdown() {
  // The list containing all links to the exercises
  let list = document.getElementById('exercisesDropdownList');
  // Remove all children of the list
  while (list.firstChild) list.removeChild(list.firstChild);
  for (course of pythonCourses['exercises']) {
    // Create the list element for the exercise
    if (course['index'] !== courseIndex) {
      let listElement = document.createElement('LI');
      listElement.textContent = course['title'];
      listElement.id = course['index'];
      list.appendChild(listElement);
      // Add an eventlistener to the listelement to switch exercises on click
      listElement.addEventListener('click', function() {
        courseIndex = parseInt(listElement.id);
        subexerciseIndex = 0;
        exerciseFinished = false;
        displayExercise();
        addHighlighting();
      });
    }
  }
}

// Sets the dimensions of the textarea to the dimensions of the code div, so that they mach up
function setTextareaDimensions() {
  document.getElementById('textarea').style.width = document.getElementById('code').offsetWidth + 'px';
}
