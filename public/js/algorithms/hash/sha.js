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

// This function uses the SHA-3-Algorithm to hash the text input by the user
function hash(message) {
  // Creation of the byte-array
  let A = stringToState(message);
  let hashedMsg = 0;
  document.getElementById('hash').textContent = hashedMsg;
}

function stringToState(string) {
  let bitArray = stringToBitArray(string);
  let zeroArray = [];
  for (let i = 0; i < 25 - ((bitArray.length + 2) % 25); i++) zeroArray.push(0);
  bitArray = bitArray.concat([1], zeroArray, [1]);
  let A = [];
  let w = bitArray.length / 25;
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
  return bitArray;
}

// Circular left rotation
function leftRotate(num, shift) {
  return (num << shift) | (num >>> (32 - shift));
}

function theta(a, x, y, z) {
  let sumIndeces = [0, 1, 2, 3, 4];
  return a[x][y][z] ^ sumIndeces.reduce((index, sum) => sum ^ a[x - 1][index][z]) ^ sumIndeces.reduce((index, sum) => sum ^ a[x + 1][index][z - 1]);
}

function rho(a, x, y, z) {

}

function pi(a, x, y) {

}

function chi(a, x) {

}

function iota(a) {

}

function rotationOffset(x, y) {

}
