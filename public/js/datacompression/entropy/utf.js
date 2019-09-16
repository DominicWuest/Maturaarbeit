// Define solution input values of the ASCII exercise
let inputsASCII = [['NUL', '00', '0000000', '0'], ['SOH', '01', '0000001', '1'], ['STX', '02', '0000010', '2'], ['ETX', '03', '0000011', '3'], ['EOT', '04', '0000100', '4'], ['ENQ', '05', '0000101', '5'], ['ACK', '06', '0000110', '6'], ['BEL', '07', '0000111', '7'], ['BS', '08', '0001000', '8'], ['HT', '09', '0001001', '9'], ['LF', '0A', '0001010', '10'], ['VT', '0B', '0001011', '11'], ['FF', '0C', '0001100', '12'], ['CR', '0D', '0001101', '13'], ['SO', '0E', '0001110', '14'], ['SI', '0F', '0001111', '15'], ['DLE', '10', '0010000', '16'], ['DC1', '11', '0010001', '17'], ['DC2', '12', '0010010', '18'], ['DC3', '13', '0010011', '19'], ['DC4', '14', '0010100', '20'], ['NAK', '15', '0010101', '21'], ['SYN', '16', '0010110', '22'], ['ETB', '17', '0010111', '23'], ['CAN', '18', '0011000', '24'], ['EM', '19', '0011001', '25'], ['SUB', '1A', '0011010', '26'], ['ESC', '1B', '0011011', '27'], ['FS', '1C', '0011100', '28'], ['GS', '1D', '0011101', '29'], ['RS', '1E', '0011110', '30'], ['US', '1F', '0011111', '31'], ['SP', '20', '0100000', '32'], ['!', '21', '0100001', '33'], ['"', '22', '0100010', '34'], ['#', '23', '0100011', '35'], ['$', '24', '0100100', '36'], ['%', '25', '0100101', '37'], ['&', '26', '0100110', '38'], ['(', '28', '0101000', '40'], [')', '29', '0101001', '41'], ['*', '2A', '0101010', '42'], ['+', '2B', '0101011', '43'], [',', '2C', '0101100', '44'], ['-', '2D', '0101101', '45'], ['.', '2E', '0101110', '46'], ['/', '2F', '0101111', '47'], ['0', '30', '0110000', '48'], ['1', '31', '0110001', '49'], ['2', '32', '0110010', '50'], ['3', '33', '0110011', '51'], ['4', '34', '0110100', '52'], ['5', '35', '0110101', '53'], ['6', '36', '0110110', '54'], ['7', '37', '0110111', '55'], ['8', '38', '0111000', '56'], ['9', '39', '0111001', '57'], [':', '3A', '0111010', '58'], [';', '3B', '0111011', '59'], ['<', '3C', '0111100', '60'], ['=', '3D', '0111101', '61'], ['>', '3E', '0111110', '62'], ['?', '3F', '0111111', '63'], ['@', '40', '1000000', '64'], ['A', '41', '1000001', '65'], ['B', '42', '1000010', '66'], ['C', '43', '1000011', '67'], ['D', '44', '1000100', '68'], ['E', '45', '1000101', '69'], ['F', '46', '1000110', '70'], ['G', '47', '1000111', '71'], ['H', '48', '1001000', '72'], ['I', '49', '1001001', '73'], ['J', '4A', '1001010', '74'], ['K', '4B', '1001011', '75'], ['L', '4C', '1001100', '76'], ['M', '4D', '1001101', '77'], ['N', '4E', '1001110', '78'], ['O', '4F', '1001111', '79'], ['P', '50', '1010000', '80'], ['Q', '51', '1010001', '81'], ['R', '52', '1010010', '82'], ['S', '53', '1010011', '83'], ['T', '54', '1010100', '84'], ['U', '55', '1010101', '85'], ['V', '56', '1010110', '86'], ['W', '57', '1010111', '87'], ['X', '58', '1011000', '88'], ['Y', '59', '1011001', '89'], ['Z', '5A', '1011010', '90'] ['[', '5B', '1011011', '91'], [']', '5D', '1011101', '93'], ['^', '5E', '1011110', '94'], ['_', '5F', '1011111', '95'], ['`', '60', '1100000', '96'], ['a', '61', '1100001', '97'], ['b', '62', '1100010', '98'], ['c', '63', '1100011', '99'], ['d', '64', '1100100', '100'], ['e', '65', '1100101', '101'], ['f', '66', '1100110', '102'], ['g', '67', '1100111', '103'], ['h', '68', '1101000', '104'], ['i', '69', '1101001', '105'], ['j', '6A', '1101010', '106'], ['k', '6B', '1101011', '107'], ['l', '6C', '1101100', '108'], ['m', '6D', '1101101', '109'], ['n', '6E', '1101110', '110'], ['o', '6F', '1101111', '111'], ['p', '70', '1110000', '112'], ['q', '71', '1110001', '113'], ['r', '72', '1110010', '114'], ['s', '73', '1110011', '115'], ['t', '74', '1110100', '116'], ['u', '75', '1110101', '117'], ['v', '76', '1110110', '118'], ['w', '77', '1110111', '119'], ['x', '78', '1111000', '120'], ['y', '79', '1111001', '121'], ['z', '7A', '1111010', '122'], ['{', '7B', '1111011', '123'], ['|', '7C', '1111100', '124'], ['}', '7D', '1111101', '125'], ['~', '7E', '1111110', '126'], ['DEL', '7F', '1111111', '127']];

