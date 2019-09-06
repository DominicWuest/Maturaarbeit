// The width and height of the displayed canvas
let width, height;
// Counter indicating how many frames have been displayed
let frameCounter;
// How many actions per second should be performed
let fps = 2;
// The index of the currently playing animation
let animationIndex;
// ALl animations in order
let animations = [
  comparePipe,
  switchPipe,
  nextPipe
]
// The minimal height of a pipe
let minPipeHeight = 5;
// THe height of the canvas
let canvasHeight;
// The width of the canvas
let canvasWidth;
// The width of the displayed pipes
let pipesWidth;
// The amount of displayed pipes
let pipesAmount;
// The index of the pipe currently focused
let focusedPipeIndex;
// The lowest index from where on the pipes are unsorted
let lowestUnsortedIndex;
// Holds the pipe-objects
let pipes = [];
// The colors for the different statuses of the pipes
let pipeColors = [
  // Unsorted
  0, 255, 0,
  // Sorted
  128, 128, 128,
  // Currently focused
  0, 0, 255,
  // Being compared to
  128, 0, 128
];
// Whether the pipes need to be scambled or not
let needsScrambling = true;

// Class of the pipes displayed
class Pipe {
  constructor(height) {
    this.height = height;
    /*
      Status:
        0 = Not sorted
        1 = Sorted
        2 = Currently focused
        3 = Being compared to
    */
    this.status = 0;
  }
  // Draws the pipe on the canvas
  draw(index) {
    fill(pipeColors[3 * this.status], pipeColors[3 * this.status + 1], pipeColors[3 * this.status + 2]);
    rect(index * pipesWidth + index * pipesWidth / (pipesAmount + 1), canvasHeight - this.height - (2 * minPipeHeight), pipesWidth, this.height + minPipeHeight);
  }
}

// Restarts the animation completely
function restartAnimation() {
  setup();
  frameCounter = 0;
  animationIndex = 0;
  focusedPipeIndex = 0;
  lowestUnsortedIndex = 1;
  // Recreate the pipes array if the animation has been played before
  if (needsScrambling) {
    pipes = [];
    for (let i = 0; i < pipesAmount; i++) pipes.push(new Pipe(i * minPipeHeight));
    pipes = scramble(pipes);
    pipes[0].status = 2;
  }
  needsScrambling = true;
  loop();
}

// Sets the size and position of the canvas, thus not interrupting or restarting the animation
function setup() {
  let canvasDiv = document.getElementById('animation');
  canvasWidth = canvasDiv.offsetWidth;
  canvasHeight = canvasDiv.offsetHeight;
  pipesAmount = Math.floor(canvasHeight / (minPipeHeight + 1));
  pipesWidth = canvasWidth / (pipesAmount + 1);
  // Creates canvas
  let canvas = createCanvas(canvasWidth, canvasHeight);
  // Declares the parent div of the canvas
  canvas.parent('animation');
}

// Gets called 60 times per second
function draw() {
  // Clear the canvas
  clear();
  // Draw all pipes
  for (let i = 0; i < pipes.length; i++) pipes[i].draw(i);
  // If (60 / fps) frames have passed
  if (frameCounter++ > 60 / fps) {
    frameCounter %= 60 / fps;
    // Call the next animation and increment the animationIndex if it returns true or else decrement
    if (animations[animationIndex]()) animationIndex = (animationIndex + 1) % animations.length;
    else animationIndex--;
    if (focusedPipeIndex === pipesAmount) noLoop();
  }
}

// Scrambles the given array
function scramble(arr) {
  let scrambled = [];
  let maxI = arr.length;
  for (let i = 0; i < maxI; i++) {
    // Appends the value at a random index in arr to the scrambled array and deletes it from arr
    let randomIndex = Math.floor(Math.random() * arr.length);
    scrambled.push(arr.splice(randomIndex, 1)[0]);
  }
  return scrambled;
}

// Animation Functions
function comparePipe() {
  animationIndex++;
  // Continue with the next pipe if the porgram is at the beginning of the pipes
  if (focusedPipeIndex === 0) return true;
  if (pipes[focusedPipeIndex].height > pipes[focusedPipeIndex - 1].height) {
    pipes[focusedPipeIndex - 1].status = 1;
    return true;
  }
  animationIndex--;
  return true;
}

function switchPipe() {
  // Change the status of the pipe the current one is being compared with to sorted
  pipes[focusedPipeIndex - 1].status = 1;
  // Switch the pipes at index focusedPipeIndex and (focusedPipeIndex - 1) with each other
  let temp = pipes[focusedPipeIndex];
  pipes[focusedPipeIndex] = pipes[focusedPipeIndex - 1];
  pipes[focusedPipeIndex - 1] = temp;
  focusedPipeIndex--;
  return true;
}

function nextPipe() {
  // If the pipe at the beginning of the array is being focused or the focsed pipe is sorted
  if (focusedPipeIndex === 0 || pipes[focusedPipeIndex].height > pipes[focusedPipeIndex - 1].height) {
    pipes[focusedPipeIndex].status = 1;
    // Stop the animation if the pipes have been sorted
    if (lowestUnsortedIndex === pipesAmount) return true;
    focusedPipeIndex = lowestUnsortedIndex++;
    pipes[focusedPipeIndex].status = 2;
  }
  // Change the status of the pipe below the currently focused one to being compared to
  if (focusedPipeIndex !== 0) pipes[focusedPipeIndex - 1].status = 3;
  // Compare the pipe again
  return true;
}
