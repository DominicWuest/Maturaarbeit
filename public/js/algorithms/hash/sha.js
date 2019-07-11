/*
	Most of the variable names are identical to the ones from the FEDERAL INFORMATION PROCESSING STANDARDS (NIST) (https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.202.pdf)
	A' is denoted as aA
  For more information about the meaning of certain variables, visit the aforementioned site
*/

// Constants for the algorithm
const b = 1600, w = 64, l = 6, nr = 12 + 2 * l;

// How long the hash value (in bits) is going to be
let outputLength;

// This function uses the SHA-3-Algorithm to hash the text input by the user
function hash(message) {
  // Set the output length to the selected value
  outputLength = document.getElementById('sha-value').selectedOptions[0].value;
  let A;
  // The message in bits with the SHA3 suffix 01 appended to it
  let inputBits = stringToBitArray(message).concat([0, 1]);
  // An array of the chunks which will be used to make the states
  let chunks = [];
  // Break message into chunks of 2 * outputLength bits (i.e. the rate)
  for (let i = 0; i < Math.floor(inputBits.length / (b - 2 * outputLength)) + 1; i++) chunks.push(inputBits.slice(i * (b - 2 * outputLength), (i + 1) * (b - 2 * outputLength)));
  // Iterate over all chunks
  for (chunk of chunks) {
    let aA = messageBitsToState(chunk);
    // If it isn't the first chunk, XOR the new state with the old state
    if (A) {
      for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
          for (let z = 0; z < w; z++) aA[x][y][z] ^= A[x][y][z];
        }
      }
    }
    A = aA;
    // Performing all five step mappings on the state nr times
  	for (let i = 0; i < nr; i++) A = keccakRound(A, i);
  }
  // Set the textContent of the hash paragraph to the generated hash value to let the user see what his hashed message is
  document.getElementById('hash').textContent = stateToLittleEndianHexString(A).slice(0, outputLength / 4);
}

// Returns the state after modifying the state with all five step mappings
let keccakRound = (A, i) => iota(chi(pi(rho(theta(A)))), i);

// Converts a State to a little endian Hex String
function stateToLittleEndianHexString(A) {
  // Create the binary string of the state
	let binString = stateToBinString(A);
	let hexString = '', hexElement;
  // Iterate over all bytes of the binary string
	for (let i = 0; i < binString.length / 8; i++) {
    // Convert the byte from binary to hex and reverse it since it is in big-endian
    hexElement = parseInt(binString.slice(i * 8, (i + 1) * 8).split('').reverse().join(''), 2).toString(16);
    // Unnshift zeros if the hexElement's length is smaller than two, since preceding zeros get deleted
    hexElement = '0'.repeat(2 - hexElement.length) + hexElement;
		hexString += hexElement;
	}
	return hexString;
}

// Converts a state to a binary string
function stateToBinString(A) {
	let laneStr = '';
	for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) laneStr += A[x][y].reduce((sum, cur) => sum + cur.toString());
	}
	return laneStr;
}

// Converts the bitArray parameter to a state. The bitArray holds the bits of a part of the message or the whole message if its length is smaller than the rate.
function messageBitsToState(bitArray) {
  // Pad the array
  let aA = bitPadding(bitArray);
  // Create a new state after rules specified in NIST
  let A = [];
  let yArr, zArr;
  for (let x = 0; x < 5; x++) {
    yArr = [];
    for (let y = 0; y < 5; y++) {
      zArr = [];
      for (let z = 0; z < w; z++) zArr.push(aA[w * (5 * y + x) + z]);
      yArr.push(zArr);
    }
    A.push(yArr);
  }
	return A;
}

// Converts a string to a bit-array
function stringToBitArray(string) {
  // The array holding the string as a bit-array
  let bitArray = [];
  // Iterate over every character inside the string
  for (character of string) {
    // Create the little endian bit representation of the string
    let bitString = character.charCodeAt(0).toString(2).split('').reverse().join('');
    // Pad the bitstring
    while (bitString.length < 8) bitString += '0';
    // Push every parsed bit to the bit array
    for (bit of bitString) bitArray.push(parseInt(bit, 2));
  }
  return bitArray;
}