// Define solution input values of the ISO/IEC exercise
let inputsISOIEC = [['SP', '20', '00100000', '32'], ['!', '21', '00100001', '33'], ['"', '22', '00100010', '34'], ['#', '23', '00100011', '35'], ['$', '24', '00100100', '36'], ['%', '25', '00100101', '37'], ['&', '26', '00100110', '38'], ['(', '28', '00101000', '40'], [')', '29', '00101001', '41'], ['*', '2A', '00101010', '42'], ['+', '2B', '00101011', '43'], [',', '2C', '00101100', '44'], ['-', '2D', '00101101', '45'], ['.', '2E', '00101110', '46'], ['/', '2F', '00101111', '47'], ['0', '30', '0110000', '48'], ['1', '31', '00110001', '49'], ['2', '32', '00110010', '50'], ['3', '33', '00110011', '51'], ['4', '34', '00110100', '52'], ['5', '35', '00110101', '53'], ['6', '36', '00110110', '54'], ['7', '37', '00110111', '55'], ['8', '38', '00111000', '56'], ['9', '39', '00111001', '57'], [':', '3A', '00111010', '58'], [';', '3B', '00111011', '59'], ['<', '3C', '00111100', '60'], ['=', '3D', '00111101', '61'], ['>', '3E', '00111110', '62'], ['?', '3F', '00111111', '63'], ['@', '40', '01000000', '64'], ['A', '41', '01000001', '65'], ['B', '42', '01000010', '66'], ['C', '43', '01000011', '67'], ['D', '44', '01000100', '68'], ['E', '45', '01000101', '69'], ['F', '46', '01000110', '70'], ['G', '47', '01000111', '71'], ['H', '48', '01001000', '72'], ['I', '49', '01001001', '73'], ['J', '4A', '01001010', '74'], ['K', '4B', '01001011', '75'], ['L', '4C', '01001100', '76'], ['M', '4D', '01001101', '77'], ['N', '4E', '01001110', '78'], ['O', '4F', '01001111', '79'], ['P', '50', '01010000', '80'], ['Q', '51', '01010001', '81'], ['R', '52', '01010010', '82'], ['S', '53', '01010011', '83'], ['T', '54', '01010100', '84'], ['U', '55', '01010101', '85'], ['V', '56', '01010110', '86'], ['W', '57', '01010111', '87'], ['X', '58', '01011000', '88'], ['Y', '59', '01011001', '89'], ['Z', '5A', '01011010', '90'] ['[', '5B', '01011011', '91'], [']', '5D', '01011101', '93'], ['^', '5E', '01011110', '94'], ['_', '5F', '01011111', '95'], ['`', '60', '01100000', '96'], ['a', '61', '01100001', '97'], ['b', '62', '01100010', '98'], ['c', '63', '01100011', '99'], ['d', '64', '01100100', '100'], ['e', '65', '01100101', '101'], ['f', '66', '01100110', '102'], ['g', '67', '01100111', '103'], ['h', '68', '01101000', '104'], ['i', '69', '01101001', '105'], ['j', '6A', '01101010', '106'], ['k', '6B', '01101011', '107'], ['l', '6C', '01101100', '108'], ['m', '6D', '01101101', '109'], ['n', '6E', '01101110', '110'], ['o', '6F', '01101111', '111'], ['p', '70', '01110000', '112'], ['q', '71', '01110001', '113'], ['r', '72', '01110010', '114'], ['s', '73', '01110011', '115'], ['t', '74', '01110100', '116'], ['u', '75', '01110101', '117'], ['v', '76', '01110110', '118'], ['w', '77', '01110111', '119'], ['x', '78', '01111000', '120'], ['y', '79', '01111001', '121'], ['z', '7A', '01111010', '122'], ['{', '7B', '01111011', '123'], ['|', '7C', '01111100', '124'], ['}', '7D', '01111101', '125'], ['~', '7E', '01111110', '126'], ['NBSP', 'A0', '10100000', '160'], ['¡', 'A1', '10100001', '161'], ['¢', 'A2', '10100010', '162'], ['£', 'A3', '10100011', '163'], ['¤', 'A4', '10100100', '164'], ['¥', 'A5', '10100101', '165'], ['¦', 'A6', '10100110', '166'], ['§', 'A7', '10100111', '167'], ['¨', 'A8', '10101000', '168'], ['©', 'A9', '10101001', '169'], ['ª', 'AA', '10101010', '170'], ['«', 'AB', '10101011', '171'], ['SHY', 'AD', '10101101', '173'], ['®', 'AE', '10101110', '174'], ['¯', 'AF', '10101111', '175'], ['°', 'B0', '10110000', '176'], ['²', 'B2', '10110010', '178'], ['³', 'B3', '10110011', '179'], ['´', 'B4', '10110100', '180'], ['µ', 'B5', '10110101', '181'], ['¶', 'B6', '10110110', '182'], ['·', 'B7', '10110111', '183'], ['¸', 'B8', '10111000', '184'], ['¹', 'B9', '10111001', '185'], ['º', 'BA', '10111010', '186'], ['»', 'BB', '10111011', '187'], ['¼', 'BC', '10111100', '188'], ['½', 'BD', '10111101', '189'], ['¾', 'BE', '10111110', '190'], ['¿', 'BF', '10111111', '191'], ['À', 'C0', '11000000', '192'], ['Á', 'C1', '11000001', '193'], ['Â', 'C2', '11000010', '194'], ['Ã', 'C3', '11000011', '195'], ['Ä', 'C4', '11000100', '196'], ['Å', 'C5', '11000101', '197'], ['Æ', 'C6', '11000110', '198'], ['Ç', 'C7', '11000111', '199'], ['È', 'C8', '11001000', '200'], ['É', 'C9', '11001001', '201'], ['Ê', 'CA', '11001010', '202'], ['Ë', 'CB', '11001011', '203'], ['Ì', 'CC', '11001100', '204'], ['Í', 'CD', '11001101', '205'], ['Î', 'CE', '11001110', '206'], ['Ï', 'CF', '11001111', '207'], ['Ð', 'D0', '11010000', '208'], ['Ñ', 'D1', '11010001', '209'], ['Ò', 'D2', '11010010', '210'], ['Ó', 'D3', '11010011', '211'], ['Ô', 'D4', '11010100', '212'], ['Õ', 'D5', '11010101', '213'], ['Ö', 'D6', '11010110', '214'], ['×', 'D7', '11010111', '215'], ['Ø', 'D8', '11011000', '216'], ['Ù', 'D9', '11011001', '217'], ['Ú', 'DA', '11011010', '218'], ['Û', 'DB', '11011011', '219'], ['Ü', 'DC', '11011100', '220'], ['Ý', 'DD', '11011101', '221'], ['Þ', 'DE', '11011110', '211'], ['ß', 'DF', '11011111', '223'], ['à', 'E0', '11100000', '224'], ['á', 'E1', '11100001', '225'], ['â', 'E2', '11100010', '226'], ['ã', 'E3', '11100011', '227'], ['ä', 'E4', '11100100', '228'], ['å', 'E5', '11100101', '229'], ['æ', 'E6', '11100110', '230'], ['ç', 'E7', '11100111', '231'], ['è', 'E8', '11101000', '232'], ['é', 'E9', '11101001', '233'], ['ê', 'EA', '11101010', '234'], ['ë', 'EB', '11101011', '235'], ['ì', 'EC', '111011010', '236'], ['í', 'ED', '11101101', '237'], ['î', 'EE', '11101110', '238'], ['ï', 'EF', '11101111', '239'], ['ð', 'F0', '11110000', '240'], ['ñ', 'F1', '11110001', '241'], ['ò', 'F2', '11110020', '242'], ['ó', 'F3', '11110011', '243'], ['ô', 'F4', '11110400', '244'], ['õ', 'F5', '11110101', '245'], ['ö', 'F6', '11110110', '246'], ['÷', 'F7', '11110111', '247'], ['ø', 'F8', '11111000', '248'], ['ù', 'F9', '11111001', '249'], ['ú', 'FA', '11111010', '250'], ['û', 'FB', '11111011', '251'], ['ü', 'FC', '11111100', '252'], ['ý', 'FD', '11111101', '253'], ['þ', 'FF', '11111110', '254'], ['ÿ', 'FF', '11111111', '255']];

