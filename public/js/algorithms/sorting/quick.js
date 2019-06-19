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
// The index of the value that is more to the left
let low;
// The index of the value that is more to the right
let high;
// The Pivot element of the QuickSort algorithm
let pivot;
// The index of the value that is focused
let low_index;
// A boolean indicating whether we call quicksort for the first time or not
let start = true;
// The height of the div containing the animation
let height;
// The displayed height difference between values in the scrambled array
let elementHeight = 5;
// A boolean indicating whether the array needs to be scrambled or not
let needsScrambling = true;
// Restarts the animation completely
function restartAnimation() {
  setup();
  height = document.getElementById('animation').offsetHeight;
  elementsLength = Math.floor(height / (elementHeight + 1));
  max = elementsLength;
  functionsIndex = 0;
  frames = 0;
  if (needsScrambling) objects = scramble(max);
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
  clear();
  // Draws the elements 
  for (let i = 0; i <= elementsLength; i++) {
    if (i === low_index) fill(0, 0, 255);
    else if (i === max) fill(128, 0, 128);
    else if (i === pivot) fill(128, 128, 128);
    else fill(0, 255, 0);
    rect(i * width / elementsLength + 1, (elementsLength - objects[i]) * elementHeight + 1, width / elementsLength - 4, (objects[i] + 1) * elementHeight - 1);
  }
  // Start the quickSort function the first time draw is called

  if (start) {
    quickSort(objects, 0, max);
    start = false;
  }
}

// Executes the sorting of the array
function quickSort(objects, low, high) {
  if (low < high) {
    max = 0;
    a = high;
    low_index = low;
    pivot = objects[high];
    for (let high_index = low; high_index <= high; high_index++) {
      if (objects[high_index] < pivot) {
        // Swap the focused and compared value
        let temp = objects[low_index];
        objects[low_index] = objects[high_index];
        objects[high_index] = temp;
        low_index++;
      }
    }
    let temp = objects[low_index];
    objects[low_index] = objects[high];
    objects[high] = temp;
    setTimeout(function(){ 

        quickSort(objects, low_index + 1, high);
    }, 10000 / speed)
    setTimeout(function(){ 

        quickSort(objects, low, low_index - 1);
    }, 10000 / speed)
  }
  else {
    max = 0;
    return;
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
