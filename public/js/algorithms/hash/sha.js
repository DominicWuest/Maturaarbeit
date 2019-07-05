/*
	Most of the variable names obey the ones from the FEDERAL INFORMATION PROCESSING STANDARDS (https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.202.pdf)
	A' is denoted as aA
*/

const b = 1600, w = 64, l = 6, nr = 12 + 2 * l;

// This function uses the SHA-3-Algorithm to hash the text input by the user
function hash(message) {
  // Creation of the byte-array
  let A = stringToState(message);
	for (let i = 0; i < nr; i++) A = keccakIteration(A, i);
  document.getElementById('hash').textContent = stateToHexString(A);
}

function keccakIteration(A, i) {
	return iota(chi(pi(rho(theta(A)))), i);
}

// Converts a State to a little endian Hex String
function stateToHexString(A) {
	let binString = stateToBinString(A);
	let hexString = '', hexElement;
	for (let i = 0; i < binString.length / 8; i++) {
    hexElement = parseInt(binString.slice(i * 8, (i + 1) * 8).split('').reverse().join(''), 2).toString(16);
    hexElement = '0'.repeat(2 - hexElement.length) + hexElement + ' ';
		hexString += hexElement;
	}
	return hexString;
}

function stateToBinString(A) {
	let laneStr = '';
	for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
			for (let z = 0; z < w; z++) laneStr += A[x][y][z].toString();
		}
	}
	return laneStr;
}

function stringToState(string) {
  let bitArray = stringToBitArray(string);
  let A = [];
  let yArr, zArr;
  for (let x = 0; x < 5; x++) {
    yArr = [];
    for (let y = 0; y < 5; y++) {
      zArr = [];
      for (let z = 0; z < w; z++) zArr.push(bitArray[w * (5 * y + x) + z]);
      yArr.push(zArr);
    }
    A.push(yArr);
  }
	return A;
}

function stringToBitArray(string) {
  let hexArray = string.split('').map((char) => char.charCodeAt(0));
  let bitArray = [1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0];
  for (hexVal of hexArray) {
    for (let i = 0; i < 4; i++) bitArray.push((hexVal >>> (3 - i)) & 0b1);
  }
	bitArray = bitPadding(bitArray.concat([0, 1]));
  return bitArray;
}

function bitPadding(arr) {
	let selectElement = document.getElementById('sha-value');
  let capacity = 2 * selectElement.selectedOptions[0].value;
  let rate = b - capacity;
  let zeros = ((-arr.length -2 % rate) + rate) % rate;
  // Padding for the rate
	arr.push(1);
  for (let i = 0; i < zeros; i++) arr.push(0);
  arr.push(1);
  // Padding for the capacity
  while (arr.length % b !== 0) arr.push(0);
	return arr;
}

// Circular left rotation
function leftRotate(num, shift) {
  return (num << shift) | (num >>> (32 - shift));
}

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
		for (let z = 0; z < w; z++) {
			zArr.push(C[(((x - 1) % 5) + 5) % 5][z] ^ C[(x + 1) % 5][(((z - 1) % w) + w) % w]);
		}
		D.push(zArr);
	}
	let aA = A, yArr;
	for (let x = 0; x < 5; x++) {
		for (let y = 0; y < 5; y++) {
			for (let z = 0; z < w; z++) aA[x][y][z] = A[x][y][z] ^ D[x][z];
		}
	}
  console.log('Theta : ' + stateToHexString(aA));
	return aA;
}

function rho(A) {
	let aA = A;
	let x = 1, y = 0, xTemp;
	for (let t = 0; t < 24; t++) {
		for (let z = 0; z < w; z++) aA[x][y][z] = A[x][y][(((z - (t + 1) * (t + 2) / 2) % w) + w) % w];
		xTemp = x;
		x = y;
		y = (2 * xTemp + 3 * y) % 5;
	}
  console.log('Rho : ' + stateToHexString(aA));
	return aA;
}

function pi(A) {
	let aA = [], yArr, zArr;
	for (let x = 0; x < 5; x++) {
		yArr = [];
		for (let y = 0; y < 5; y++) {
			zArr = [];
			for (let z = 0; z < w; z++) zArr.push(A[(x + 3 * y) % 5][x][z]);
			yArr.push(zArr);
		}
		aA.push(yArr);
	}
  console.log('Pi : ' + stateToHexString(aA));
	return aA
}

function chi(A) {
	let aA = [], yArr, zArr;
	for (let x = 0; x < 5; x++) {
		yArr = [];
		for (let y = 0; y < 5; y++) {
			zArr = [];
			for (let z = 0; z < w; z++) zArr.push(A[x][y][z] ^ ((A[(x + 1) % 5][y][z] ^ 1) & A[(x + 2) % 5][y][z]));
			yArr.push(zArr);
		}
		aA.push(yArr);
	}
  console.log('Chi : ' + stateToHexString(aA));
	return aA
}

function iota(A, i) {
	let RC = [];
	for (let j = 0; j < w; j++) RC.push(0);
	for (let j = 0; j < l; j++) RC[2 ** j - 1] = roundConstants(j + 7 * i);
	for (let z = 0; z < w; z++) A[0][0][z] ^= RC[z];
  console.log('Iota : ' + stateToHexString(A));
	return A;
}

function roundConstants(t) {
	if (t % 255 === 0) return 1;
	let R = [1, 0, 0, 0, 0, 0, 0, 0];
	for (let i = 0; i < t % 255; i++) {
		R.unshift(0);
		R[0] ^= R[8];
		R[4] ^= R[8];
		R[5] ^= R[8];
		R[6] ^= R[8];
		while (R.length !== 8) R.pop();
	}
	return R[0];
}

function rotationOffset(x, y) {

}
