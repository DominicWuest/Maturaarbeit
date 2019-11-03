// The index of the value to be found
let value
// The index upto which all elements are greyed out
let min;
// The index of the focused element
let focus;
// The amount of frames which have been displayed
let frames;
// The frames per second to be displayed
let fps = 3;
// A boolean indicating whether the animation is running or not
let playing = false;
// The amount of elements to be displayed
let elementsLength;

// Restart the animation completely
function restartAnimation() {
  setup();
  let range = document.getElementById('range');
  elementsLength = parseInt(range.max);
  value = parseInt(range.value);
  min = 0;
  focus = 0;
  frames = 0;
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
  // Matches width of the range input to the width of the canvas
  document.getElementById('range').style.width = document.getElementById('animation').offsetWidth + "px";
}

// Gets called 60 times per second
function draw() {
  // Clear the canvas so that the background is transparent
  clear();
  // Draw the values
  for (let i = 0; i <= elementsLength; i++) {
    if (i === focus && i === value) drawFocusValue();
    else {
      fill(0, 255, 0);
      if (i === focus) fill(0, 0, 255);
      else if (i === value) fill(128, 0, 128);
      else if (i < min) fill(128, 128, 128);
      rect(i * width / (elementsLength + 1) + 1, 0, width / elementsLength - 4, height - 1);
    }
  }
  // If 60 / fps frames have been displayed and the animation is running
  if (playing && frames++ % (60 / fps) === 0) nextFrame();
}

// Animates the next frame of the animation
function nextFrame() {
  // The value was found
  if (focus === value) {
    // Gray out all elements
    min = elementsLength;
    playing = false;
    focus--;
  }
  min++;
  focus++;
}

// Draws the rectangle when the focused value equals the value to be found
function drawFocusValue() {
  // Draw the focused value
  fill(0, 0, 255);
  beginShape();
  vertex(value * width / (elementsLength + 1) + 1, 0);
  vertex(value * width / (elementsLength + 1) + 1, height);
  vertex((value + 1) * width / (elementsLength + 1) - 1, height);
  endShape(CLOSE);
  // Draw the value to be found
  fill(128, 0, 128);
  beginShape();
  vertex((value + 1) * width / (elementsLength + 1) - 1, 0);
  vertex((value + 1) * width / (elementsLength + 1) - 1, height);
  vertex(value * width / (elementsLength + 1) + 1, 0);
  endShape(CLOSE);
}