// Define input values for utf-8 exercise with random decimals
let inputsUTF8 = range(0, 500000, 5, 1050);

// Define input values for utf-16 exercise with random decimals
let inputsUTF16 = range(0, 500000, 100, 30);

// Random integer to select which sign is to be solved
let randSign;

// Random integer to select which slot is given
let randSlot;

// Storage of indexes of displayed sign in ASCII
let randSignListASCII = [];

// Storage of indexes of displayed sign in ISOIEC
let randSignListISOIEC = [];

// Storage of indexes of dispayed number in utf-8
let randNumListUTF8 = [];

// Storage of indexes of dispayed number in utf-16
let randNumListUTF16 = [];

// Helps to build input arrays
function range(start, end, multiplier, higher) {
  ans = [];
  for (let i = 0; (i * 100 + 1) * multiplier < end; i++) {
    if (i < higher) ans.push([(Math.floor((i + 1 - Math.random()) * multiplier)).toString(10)]);
    else ans.push([(Math.floor((i * 100 + 1 - Math.random()) * multiplier)).toString(10)]);
  }
  return ans;
}

// Setup all exercises
function displayExercise(n) {
  inputsUTF8 = GenUTF8(inputsUTF8);
  inputsUTF16 = GenUTF16(inputsUTF16);
  for (let i = 0; i < n; i++) {
    displayASCII(i * 4);
    displayISOIEC(i * 4);
    displayUTF8(i * 4);
    displayUTF16(i * 4);
  }
}

