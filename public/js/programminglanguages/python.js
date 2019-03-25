let courseIndex; // Index of the course to be displayed

if (document.cookie.split(';').filter((item) => item.trim().startsWith('courseIndex=')).length) {
  let value = "; " + document.cookie;
  let parts = value.split("; courseIndex=");
  courseIndex = parseInt(parts.pop().split(";").shift());
} else {
  courseIndex = 0;
}

let subexerciseIndex = 0;

// output functions are configurable.  This one just appends some text
// to a pre element.
function outf(text) {
    let myPre = document.getElementById('output');
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
   let code = document.getElementById('textarea').value;
   let myPre = document.getElementById('output');
   myPre.innerHTML = '';
   if (code === '') return;
   Sk.pre = 'output';
   Sk.configure({output:outf, read:builtinRead});
   let myPromise = Sk.misceval.asyncToPromise(function() {
       return Sk.importMainWithBody('<stdin>', false, code, true);
   });
   myPromise.catch(function(err) { // Error in code
     let span = document.createElement('SPAN');
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
    document.getElementById('textarea').value = pythonCourses['exercises'][courseIndex]['subexercises'][subexerciseIndex]['startingCode'];
    document.getElementById('textarea').oninput();
  } else {
    document.getElementById('subExercise' + subexerciseIndex).classList.add('incorrectSubexercise');
  }
}

function resetSubexercise() {
  if (courseIndex === 0) document.getElementById('textarea').value = ''
  else document.getElementById('textarea').value = pythonCourses['exercises'][courseIndex]['subexercises'][subexerciseIndex]['startingCode'];
  document.getElementById('textarea').oninput();
}

function displayExercise() {
  document.cookie = "courseIndex=" + courseIndex + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  let exerciseTitle = document.getElementById('exerciseTitle');
  exerciseTitle.innerHTML = '';
  let title = document.createElement('H1');
  title.appendChild(document.createTextNode(pythonCourses['exercises'][courseIndex]['title']));
  exerciseTitle.appendChild(title);
  let textDiv = document.getElementById('exerciseText');
  textDiv.innerHTML = pythonCourses['exercises'][courseIndex]['description'];
  for (subexercise of pythonCourses['exercises'][courseIndex]['subexercises']) {
    let subexerciseDiv = document.createElement('DIV');
    subexerciseDiv.classList.add('subexercise');
    subexerciseDiv.id = 'subExercise' + subexercise['index'];
    let subexerciseText = document.createElement('P');
    subexerciseText.appendChild(document.createTextNode(subexercise['description']));
    subexerciseDiv.appendChild(subexerciseText);
    textDiv.appendChild(subexerciseDiv);
  }
  if (courseIndex !== 0) {
    document.getElementsByClassName('solutionButtonDiv')[0].style.visibility = 'visible';
    document.getElementsByName('solution')[0].style.visibility = 'visible';
    document.getElementById('textarea').value = pythonCourses['exercises'][courseIndex]['subexercises'][0]['startingCode'];
  } else {
    document.getElementsByClassName('solutionButtonDiv')[0].style.visibility = 'hidden';
    document.getElementsByName('solution')[0].style.visibility = 'hidden';
  }
  makeDropdown();
  document.getElementById('textarea').oninput();
}

function showSolution() {
  document.getElementById('textarea').value = pythonCourses['exercises'][courseIndex]['subexercises'][subexerciseIndex]['solution'];
  document.getElementById('textarea').oninput();
}

function loaded() {
  document.getElementById('textarea').addEventListener('keydown', function(event) { // Add event listener for tabs
    let caretPosition = event.target.selectionEnd;
    if (event.keyCode === 13) { // If Enter key gets pressed
      event.preventDefault();
      let textArea = document.getElementById('textarea');
      let cursorIndex = textArea.selectionStart - 1;
      let code = textArea.value;
      let colon = false;
      if (code.charAt(cursorIndex) === ':') colon = true;
      let codeArray = textArea.value.split('\n');
      let index;
      let length = cursorIndex;
      for (let i = 0; i < codeArray.length; i++) {
        let newLength = length - codeArray[i].length - 1;
        if (newLength < 0) {
          index = i;
          length++;
          break;
        }
        length = newLength;
      }
      let newLine = '\t'.repeat((' ' + codeArray[index]).substring(0, length + 1).split('\t').length + (colon ? 0 : -1)) + codeArray[index].substring(length);
      codeArray[index] = codeArray[index].substring(0, length);
      codeArray.splice(index + 1, 0, newLine);
      textArea.value = codeArray.join('\n');
      document.getElementById('textarea').oninput();
      textArea.selectionEnd = caretPosition + (codeArray[index + 1].substring(0, length).split('\t').length);
    } else if (event.keyCode === 9) { // If Tab key gets pressed
      let textArea = document.getElementById('textarea');
      let cursorIndex = textArea.selectionStart - 1;
      let code = textArea.value;
      let newCode = code.substring(0, cursorIndex + 1) + '\t' + code.substring(cursorIndex + 1, code.length);
      textArea.value = newCode;
      event.preventDefault();
      document.getElementById('textarea').oninput();
      textArea.selectionEnd = caretPosition + 1;
    }
    document.getElementById('textarea').blur();
    document.getElementById('textarea').focus();
  });
  document.getElementById('textarea').addEventListener('scroll', function(event) {
    let element = document.getElementById('code');
    console.log(event["target"]["scrollTop"])
    element.scrollLeft = event["target"]["scrollLeft"];
    element.scrollTop = event["target"]["scrollTop"];
  });
  makeDropdown();
  addHighlighting();
}

document.addEventListener('DOMContentLoaded', function(event) {
  displayExercise(0);
})

function makeDropdown() {
  let list = document.getElementById('exercisesDropdownList');
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  for (course of pythonCourses['exercises']) {
    if (course['index'] !== courseIndex) {
      let listElement = document.createElement('LI');
      let textNode = document.createTextNode(course['title']);
      listElement.appendChild(textNode);
      listElement.id = course['index'];
      list.appendChild(listElement);
      listElement.addEventListener('click', function() {
        courseIndex = parseInt(listElement.id);
        subexerciseIndex = 0;
        displayExercise();
        addHighlighting();
      });
    }
  }
}

function setTextareaDimensions() {
  document.getElementById('textarea').style.width = document.getElementById('code').offsetWidth + 'px';
  document.getElementById('textarea').style.height = document.getElementById('code').offsetHeight + 'px';
}
