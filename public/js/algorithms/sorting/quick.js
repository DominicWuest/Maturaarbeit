// Array to be sorted
let arr = [];
// Indicator of what color the elements should have
let color = [];
// Index of the compare value to the left
let low;
// Index of the pivot value
let pivot;
// Index of the pivot value for the next iteration
let pivotIndex;

// Sets the size and position of the canvas
function setup() {
  // Defines position and size of the canvas
  let canvasDiv = document.getElementById('animation');
  let width = canvasDiv.offsetWidth;
  let height = canvasDiv.offsetHeight;
  // Creates canvas
  let canvas = createCanvas(width, height);
  // Declares the parent div of the canvas
  canvas.parent('animation');
  arr = new Array(floor(15));
  for (let i = 0; i < arr.length; i++) {
    arr[i] = random(height);
    color[i] = -1;
  quickSort(arr, 0, arr.lenght - 1);
  }
}

// Starts or restarts the animation when start input is given
//  quickSort(arr, 0, arr.length - 1);  
//}

// Does all the sorting
async function quickSort(arr, low, pivot) {
  // Otherwise the array is sorted
  if (low < pivot) {
    pivotIndex = low;
    color[pivotIndex] = 0;
    for (let i = low; i < pivot; i++) {
      color[i] = 1;
      if (arr[i] < arr[pivot]) {
        await waitfor(50);
        let temp = arr[i];
        arr[pivotIndex] = arr[i];
        arr[pivotIndex] = temp;
        color[pivotIndex] = -1;
        pivotIndex++;
        color[pivotIndex] = 0;
      }
    }
    await waitfor(50);
    let temp = arr[pivotIndex];
    arr[pivotIndex] = arr[pivot];
    arr[pivot] = temp;
    for (let i = low; i < pivot; i++) {
      if (i != pivotIndex) {
        color[i] = -1;
      }
    }
    color[pivotIndex] = -1;
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
    if (color[i] === 0) {
      fill(128, 0, 128);
    } 
    else if (color[i] === 1) {
      fill(0, 0, 128);
    } 
    else {
      fill(0, 255, 0);
    }
    // Draws the rectangulars at the defined position and size
    rect(i * (width / 15), height - arr[i], width / 15, arr[i]);
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