// Display the given content in the exercise of ASCII
function displayASCII(startingIndex) {
  randSign = Math.round(Math.random() * (inputsASCII.length - 1));
  // Save the indexes ot the signs to use them later to correct
  randSignListASCII.push(randSign);
  randSlot = Math.floor(Math.random() * 4);
  document.getElementById('inputASCII-' + (startingIndex + randSlot)).value = inputsASCII[randSign][randSlot];
  document.getElementById('inputASCII-' + (startingIndex + randSlot)).disabled = true;
  document.getElementById('ASCIIextable' + (startingIndex + randSlot)).style.backgroundColor = "blue";
}

// Display the given content in the exercise of ISOIEC
function displayISOIEC(startingIndex) {
  randSign = Math.round(Math.random() * (inputsISOIEC.length - 1));
  // Save the indexes ot the signs to use them later to correct
  randSignListISOIEC.push(randSign);
  randSlot = Math.floor(Math.random() * 4);
  document.getElementById('inputISOIEC-' + (startingIndex + randSlot)).value = inputsISOIEC[randSign][randSlot];
  document.getElementById('inputISOIEC-' + (startingIndex + randSlot)).disabled = true;
  document.getElementById('ISOIECextable' + (startingIndex + randSlot)).style.backgroundColor = "blue";
}

