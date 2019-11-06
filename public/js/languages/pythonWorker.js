/**
 * This file is used to asynchronously run Python code. Because of this, an infinite loop doesn't break the page, since it can now be detected.
 * It sends back the output of the Python code.
 */

// Import the scripts used to compile and run Python code
importScripts('./skulpt.min.js', './skulpt-stdlib.js');

// String of what the output is
let textContent = '';

// The onmessage event gets triggered by python.js and sends the code written by the user (message["data"])
/*

  The message is in the following format:
  {
    output : *The output of the program*
    error : *A boolean indicating whether the program returned an error*
  }

*/
onmessage = function(message) {
  // If there is no code, send back an empty string
  if (message["data"] === '') postMessage('');
  // Compile and run code
  Sk.pre = 'output';
  Sk.configure({output:outf, read:builtinRead});
  let myPromise = Sk.misceval.asyncToPromise(function() {
      return Sk.importMainWithBody('<stdin>', false, message["data"], true);
  });
  // Code succesfully run
  myPromise.then(function(suc) {
    // Send back the output
    postMessage({output : textContent, error : false});
  })
  // There is an error in the code
  .catch(function(err) {
    // Send back the error message
    postMessage({output : err.toString(), error : true});
  });
}

// New output
function outf(text) {
  // Append output to the output to be sent
  textContent += text;
}

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x] === undefined)
            throw "File not found: '" + x + "'";
    return Sk.builtinFiles['files'][x];
}