// Executes the pad10*1 function on the parameter arr
function bitPadding(arr) {
  let capacity = 2 * outputLength;
  let rate = b - capacity;
  if (arr.length !== rate) {
    let zeros = (((-arr.length -2) % rate) + rate) % rate;
    // Padding for the rate
  	arr.push(1);
    for (let i = 0; i < zeros; i++) arr.push(0);
    arr.push(1);
  }
  // Padding for the capacity
  while (arr.length % b !== 0) arr.push(0);
	return arr;
}

// The first function of the five step mapping
function theta(A) {
	let C = [], CArr, num;
	for (let x = 0; x < 5; x++) {
		CArr = [];
		for (let z = 0; z < w; z++) {
			num = 0;
			for (let y = 0; y < 5; y++) num ^= A[x][y][z];
			CArr.push(num);
		}
		C.push(CArr);
	}
	let D = [], zArr;
	for (let x = 0; x < 5; x++) {
		zArr = [];
		for (let z = 0; z < w; z++) zArr.push(C[(((x - 1) % 5) + 5) % 5][z] ^ C[(x + 1) % 5][(((z - 1) % w) + w) % w]);
		D.push(zArr);
	}
  // Make a deep copy of A
	let aA = JSON.parse(JSON.stringify(A));
	for (let x = 0; x < 5; x++) {
		for (let y = 0; y < 5; y++) {
			for (let z = 0; z < w; z++) aA[x][y][z] = A[x][y][z] ^ D[x][z];
		}
	}
	return aA;
}

// The second function of the five step mapping
function rho(A) {
  // Make a deep copy of A
	let aA = JSON.parse(JSON.stringify(A));
	let x = 1, y = 0, xTemp;
	for (let t = 0; t < 24; t++) {
		for (let z = 0; z < w; z++) aA[x][y][(z + (t + 1) * (t + 2) / 2) % w] = A[x][y][z];
		xTemp = x;
		x = y;
		y = (2 * xTemp + 3 * y) % 5;
	}
	return aA;
}

// The third function of the five step mapping
function pi(A) {
  // Make a deep copy of A
	let aA = JSON.parse(JSON.stringify(A));
	for (let x = 0; x < 5; x++) {
		for (let y = 0; y < 5; y++) {
			for (let z = 0; z < w; z++) aA[x][y][z] = A[(x + 3 * y) % 5][x][z];
		}
	}
	return aA
}

// The fourth function of the five step mapping
function chi(A) {
  // Make a deep copy of A
	let aA = JSON.parse(JSON.stringify(A));
	for (let x = 0; x < 5; x++) {
		for (let y = 0; y < 5; y++) {
			for (let z = 0; z < w; z++) aA[x][y][z] ^= (A[(x + 1) % 5][y][z] ^ 1) & A[(x + 2) % 5][y][z];
		}
	}
	return aA
}

// The fifth function of the five step mapping
function iota(A, i) {
	let RC = [];
	for (let j = 0; j < w; j++) RC.push(0);
	for (let j = 0; j < l + 1; j++) RC[2 ** j - 1] = roundConstants(j + 7 * i);
	for (let z = 0; z < w; z++) A[0][0][z] ^= RC[z];
	return A;
}

// Returns a bit based on how many times the five step mapping has been performed. Used by iota
function roundConstants(t) {
	if (t % 255 === 0) return 1;
	let R = [1, 0, 0, 0, 0, 0, 0, 0];
	for (let i = 0; i < t % 255; i++) {
		R.unshift(0);
		R[0] ^= R[8];
		R[4] ^= R[8];
		R[5] ^= R[8];
		R[6] ^= R[8];
		R.pop();
	}
	return R[0];
}