// Display the given content in the exercise of UTF8
function displayUTF8(startingIndex) {
  randSign = Math.round(Math.random() * (inputsUTF8.length - 1));
  // Save the indexes ot the signs to use them later to correct
  randNumListUTF8.push(randSign);
  randSlot = Math.floor(Math.random() * 4);
  document.getElementById('inputUTF8-' + (startingIndex + randSlot)).value = inputsUTF8[randSign][randSlot];
  document.getElementById('inputUTF8-' + (startingIndex + randSlot)).disabled = true;
  document.getElementById('UTF8extable' + (startingIndex + randSlot)).style.backgroundColor = "blue";
}

// Display the given content in the exercise of UTF16
function displayUTF16(startingIndex) {
  randSign = Math.round(Math.random() * (inputsUTF16.length - 1));
  // Save the indexes ot the signs to use them later to correct
  randNumListUTF16.push(randSign);
  randSlot = Math.floor(Math.random() * 4);
  document.getElementById('inputUTF16-' + (startingIndex + randSlot)).value = inputsUTF16[randSign][randSlot];
  document.getElementById('inputUTF16-' + (startingIndex + randSlot)).disabled = true;
  document.getElementById('UTF16extable' + (startingIndex + randSlot)).style.backgroundColor = "blue";
}


