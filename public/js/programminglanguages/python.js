var courseIndex = 0; // Index of the course to be displayed
var subexerciseIndex = 0;

// output functions are configurable.  This one just appends some text
// to a pre element.
function outf(text) {
    var myPre = document.getElementById('output');
    myPre.innerHTML += text;
}

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x] === undefined)
            throw "File not found: '" + x + "'";
    return Sk.builtinFiles['files'][x];
}

// grab the code from your textarea
// get a reference to your pre element for output
// configure the output function
// call Sk.importMainWithBody()
function runit() {
   var code = document.getElementById('code').value;
   var myPre = document.getElementById('output');
   myPre.innerHTML = '';
   if (code === '') return;
   Sk.pre = 'output';
   Sk.configure({output:outf, read:builtinRead});
   var myPromise = Sk.misceval.asyncToPromise(function() {
       return Sk.importMainWithBody('<stdin>', false, code, true);
   });
   myPromise.catch(function(err) { // Error in code
     var span = document.createElement('SPAN');
     span.classList.add('error');
     span.appendChild(document.createTextNode(err.toString()));
     myPre.appendChild(span);
   });
   checkSolution(myPre.innerHTML.trim());
}

function checkSolution(code) {
  console.log(code === pythonCourses['exercises'][courseIndex]['subexercises'][subexerciseIndex]['output']);
  if (code === pythonCourses['exercises'][courseIndex]['subexercises'][subexerciseIndex]['output']) {
    document.getElementById(subexerciseIndex).classList.add('finishedSubexercise');
    document.getElementById(subexerciseIndex).classList.remove('incorrectSubexercise');
    subexerciseIndex++;
  } else {
    document.getElementById(subexerciseIndex).classList.add('incorrectSubexercise');
  }
}

function resetSubexercise() {
  if (courseIndex === -1) document.getElementById('code').value = ''
  else document.getElementById('code').value = pythonCourses['exercises'][courseIndex]['subexercises'][subexerciseIndex]['startingCode'];
}

function displayExercise(index) {
  var exerciseTitle = document.getElementById('exerciseTitle');
  var title = document.createElement('H1');
  title.appendChild(document.createTextNode(pythonCourses['exercises'][index]['title']));
  exerciseTitle.appendChild(title);
  var textDiv = document.getElementById('exerciseText');
  var exerciseText = document.createElement('P');
  exerciseText.appendChild(document.createTextNode(pythonCourses['exercises'][index]['description']));
  textDiv.appendChild(exerciseText);
  for (subexercise of pythonCourses['exercises'][index]['subexercises']) {
    var subexerciseDiv = document.createElement('DIV');
    subexerciseDiv.classList.add('subexercise');
    subexerciseDiv.id = subexercise['index'];
    var subexerciseText = document.createElement('P');
    subexerciseText.appendChild(document.createTextNode(subexercise['description']));
    subexerciseDiv.appendChild(subexerciseText);
    textDiv.appendChild(subexerciseDiv);
  }
  if (index !== -1) {
    document.getElementsByName('solution')[0].style.visibility = 'visible';
    document.getElementById('code').value = pythonCourses['exercises'][index]['subexercises'][0]['startingCode'];
  }
}

function showSolution() {
  var textArea = document.getElementById('code');
  textArea.value = pythonCourses['exercises'][courseIndex]['subexercises'][subexerciseIndex]['solution'];
  document.getElementById(subexerciseIndex).classList.add('finishedSubexercise');
  document.getElementById(subexerciseIndex).classList.remove('incorrectSubexercise');
  if (subexerciseIndex < pythonCourses['exercises'][courseIndex]['subexercises'].length - 1) subexerciseIndex++;
}

function loaded() {
  document.getElementById('code').addEventListener('keydown', function(event) { // Add event listener for tabs
    if (event.keyCode === 13) {
      var textArea = document.getElementById('code');
      var cursorIndex = textArea.selectionStart - 1;
      var code = textArea.value;
      if (code.charAt(cursorIndex) === ':') {
        var newCode = code.substring(0, cursorIndex + 1) + '\n\t' + code.substring(cursorIndex + 1, code.length);
        textArea.value = newCode;
        event.preventDefault();
      }
    } else if (event.keyCode === 9) {
      var textArea = document.getElementById('code');
      var cursorIndex = textArea.selectionStart - 1;
      var code = textArea.value;
      var newCode = code.substring(0, cursorIndex + 1) + '\t' + code.substring(cursorIndex + 1, code.length);
      textArea.value = newCode;
      event.preventDefault();
    }
  });
  makeDropdown();
}

document.addEventListener('DOMContentLoaded', function(event) {
  displayExercise(0);
})

function makeDropdown() {
  var list = document.getElementById('exercisesDropdownList');
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  for (course of pythonCourses['exercises']) {
      if (course['index'] !== -1) {
      var listElement = document.createElement('LI');
      var textNode = document.createTextNode(course['title']);
      listElement.appendChild(textNode);
      list.appendChild(listElement);
    }
  }
}
