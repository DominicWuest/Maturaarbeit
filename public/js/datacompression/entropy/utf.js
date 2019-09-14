// Define solution input values of the ASCII exercise
let inputsASCII = ['74', '1110100', '116', 'k', '6B', '107', '&', '0100110', '38', 'o', '6F', '1101111']

// Define solution input values of the ISO/IEC exercise
let inputsISOIEC = ['B6', '10110110', '182', '³', 'B3', '179', '¡', '10100001', '161', 'Â', 'C2', '11000010']


// Check whether the given input matches the solution for the ASCII exercise
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

// Check whether the given input matches the solution for the ISO/ICE exercise
function checkISOIEC(message, index) {
  // If the input matches the solution display a green background
  if (message === inputsISOIEC[index]) {
    document.getElementById('ISOIECextable' + index).style.backgroundColor = "green";
  }
  // If the input is wrong display a red background
  else {
    document.getElementById('ISOIECextable' + index).style.backgroundColor = "red";
  }
}
