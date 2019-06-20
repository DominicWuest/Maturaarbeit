// Array to be sorted
let arr = [];
// Width of one element of the array
let w = 100;
// Indicator of what color the elements should have
let states = [];
// Index of the compare value to the left
let low;
// Index of the pivot value
let pivot;

// Setup of the canvas where the animation is displayed
function setup() {
  // Defines position and size of the canvas
  let canvasDiv = document.getElementById('animation');
  let width = canvasDiv.offsetWidth;
  let height = canvasDiv.offsetHeight;
  // Creates canvas
  let canvas = createCanvas(width, height);
  // Declares the parent div of the canvas
  canvas.parent('animation');
  arr = new Array(floor(width / w));
  for (let i = 0; i < arr.length; i++) {
    arr[i] = random(height);
    states[i] = -1;
  }
}

// Starts or restarts the animation when start input is given
function restartAnimation() {
  quickSort(arr, 0, arr.length - 1);  
}

// Function that does the sorting
async function quickSort(arr, low, pivot) {
  if (low < pivot) {
    for (let i = low; i < pivot; i++) {
      states[i] = 1;
    }
    let pivotIndex = low;
    states[pivotIndex] = 0;
    for (let i = low; i < pivot; i++) {
      if (arr[i] < arr[pivot]) {
        await waitfor(50);
        let temp = arr[i];
        arr[pivotIndex] = arr[i];
        arr[pivotIndex] = temp;
        states[pivotIndex] = -1;
        pivotIndex++;
        states[pivotIndex] = 0;
      }
    }
    await waitfor(50);
    let temp = arr[pivotIndex];
    arr[pivotIndex] = arr[pivot];
    arr[pivot] = temp;
    for (let i = low; i < pivot; i++) {
      if (i != pivotIndex) {
        states[i] = -1;
      }
    }
    states[pivotIndex] = -1;
    // Waits until everything else has finished before recalling the function
    await Promise.all([
      quickSort(arr, low, pivotIndex - 1),
      quickSort(arr, pivotIndex + 1, pivot)
    ]);
  }
  else {
    return;
  }
}

// Function that draws the elements of the array
function draw() {
  background(0);
  for (let i = 0; i < arr.length; i++) {
    // Do not draw a outline so there is nothing left after the swapping
    noStroke();
    if (states[i] === 0) {
      fill(128, 0, 128);
    } 
    else if (states[i] === 1) {
      fill(0, 0, 128);
    } 
    else {
      fill(0, 255, 0);
    }
    // Draws the rectangulars at the defined position and size
    rect(i * w, height - arr[i], w, arr[i]);
  }
}

// Function to break down the speed of the animation
function waitfor(time) { 
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
}
