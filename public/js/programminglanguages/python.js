var courseIndex; // Index of the course to be displayed

if (document.cookie.split(';').filter((item) => item.trim().startsWith('courseIndex=')).length) {
  let value = "; " + document.cookie;
  let parts = value.split("; courseIndex=");
  courseIndex = parseInt(parts.pop().split(";").shift());
} else {
  courseIndex = 0;
}

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
  if (code === pythonCourses['exercises'][courseIndex]['subexercises'][subexerciseIndex]['output']) {
    document.getElementById('subExercise' + subexerciseIndex).classList.add('finishedSubexercise');
    document.getElementById('subExercise' + subexerciseIndex).classList.remove('incorrectSubexercise');
    subexerciseIndex++;
    document.getElementById('code').value = pythonCourses['exercises'][courseIndex]['subexercises'][subexerciseIndex]['startingCode'];
  } else {
    document.getElementById('subExercise' + subexerciseIndex).classList.add('incorrectSubexercise');
  }
}

function resetSubexercise() {
  if (courseIndex === 0) document.getElementById('code').value = ''
  else document.getElementById('code').value = pythonCourses['exercises'][courseIndex]['subexercises'][subexerciseIndex]['startingCode'];
}

function displayExercise() {
  document.cookie = "courseIndex=" + courseIndex + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  var exerciseTitle = document.getElementById('exerciseTitle');
  exerciseTitle.innerHTML = '';
  var title = document.createElement('H1');
  title.appendChild(document.createTextNode(pythonCourses['exercises'][courseIndex]['title']));
  exerciseTitle.appendChild(title);
  var textDiv = document.getElementById('exerciseText');
  textDiv.innerHTML = pythonCourses['exercises'][courseIndex]['description'];
  for (subexercise of pythonCourses['exercises'][courseIndex]['subexercises']) {
    var subexerciseDiv = document.createElement('DIV');
    subexerciseDiv.classList.add('subexercise');
    subexerciseDiv.id = 'subExercise' + subexercise['index'];
    var subexerciseText = document.createElement('P');
    subexerciseText.appendChild(document.createTextNode(subexercise['description']));
    subexerciseDiv.appendChild(subexerciseText);
    textDiv.appendChild(subexerciseDiv);
  }
  if (courseIndex !== 0) {
    document.getElementsByClassName('solutionButtonDiv')[0].style.visibility = 'visible';
    document.getElementsByName('solution')[0].style.visibility = 'visible';
    document.getElementById('code').value = pythonCourses['exercises'][courseIndex]['subexercises'][0]['startingCode'];
  } else {
    document.getElementsByClassName('solutionButtonDiv')[0].style.visibility = 'hidden';
    document.getElementsByName('solution')[0].style.visibility = 'hidden';
  }
  makeDropdown();
}

function showSolution() {
  document.getElementById('code').value = pythonCourses['exercises'][courseIndex]['subexercises'][subexerciseIndex]['solution'];
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
    if (course['index'] !== courseIndex) {
      var listElement = document.createElement('LI');
      var textNode = document.createTextNode(course['title']);
      listElement.appendChild(textNode);
      listElement.id = course['index'];
      list.appendChild(listElement);
      listElement.addEventListener('click', function() {
        courseIndex = parseInt(listElement.id);
        subexerciseIndex = 0;
        displayExercise();
      });
    }
  }
}
