// The amount of elements to be displayed
let elementsLength;
// The max index to iterate to while sorting (gets decremented whenever a value reaches this index)
let max;
// The scrambled array
let objects;
// The amount of frames which have been displayed
let frames;
// The frames per second to be displayed
let fps = 2;
// The index of the focused value
let focusedIndex;
// The index of the value to which the focused value gets compared
let comparedIndex;
// The height of the div containing the animation
let height;
// The displayed height difference between values in the scrambled array
let elementHeight = 5;
// A boolean indicating whether the focused and compared value need to be swapped
let needsSwapping;
// A boolean indicating whether the array needs to be scrambled or not
let needsScrambling = true;
// A boolean indicating whether the focused and compared value has been swapped
let swapped;

// Restarts the animation completely
function restartAnimation() {
  setup();
  height = document.getElementById('animation').offsetHeight;
  elementsLength = Math.floor(height / (elementHeight + 1));
  focusedIndex = 0;
  comparedIndex = 1;
  max = elementsLength;
  functionsIndex = 0;
  frames = 0;
  swapped = false;
  if (needsScrambling) objects = scramble(max);
  needsSwapping = false;
  loop();
}

// Sets the size and position of the canvas
function setup() {
  let canvasDiv = document.getElementById('animation');
  let width = canvasDiv.offsetWidth;
  let height = canvasDiv.offsetHeight;
  // Creates canvas
  let canvas = createCanvas(width, height);
  // Declares the parent div of the canvas
  canvas.parent('animation');
}

// Gets called 60 times per second
function draw() {
  // If the array is sorted
  if (max === 1) {
    max--;
    focusedIndex = -1;
    comparedIndex = -1;
  }
  clear();
  // Draws the elements
  for (let i = 0; i <= elementsLength; i++) {
    fill(0, 255, 0);
    if (i === focusedIndex) fill(0, 0, 255);
    else if (i === comparedIndex) fill(128, 0, 128);
    else if (i >= max) fill(128, 128, 128);
    rect(i * width / elementsLength + 1, (elementsLength - objects[i]) * elementHeight + 1, width / elementsLength - 4, (objects[i] + 1) * elementHeight - 1);
  }
  // Continue the animation if the array isn't sorted and 60 / fps frames have passed
  if (max > 1 && frames++ > 60 / fps) continueAnimation();
}

// Continues the animation / Executes the next step required to sort the array
function continueAnimation() {
  frames = 0;
  // If the focused value is greater than the value to which the focused value gets compared
  if (needsSwapping) {
    // Swap the focused and compared value
    let temp = objects[focusedIndex];
    objects[focusedIndex++] = objects[comparedIndex];
    objects[comparedIndex--] = temp;
    needsSwapping = false;
    swapped = true;
  }
  // Check if the focused or compared value is greater
  else {
    if (objects[focusedIndex] > objects[comparedIndex] && !swapped) needsSwapping = true;
    else if (swapped) {
      comparedIndex += 2;
      swapped = false;
    } else {
      focusedIndex++;
      comparedIndex++;
    }
  }
  // If the greatest value is at the max index
  if (comparedIndex === max) {
    max--;
    focusedIndex = 0;
    comparedIndex = 1;
  }
}

// Returns an array with scrambled values with max elements
function scramble(max) {
  let arr = [];
  for (let i = 0; i < max; i++) {
    arr.push(i);
  }
  let scrambled = [];
  for (let i = 0; i < max; i++) {
    // Appends the value at a random index in arr to the scrambled array and deletes it from arr
    let randomIndex = Math.floor(Math.random() * arr.length);
    scrambled.push(arr.splice(randomIndex, 1)[0]);
  }
  return scrambled;
}
