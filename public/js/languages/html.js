// Index of the course to be displayed
let courseIndex;
// A boolean indicating whether all subexercises of the current exercise have been completed
let exerciseFinished;

// Parses the cookie of the exercise index, so that the user always sees the exercise he was last on
if (document.cookie.split(';').filter((item) => item.trim().startsWith('courseIndex=')).length) {
  let value = "; " + document.cookie;
  let parts = value.split("; courseIndex=");
  courseIndex = parseInt(parts.pop().split(";").shift());
} else courseIndex = 0; // If no cookie exists

// The index of the subexercise
let subexerciseIndex = 0;

// Gets called whenever the user runs their code. Compiles and runs the code. Appends the output to the output div
function runit() {
  let input = document.getElementById('textarea').value;
  document.getElementById('output').innerHTML = purify(input);
  checkSolution(input);
}

// Gets called whenever the users html code has been displayed
function checkSolution(output) {
  // Don't check the solution if the user has completed all subexercises
  if (exerciseFinished || courseIndex === 0) return;
  // If the output matches the expected output of the subexercise
  if (eval('(function() {' + htmlCourses['exercises'][courseIndex]['subexercises'][subexerciseIndex]['solutionCheck'] + '})();')) {
    document.getElementById('subExercise' + subexerciseIndex).classList.add('finishedSubexercise');
    document.getElementById('subExercise' + subexerciseIndex).classList.remove('incorrectSubexercise');
    // Set exerciseFinished to true if all subexercises have been completed
    if (subexerciseIndex === htmlCourses['exercises'][courseIndex]['subexercises'].length - 1) exerciseFinished = true;
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
  else document.getElementById('textarea').value = htmlCourses['exercises'][courseIndex]['subexercises'][subexerciseIndex]['startingCode'];
  document.getElementById('textarea').oninput();
}

// Gets called whenever the user changes the exercise. This function displays the exercises text
function displayExercise() {
  // Set the cookie for the course index to be the current course index
  document.cookie = "courseIndex=" + courseIndex + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  // Set the title of the exercise
  let exerciseTitle = document.getElementById('exerciseTitle');
  exerciseTitle.innerHTML = '<h1>' + htmlCourses['exercises'][courseIndex]['title'] + '</h1>';
  // Set the description of the exercise
  let textDiv = document.getElementById('exerciseText');
  textDiv.innerHTML = htmlCourses['exercises'][courseIndex]['description'];
  // Display all the subexercises
  for (subexercise of htmlCourses['exercises'][courseIndex]['subexercises']) textDiv.innerHTML += '<p class="subexercise" id="subExercise' + subexercise["index"] + '">' + subexercise['description'] + '</p>';
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
  document.getElementById('textarea').value = htmlCourses['exercises'][courseIndex]['subexercises'][subexerciseIndex]['solution'];
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
      let newLine = '\t'.repeat(codeArray[index].match(/(\t*)?/)[0].length) + codeArray[index].substring(length);
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
  for (course of htmlCourses['exercises']) {
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

function purify(html) {
  let illegalTags = ['script', 'noscript', 'head', 'title', 'link', 'meta'];
  let template = (new DOMParser()).parseFromString(html, 'text/html');
  for (illegalTag of illegalTags) {
    let toRemove = template.getElementsByTagName(illegalTag);
    for (element of toRemove) element.parentNode.removeChild(element);
  }
  return template.getElementsByTagName('body')[0].innerHTML;
}

// Sets the dimensions of the textarea to the dimensions of the code div, so that they mach up
function setTextareaDimensions() {
  document.getElementById('textarea').style.width = document.getElementById('code').offsetWidth + 'px';
}
