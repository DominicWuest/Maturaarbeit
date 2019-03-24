let value, min, focus;
let frames, fps = 3;
let playing = false;
let elementsLength;

function restartAnimation() {
  setup();
  let range = document.getElementById('range');
  elementsLength = parseInt(range.max);
  value = parseInt(range.value);
  min = 0;
  focus = 0;
  frames = 0;
}

function setup() {
  let canvasDiv = document.getElementById('animation');
  let width = canvasDiv.offsetWidth;
  let height = canvasDiv.offsetHeight;
  let canvas = createCanvas(width, height);
  canvas.parent('animation');
  document.getElementById('range').style.width = document.getElementById('animation').offsetWidth + "px";
}

function draw() {
  clear();
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
  if (playing) {
    if (frames % (60 / fps) === 0) {
      if (focus === value) {
        console.log(width / elementsLength);
        min = elementsLength;
        playing = false;
        focus--;
      }
      min++;
      focus++;
    }
    frames++;
  }
}

function drawFocusValue() {
  fill(0, 0, 255);
  beginShape();
  vertex(value * width / (elementsLength + 1) + 1, 0);
  vertex(value * width / (elementsLength + 1) + 1, height);
  vertex((value + 1) * width / (elementsLength + 1) - 1, height);
  endShape(CLOSE);
  fill(128, 0, 128);
  beginShape();
  vertex((value + 1) * width / (elementsLength + 1) - 1, 0);
  vertex((value + 1) * width / (elementsLength + 1) - 1, height);
  vertex(value * width / (elementsLength + 1) + 1, 0);
  endShape(CLOSE);
}
