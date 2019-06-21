// Array to be sorted
let arr = [];
// Indicator of what color the elements should have
let color = [];
// Index of the compare value to the left
let low;
// Number of elements to be displayed
let elements = 50;
// The index of the pivot value
let pivot;
// Number of milliseconds to wait before continue animation
let speed = 0.001;

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
  arr = new Array(floor(elements));
  for (let i = 0; i < arr.length; i++) {
    arr[i] = random() * (height - 1) + 1;
    color[i] = 'green';
  }
}

function startamination() {
  quickSort(arr, 0, arr.length - 1);
}

// Does all the sorting
async function quickSort(arr, low, pivot) {
  if (low < pivot) {
    color[pivot] = 'purple';
    let low_index = low;
    for (let i = low; i < pivot; i++) {
      if (arr[i] < arr[pivot]) {
        color[low_index] = 'blue';
        color[i] = 'grey';
        await waitfor(1 / speed);
        let temp = arr[i];
        arr[i] = arr[low_index];
        arr[low_index] = temp;
        color[i] = 'green';
        color[low_index] = 'green';
        low_index++;
      }
    }
    color[low_index] = 'blue';
    await waitfor(1 / speed);
    let temp = arr[low_index];
    arr[low_index] = arr[pivot];
    arr[pivot] = temp;
    for (let i = low; i < pivot; i++) {
      if (i != low_index) {
        color[i] = 'green';
      }
    }

    await Promise.all([
      // Sort the left subarray
      quickSort(arr, low, low_index - 1),
      // Sort the right subarray
      quickSort(arr, low_index + 1, pivot)
    ]);
  }
}

// Function that draws the elements of the array, gets called 60 times per second
function draw() {
  background(255, 255, 255);

  for (let i = 0; i < arr.length; i++) {
    if (color[i] === 'grey') {
      fill(128, 128, 128);
    } 
    else if (color[i] === 'blue') {
      fill(0, 0, 255);
    }
    else if (color[i] === 'purple') {
      fill(128, 0, 128);
    } 
    else {
      fill(0, 255, 0);
    }
    rect(i * (width / elements), height - arr[i], (width / elements), arr[i]);
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