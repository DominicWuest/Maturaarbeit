// Array to be sorted
let arr = [];
// Indicator of what color the elements should have
let color = [];
// Index of the compare value to the left
let low;
// Index of the pivot value
let pivot;
// Width of one element
let w = 100;

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
  arr = new Array(floor(width / w));
  for (let i = 0; i < arr.length; i++) {
    arr[i] = random(height);
    color[i] = -1;
  }
  quickSort(arr, 0, arr.length - 1);
}

// Starts or restarts the animation when start input is given
//  quickSort(arr, 0, arr.length - 1);  
//}

// Does all the sorting
async function quickSort(arr, low, end) {
  if (low < end) {
    for (let i = low; i < end; i++) {
      color[i] = 1;
    }

    let pivotIndex = low;
    color[pivotIndex] = 0;
    for (let i = low; i < end; i++) {
      if (arr[i] < arr[end]) {
        await waitfor(50);
        let temp = arr[i];
        arr[i] = arr[pivotIndex];
        arr[pivotIndex] = temp;
        color[pivotIndex] = -1;
        pivotIndex++;
        color[pivotIndex] = 0;
      }
    }
    await waitfor(50);
    let temp = arr[pivotIndex];
    arr[pivotIndex] = arr[end];
    arr[end] = temp;

    for (let i = low; i < end; i++) {
      if (i != pivotIndex) {
        color[i] = -1;
      }
    }
    color[pivotIndex] = -1;

    await Promise.all([
      quickSort(arr, low, pivotIndex - 1),
      quickSort(arr, pivotIndex + 1, end)
    ]);
  }
}

// Function that draws the elements of the array
function draw() {
  background(255, 255, 255);

  for (let i = 0; i < arr.length; i++) {
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