//Generate the solutions for utf-8 from the decimal values
function GenUTF8(inputDecimals) {
  for (let i = 0; i < inputDecimals.length; i++) {
    dec = inputDecimals[i][0];
    // Decimal to binary
    bin = (dec >>> 0).toString(2);
    // Decimal to hexadecimal
    hex = (dec >>> 0).toString(16);
    // Append 0 until the length 16 is reached
    zeros = 16 - bin.length;
    for (let k = 0; k < zeros; k++) {
      bin = '0'.concat(bin);
    }
    // Append 0 until the length 8 is reached
    zeros = 8 - hex.length;
    for (let k = 0; k < zeros; k++) {
      hex = '0'.concat(hex);
    }
    // If only one byte is needed in UTF8
    if (dec < 128) {
      UTF8code = (dec >>> 0).toString(2);
      // Append 0 until the length 8 is reached
      zeros = 8 - UTF8code.length;
      for (let k = 0; k < zeros; k++) {
        UTF8code = '0'.concat(UTF8code);
      }
    }
    // If two bytes are needed
    else if (dec < 2048) {
      unibin = (dec >>> 0).toString(2);
      // Get unibin on 11 charachters, so zeros are filled in
      zeros = 11 - unibin.length;
      for (let k = 0; k < zeros; k++) {
        unibin = '0'.concat(unibin);
      }
      // Create the first byte
      first = '110';
      for (let q = 0; q < 5; q++) {
        first = first.concat(unibin.charAt(q));
      }
      // Create the following byte with the indicator '10'
      second = '10';
      for (let q = 5; q < 12; q++) {
        second = second.concat(unibin.charAt(q));
      }
      UTF8code = first.concat(' ', second);
    }
    // If three bytes are needed
    else if (dec < 65536) {
      unibin = (dec >>> 0).toString(2);
      // Get unibin on 16 charachters, so we have zeros filled
      zeros = 16 - unibin.length;
      for (let k = 0; k < zeros; k++) {
        unibin = '0'.concat(unibin);
      }
      // Create the first byte
      first = '1110';
      for (let q = 0; q < 4; q++) {
        first = first.concat(unibin.charAt(q));
      }
      // Create the following bytes with the indicator '10'
      second = '10';
      third = '10';
      for (let q = 4; q < 10; q++) {
        second = second.concat(unibin.charAt(q));
        third = third.concat(unibin.charAt(q + 6));
      }
      UTF8code = first.concat(' ', second, ' ', third);
    }
    // If more than three bytes are needed (four is maximum)
    else {
      unibin = (dec >>> 0).toString(2);
      // Get unibin on 21 charachters, so we have zeros filled
      zeros = 21 - unibin.length;
      for (let k = 0; k < zeros; k++) {
        unibin = '0'.concat(unibin);
      }
      // Create the forst byte
      first = '11110'
      for (let q = 0; q < 3; q++) {
        first = first.concat(unibin.charAt(q));
      }
      // Create the following bytes with the indicator '10'
      second = '10';
      third = '10';
      fourth = '10';
      for (let q = 3; q < 9; q++) {
        second = second.concat(unibin.charAt(q));
        third = third.concat(unibin.charAt(q + 6));
        fourth = fourth.concat(unibin.charAt(q + 12));
      }
      // Put all four bytes together with a space between each
      UTF8code = first.concat(' ' , second, ' ', third, ' ', fourth);
    }
    // Converts the letters to capital letters
    hex = hex.toUpperCase();
    // Pushes everything in the related sublist
    inputDecimals[i].push(bin, hex, UTF8code);
  }
  return inputDecimals;
}

// Generate the solution values for UTF16 from decimals
function GenUTF16(inputDecimals) {
  for (let i = 0; i < inputDecimals.length; i++) {
    dec = inputDecimals[i];
    // If it lays in BMP
    if (dec < 65536) {
      // Convert to binary number
      UTF16codeBin = (dec >>> 0).toString(2);
    }
    else {
      dec = dec - 65536;
      unibin = (dec >>> 0).toString(2);
      // Fill it up to 20 Bits
      zeros = 20 - unibin.length;
      for (let k = 0; k < zeros; k++) {
        unibin = '0'.concat(unibin);
      }
      // Divide it into two substrings
      first = unibin.substring(0, 10);
      second = unibin.substring(10);
      // Put them together with the intent inbetween
      UTF16codeBin = '110110'.concat(first, '110111', second);
    }
    bin = (dec >>> 0).toString(2);
    zeros = 16 - bin.length;
    for (let k = 0; k < zeros; k++) {
      bin = '0'.concat(bin);
    }
    hex = (dec >>> 0).toString(16).toUpperCase();
    zeros = 8 - hex.length;
    for (let k = 0; k < zeros; k++) {
      hex = '0'.concat(hex);
    }
    UTF16codeHex = parseInt(UTF16codeBin, 2).toString(16).toUpperCase();
    zeros = 4 - UTF16codeHex.length;
    for (let k = 0; k < zeros; k++) {
      UTF16codeHex = '0'.concat(UTF16codeHex);
    }
    inputDecimals[i].push(bin, hex, UTF16codeHex);
  }
  return inputDecimals;
}

