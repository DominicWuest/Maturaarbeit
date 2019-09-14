// Define solution input values
let inputsASCII = ['74', '1110100', '116', 'k', '6B', '107', '&', '0100110', '38', 'o', '6F', '1101111']

// Check whether the given input matches the solution
function checkASCII(message, index) {
  // If the input matches the solution display a green background
  if (message === inputsASCII[index]) {
    document.getElementById('ASCIIextable' + index).style.backgroundColor = "green";
  }
  // If the input is wrong display a red background
  else {
    document.getElementById('ASCIIextable' + index).style.backgroundColor = "red";
  }
}
