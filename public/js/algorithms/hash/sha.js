/*
	Most of the variable names obey the ones from the FEDERAL INFORMATION PROCESSING STANDARDS (https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.202.pdf)
	A' is denoted as aA
*/

// The round Constants for the Keccak Algorithm
let roundConstants = [
	0x0000000000000001,
	0x000000008000808B,
	0x0000000000008082,
	0x800000000000008B,
	0x800000000000808A,
	0x8000000000008089,
	0x8000000080008000,
	0x8000000000008003,
	0x000000000000808B,
	0x8000000000008002,
	0x0000000080000001,
	0x8000000000000080,
	0x8000000080008081,
	0x000000000000800A,
	0x8000000000008009,
	0x800000008000000A,
	0x000000000000008A,
	0x8000000080008081,
	0x0000000000000088,
	0x8000000000008080,
	0x0000000080008009,
	0x0000000080000001,
	0x000000008000000A,
	0x8000000080008008
];

let w;

// This function uses the SHA-3-Algorithm to hash the text input by the user
function hash(message) {
  // Creation of the byte-array
  let A = stringToState(message);
  let hashedMsg = 0;
  document.getElementById('hash').textContent = hashedMsg;
}

function stringToState(string) {
  let bitArray = stringToBitArray(string);
  let A = [];
  w = bitArray.length / 25;
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
}

function stringToBitArray(string) {
  let byteArray = string.split('').map((char) => char.charCodeAt(0));
  let bitArray = [];
  for (byte of byteArray) {
    for (let i = 0; i < 8; i++) bitArray.push((byte >>> (7 - i)) & 0b1);
  }
	bitArray = bitPadding(bitArray);
  return bitArray;
}

function bitPadding(arr) {
	let len = arr.length;
	let selectElement = document.getElementById('sha-value');
	let neededLen = selectElement.options[selectElement.selectedIndex].value * 25;
	arr.push(1);
	while ((arr.length + 1) % neededLen !== 0) arr.push(0);
	arr.push(1);
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
	let DArr = [], zArr;
	for (let x = 0; x < 5; x++) {
		zArr = [];
		for (let z = 0; z < w; z++) zArr.push(C[(x - 1) % 5][z] ^ C[(x + 1) % 5][(z - 1) % w]);
		DArr.push(zArr);
	}
	let aA = [], yArr;
	for (let x = 0; x < 5; x++) {
		yArr = [];
		for (let y = 0; y < 5; y++) {
			zArr = [];
			for (let z = 0; z < w; z++) zArr.push(A[x][y][z] ^ D[x][z]);
			yArr.push(zArr);
		}
		aA.push(yArr);
	}
	return aA;
}

function rho(A, x, y, z) {

}

function pi(A, x, y) {
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
	return aA
}

function chi(A, x) {
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
	return aA
}

function iota(A) {

}

function rotationOffset(x, y) {

}
