var courseIndex = 0; // Index of the course to be displayed

// output functions are configurable.  This one just appends some text
// to a pre element.
function outf(text) {
    var myPre = document.getElementById("output");
    myPre.innerHTML += text;
}
function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

// grab the code from your textarea
// get a reference to your pre element for output
// configure the output function
// call Sk.importMainWithBody()
function runit() {
   var code = document.getElementById("code").value;
   var myPre = document.getElementById("output");
   myPre.innerHTML = '';
   if (code === '') return;
   Sk.pre = "output";
   Sk.configure({output:outf, read:builtinRead});
   var myPromise = Sk.misceval.asyncToPromise(function() {
       return Sk.importMainWithBody("<stdin>", false, code, true);
   });
   myPromise.catch(function(err) { // Error in code
     var span = document.createElement("SPAN");
     span.className = "error";
     span.appendChild(document.createTextNode(err.toString()));
     myPre.appendChild(span);
   });
}

function displayExercise(index) {
  var textDiv = document.getElementById("exerciseText");
  var title = document.createElement("H1");
  title.appendChild(document.createTextNode(pythonCourses["exercises"][index]["title"]));
  textDiv.appendChild(title);
  var exerciseText = document.createElement("P");
  exerciseText.appendChild(document.createTextNode(pythonCourses["exercises"][index]["description"]));
  textDiv.appendChild(exerciseText);
  if (index !== 0) document.getElementsByName("solution")[0].style.visibility = "visible";
}

function showSolution() {

}

document.addEventListener('DOMContentLoaded', function(event) {
  displayExercise(0);
})