// Check whether the given input matches the solution for the ASCII exercise
function checkASCII(message, index) {
  // If the input matches the solution display a green background
  if (message === inputsASCII[randSignListASCII[Math.floor(index * 0.25)]][index % 4]) {
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
  if (message === inputsISOIEC[randSignListISOIEC[Math.floor(index * 0.25)]][index % 4]) {
    document.getElementById('ISOIECextable' + index).style.backgroundColor = "green";
  }
  // If the input is wrong display a red background
  else {
    document.getElementById('ISOIECextable' + index).style.backgroundColor = "red";
  }
}

// Check whether the given input matches the solution for the UTF8 exercise
function checkUTF8(message, index) {
  // If the input matches the solution display a green background
  if (message === inputsUTF8[randNumListUTF8[Math.floor(index * 0.25)]][index % 4]) {
    document.getElementById('UTF8extable' + index).style.backgroundColor = "green";
  }
  // If the input is wrong display a red background
  else {
    document.getElementById('UTF8extable' + index).style.backgroundColor = "red";
  }
}

// Check whether the given input matches the solution for the UTF16 exercise
function checkUTF16(message, index) {
  // If the input matches the solution display a green background
  if (message === inputsUTF16[randNumListUTF16[Math.floor(index * 0.25)]][index % 4]) {
    document.getElementById('UTF16extable' + index).style.backgroundColor = "green";
  }
  // If the input is wrong display a red background
  else {
    document.getElementById('UTF16extable' + index).style.backgroundColor = "red";
  }
}

// Reset the starting and solution values and background colors
function resetASCII() {
  for (let index = 0; index < 16; index++) {
    document.getElementById('inputASCII-' + index).value = '';
    document.getElementById('inputASCII-' + index).disabled = false;
    document.getElementById('ASCIIextable' + index).style.backgroundColor = "white";
  }
  randSignListASCII = [];
  for (let i = 0; i < 4; i++) displayASCII(i * 4);
}

// Reset the starting and solution values and background colors
function resetISOIEC() {
  for (let index = 0; index < 16; index++) {
    document.getElementById('inputISOIEC-' + index).value = '';
    document.getElementById('inputISOIEC-' + index).disabled = false;
    document.getElementById('ISOIECextable' + index).style.backgroundColor = "white";
  }
  randSignListISOIEC = [];
  for (let i = 0; i < 4; i++) displayISOIEC(i * 4);
}

// Reset the starting and solution values and background colors
function resetUTF8() {
  for (let index = 0; index < 16; index++) {
    document.getElementById('inputUTF8-' + index).value = '';
    document.getElementById('inputUTF8-' + index).disabled = false;
    document.getElementById('UTF8extable' + index).style.backgroundColor = "white";
  }
  randNumListUTF8 = [];
  for (let i = 0; i < 4; i++) displayUTF8(i * 4);
}

// Reset the starting and solution values and background colors
function resetUTF16() {
  for (let index = 0; index < 16; index++) {
    document.getElementById('inputUTF16-' + index).value = '';
    document.getElementById('inputUTF16-' + index).disabled = false;
    document.getElementById('UTF16extable' + index).style.backgroundColor = "white";
  }
  randNumListUTF16 = [];
  for (let i = 0; i < 4; i++) displayUTF16(i * 4);
}

// Display the solution value
function solutionASCII(index) {
  document.getElementById('inputASCII-' + index).value = inputsASCII[randSignListASCII[Math.floor(index * 0.25)]][index % 4];
  document.getElementById('ASCIIextable' + index).style.backgroundColor = "green";
}

// Display the solution value
function solutionISOIEC(index) {
  document.getElementById('inputISOIEC-' + index).value = inputsISOIEC[randSignListISOIEC[Math.floor(index * 0.25)]][index % 4];
  document.getElementById('ISOIECextable' + index).style.backgroundColor = "green";
}

// Display the solution value
function solutionUTF8(index) {
  document.getElementById('inputUTF8-' + index).value = inputsUTF8[randNumListUTF8[Math.floor(index * 0.25)]][index % 4];
  document.getElementById('UTF8extable' + index).style.backgroundColor = "green";
}

// Display the solution value
function solutionUTF16(index) {
  document.getElementById('inputUTF16-' + index).value = inputsUTF16[randNumListUTF16[Math.floor(index * 0.25)]][index % 4];
  document.getElementById('UTF16extable' + index).style.backgroundColor = "green";
}
