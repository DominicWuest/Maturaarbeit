// Declaration of constants for the MD5-Hashing algorithm
const constants = [];

for (let i = 1; i <= 64; i++) {
  constants.push(Math.floor(Math.abs(Math.sin(i)) * 2 ** 32));
}

// Declaration of functions needed for the MD5-Hashing algorithm
let F = (X, Y, Z) => X & Y | ~X & Z;
let G = (X, Y, Z) => X & Z | Y & ~Z;
let H = (X, Y, Z) => X ^ Y ^ Z;
let I = (X, Y, Z) => Y ^ (X | ~Z);

// This function uses the MD5-Hashing algorithm to hash the text input by the user
function hash(message) {
  // Creation of the byte-array
  let bytes = [];
  // Push the character codes of the input
  for (let i = 0; i < message.length; i++) bytes.push(message.charCodeAt(i));
  // Push the padding bit
  bytes.push(1 << 7);
  // Push the padding
  let length = bytes.length * 8;
  while (length % 512 != 448) {
    bytes.push(0);
    length += 8;
  }
  // Push a 64-bit representation of the input length in bits
  let msgLen = message.length * 8;
  for (let i = 0; i < 8; i++) {
    bytes.push(msgLen & 0xFF);
    msgLen >>= 8;
  }
  // Creation of the word-array
  let words = [];
  for (let i = bytes.length - 1; i > 0; i -= 4) {
    let word = 0;
    for (let j = 0; j < 4; j++) {
      word <<= 8;
      word |= bytes[i - j]
    }
    words.unshift(word);
  }
  // Declaration of starting-values
  let a0 = 0x67452301;
  let b0 = 0xEFCDAB89;
  let c0 = 0x98BADCFE;
  let d0 = 0x10325476;
  console.log(words);
  // Declaration of starting values to be changed
  let a = a0, b = b0, c = c0, d = d0;
  // Doing all iterations for the hashing algorithm
  for (let startingWordIndex = 0; startingWordIndex < words.length; startingWordIndex += 16) {
    let a = a0, b = b0, c = c0, d = d0;
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        switch (i % 4) {
          case 0: a = iterate(a, b, c, d, F, words[startingWordIndex + i], 7, constants[i]); break;
          case 1: d = iterate(d, a, b, c, F, words[startingWordIndex + i], 12, constants[i]); break;
          case 2: c = iterate(c, d, a, b, F, words[startingWordIndex + i], 17, constants[i]); break;
          case 3: b = iterate(b, c, d, a, F, words[startingWordIndex + i], 22, constants[i]); break;
        }
      } else if (i < 32) {
        switch (i % 4) {
          case 0: a = iterate(a, b, c, d, G, words[startingWordIndex + (5 * i + 1) % 16], 5, constants[i]); break;
          case 1: d = iterate(d, a, b, c, G, words[startingWordIndex + (5 * i + 1) % 16], 9, constants[i]); break;
          case 2: c = iterate(c, d, a, b, G, words[startingWordIndex + (5 * i + 1) % 16], 14, constants[i]); break;
          case 3: b = iterate(b, c, d, a, G, words[startingWordIndex + (5 * i + 1) % 16], 20, constants[i]); break;
        }
      } else if (i < 48) {
        switch (i % 4) {
          case 0: a = iterate(a, b, c, d, H, words[startingWordIndex + (3 * i + 5) % 16], 4, constants[i]); break;
          case 1: d = iterate(d, a, b, c, H, words[startingWordIndex + (3 * i + 5) % 16], 11, constants[i]); break;
          case 2: c = iterate(c, d, a, b, H, words[startingWordIndex + (3 * i + 5) % 16], 16, constants[i]); break;
          case 3: b = iterate(b, c, d, a, H, words[startingWordIndex + (3 * i + 5) % 16], 23, constants[i]); break;
        }
      } else {
        switch (i % 4) {
          case 0: a = iterate(a, b, c, d, I, words[startingWordIndex + (7 * i) % 16], 6, constants[i]); break;
          case 1: d = iterate(d, a, b, c, I, words[startingWordIndex + (7 * i) % 16], 10, constants[i]); break;
          case 2: c = iterate(c, d, a, b, I, words[startingWordIndex + (7 * i) % 16], 15, constants[i]); break;
          case 3: b = iterate(b, c, d, a, I, words[startingWordIndex + (7 * i) % 16], 21, constants[i]); break;
        }
      }
    }
    a0 += a; b0 += b; c0 += c; d0 += d;
  }
  // Creating the hashed string and assigning it to the textContent of the output
  let hashedArr = [];
  hashedArr = hashedArr.concat(toLittleEndianStr(a0 % 2 ** 32));
  hashedArr = hashedArr.concat(toLittleEndianStr(b0 % 2 ** 32));
  hashedArr = hashedArr.concat(toLittleEndianStr(c0 % 2 ** 32));
  hashedArr = hashedArr.concat(toLittleEndianStr(d0 % 2 ** 32));
  document.getElementById('hash').textContent = hashedArr.reduce((str, cur) => str += cur);
}

function iterate(a, b, c, d, func, word, shift, constant) {
  return ((b + leftRotate(a + func(b, c, d) + word + constant, shift)) % 2 ** 32);
}

function leftRotate(num, shift) {
  return (num << shift) | (num >>> (32 - shift));
}

function toLittleEndianStr(num) {
  let arr = [];
  for (let i = 0; i < 4; i++) {
    let part = (num >>> i * 8 & 0xFF).toString(16);
    part = '0'.repeat(2 - part.length) + part;
    arr.push(part);
  }
  return arr;
}
