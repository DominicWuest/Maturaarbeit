// Counter indicating how many frames have been displayed
let frameCounter;
// How many actions per second should be performed
let fps = 2;
//
let animationIndex;
//
let animations = {

}
// Class of the pipes displayed
class Pipe {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.status = 0;
  }
  //
  draw() {
    fill()
  }
}

// Restarts the animation completely
function restartAnimation() {
  setup();
  frameCounter = 0;
  animationIndex = 0;
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
  // If (60 / fps) frames have passed
  if (frameCounter++ > 60 / fps) {
    frameCounter %= 60 / fps;
    // Call the next animation and increment the animationIndex if it returns true
    if (animations[animationIndex]()) animationIndex++;
  }
}
