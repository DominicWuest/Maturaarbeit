// Array to be sorted
let arr = [];

// Indicator of what color the elements should have
let color = [];

// Index of the compare value to the left (compared to pivot)
let low;

// Number of elements to be displayed
let elements = 50;

// The index of the pivot value
let pivot;

// Number of milliseconds to wait before continue animation
let speed = 0.005;

// Boolean to abort the animation if it was restarted
let abort;

// Creates the canvas in its given size and position by the css file
async function setup() {
  await waitfor(3 / speed);
  let canvasDiv = document.getElementById('animation');
  let width = canvasDiv.offsetWidth;
  let height = canvasDiv.offsetHeight;
  // Creates canvas
  let canvas = createCanvas(width, height);
  // Declares the parent div of the canvas
  canvas.parent('animation');
  // Creates a new array with a given number of elements
  if (window.innerWidth / window.innerHeight < 9 / 13) elements = 15;
  arr = new Array(floor(elements));
  // Gives each element a fixed height and defines a green color, but keeps array in order
  for (let i = 0; i < arr.length; i++) {
    arr[i] = ((i + 1) * height) / elements;
    color[i] = 'green';
  }
  // Shuffles the ordered array (predifined function)
  arr = shuffle(arr);
}

// Start of the animation when input start button is pressed
async function startamination() {
  // Gives the function some time to get aborted
  await waitfor(3 / speed);
  abort = false;
  quickSort(arr, 0, arr.length - 1);
}

/**
 * Does all the sorting and defines the colors
 * @param {Object} arr - The array to be sorted
 * @param {number} low - The lowest index of arr
 * @param {number} pivot - The choosen Pivot-value
 */
async function quickSort(arr, low, pivot) {
  // Abort condition so the recursive function is limited
  if (low < pivot) {
    color[pivot] = 'purple';
    let low_index = low;
    for (let i = low; i < pivot; i++) {
      color[low_index] = 'blue';
      // Abort breaks the function and has to be added before every call of the waifor function
      if (abort) return false;
      if (i != low_index) color[i] = 'grey';
      else color[i] = 'greyblue';
      if (arr[i] < arr[pivot]) {
        await waitfor(1 / speed);
        let temp = arr[i];
        arr[i] = arr[low_index];
        arr[low_index] = temp;
        if (abort) return false;
        await waitfor(1 / (2 * speed));
        low_index++;
      }
      // Waits for a moment so the viewer can check the colors
      else await waitfor(1 / (3 * speed));
      color[i] = 'green';
      color[low_index - 1] = 'green';
    }
    if (low_index != pivot) color[low_index] = 'red';
    if (abort) return false;
    await waitfor(2 / speed);
    // Resets the color of the last low_index element so all colors are reseted to the initial conditions
    color[low_index] = 'green';
    let temp = arr[low_index];
    arr[low_index] = arr[pivot];
    arr[pivot] = temp;
    // Gives each element a green color (resets the color)
    for (let i = low; i < pivot + 1; i++) {
      if (i != low_index) {
        color[i] = 'green';
      }
    }
    // Waits until everything above has finished before it calls the function again
    if (abort) return false;
    await Promise.all([
      quickSort(arr, low, low_index - 1)]);
    await Promise.all([
      quickSort(arr, low_index + 1, pivot)
    ]);
  }
}

// Gets called 60 times per second and draws the elements
function draw() {
  background(255);
  // Draws each element with the given color
  for (let i = 0; i < arr.length; i++) {
    if (color[i] === 'grey') {
      fill(128);
      stroke(0);
    }
    else if (color[i] === 'blue') {
      fill(0, 0, 255);
      stroke(0);
    }
    else if (color[i] === 'purple') {
      fill(128, 0, 128);
      stroke(0);
    }
    // Color greyblue means grey rectangle with blue edges
    else if (color[i] === 'greyblue') {
      fill(128);
      stroke(0, 0, 255);
    }
    else if (color[i] === 'red') {
      fill(255, 0, 0);
      stroke(0);
    }
    else {
      fill(0, 255, 0);
      stroke(0);
    }
    /** Defines the elements as rectangles
     * They should not fill the whole canvas because the stroke would overflow
     */
    rect(i * ((width - 1) / elements), height - arr[i], (width / elements), arr[i]);
  }
}

/**
 * Buffer to brake down the speed of the animation
 * @param {number} time - Time to wait in milliseconds
 */
function waitfor(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
}
