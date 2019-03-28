let value, elementsLength, max;
let objects;
let frames, fps = 2;
let focusedIndex, comparedIndex;
let height;
let elementHeight = 5;
let needsSwapping;
let needsScrambling = true;
let swapped;

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

function setup() {
  let canvasDiv = document.getElementById('animation');
  let width = canvasDiv.offsetWidth;
  let height = canvasDiv.offsetHeight;
  let canvas = createCanvas(width, height);
  canvas.parent('animation');
}

function draw() {
  if (max === 1) {
    max--;
    focusedIndex = -1;
    comparedIndex = -1;
  }
  clear();
  for (let i = 0; i <= elementsLength; i++) {
    if (i === focus && i === value) drawFocusValue();
    else {
      fill(0, 255, 0);
      if (i === focusedIndex) fill(0, 0, 255);
      else if (i === comparedIndex) fill(128, 0, 128);
      else if (i >= max) fill(128, 128, 128);
      rect(i * width / elementsLength + 1, (elementsLength - objects[i]) * elementHeight + 1, width / elementsLength - 4, (objects[i] + 1) * elementHeight - 1);
    }
  }
  if (max > 1 && frames++ > 60 / fps) continueAnimation();
}

function continueAnimation() {
  frames = 0;
  if (needsSwapping) {
    let temp = objects[focusedIndex];
    objects[focusedIndex] = objects[comparedIndex];
    objects[comparedIndex] = temp;
    focusedIndex++;
    comparedIndex--;
    needsSwapping = false;
    swapped = true;
  } else {
    if (objects[focusedIndex] > objects[comparedIndex] && !swapped) needsSwapping = true;
    else if (swapped) {
      comparedIndex += 2;
      swapped = false;
    } else {
      focusedIndex++;
      comparedIndex++;
    }
  }
  if (comparedIndex === max) {
    max--;
    focusedIndex = 0;
    comparedIndex = 1;
  }
}

function scramble(max) {
  let arr = [];
  for (let i = 0; i < max; i++) {
    arr.push(i);
  }
  let scrambled = [];
  for (let i = 0; i < max; i++) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    scrambled.push(arr.splice(randomIndex, 1)[0]);
  }
  return scrambled;
}
