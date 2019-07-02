/*
	Most of the variable names obey the ones from the FEDERAL INFORMATION PROCESSING STANDARDS (https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.202.pdf)
	A' is denoted as aA
*/

let w, l;

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
	l = Math.log(w) / Math.log(2);
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
	let aA = A;
	let x = 1, y = 0, xTemp;
	for (let t = 0; t < 23; t++) {
		for (let z = 0; z < w; z++) aA[x][y][z] = A[x][y][(z - (t + 1) * (t + 2) / 2) % w];
		xTemp = x;
		x = y;
		y = (2 * xTemp + 3 * y) % 5;
	}
	return aA;
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

function iota(A, i) {
	let RC = [];
	for (let j = 0; j < w; j++) RC.push(0);
	for (let j = 0; j < l; j++) RC[2 ** j - 1] = roundConstants(j + 7 * i);
	for (let z = 0; z < w; z++) A[0][0][z] ^= RC[z];
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
