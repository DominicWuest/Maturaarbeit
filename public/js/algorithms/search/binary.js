function addHighlighting() {
  for (language in codeHighlighting) {
    let code = document.getElementById(language).innerHTML.split('\n');
    let text = document.getElementById(language).textContent.split('\n');
    let tagIndex = true;
    for (let i = 0; i < code.length; i++) { // Check every line seperately, makes it easier for comments
      let line = code[i];
      // Colour Strings
      for (stringNotation of codeHighlighting[language]["strings"]["character"]) {
        if (!line.includes(stringNotation)) continue;
        let splittedLine = line.split(stringNotation);
        let tagIndex = true;
        for (let j = 0; j < splittedLine.length - 1; j++) {
          if (tagIndex) splittedLine[j] += '<span style="color: ' + codeHighlighting[language]["strings"]["color"] + ';">' + stringNotation;
          else splittedLine[j] += stringNotation + '</span>';
          tagIndex = !tagIndex
        }
        line = splittedLine.join('');
      }
      // Colour all Syntax Elements
      for (syntaxElement in codeHighlighting[language]["syntax"]) {
        line = line.replace(new RegExp(syntaxElement,'g'), '<span style="color: ' + codeHighlighting[language]["syntax"][syntaxElement] + '";>' + syntaxElement + '</span>');
      }
      // Colour Comments
      line = line.split(codeHighlighting[language]["comments"]["character"]);
      if (line.length > 1) {
        for (let j = 0; j < line.length; j++) {
          if (line[j].substring(line[j].length - 14) !== "style=\"color: ") {
            line[j] = line[j] += '<span style="color: ' + codeHighlighting[language]["comments"]["color"] + '";>';
            line[line.length - 1] += '</span>';
            break;
          }
        }
      }
      line = line.join(codeHighlighting[language]["comments"]["character"]);
      code[i] = line;
    }
    code = code.join('\n');
    document.getElementById(language).innerHTML = code;
  }
}

let looped, value, elementsLength, max, min;
let functions = [findTarget, setBounds], functionsIndex;
let focus;
let frames, fps = 1;
let playing = false;

function restartAnimation() {
  setup();
  looped = false;
  let range = document.getElementById('range');
  value = parseInt(range.value);
  elementsLength = range.max - range.min;
  max = elementsLength;
  min = 0;
  focus = elementsLength / 2;
  functionsIndex = 0;
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
      else if (max < i || i < min) fill(128, 128, 128);
      rect(i * width / (elementsLength + 1) + 1, 0, width / elementsLength - 4, height - 1);
    }
  }
  if (playing) {
    if (frames % 60 / fps === 0) {
      functions[functionsIndex]();
      functionsIndex++;
      functionsIndex %= functions.length;
    }
    frames++;
  }
}

function findTarget() {
  focus = (min + max) / 2;
}

function setBounds() {
  if (focus === value) {
    max = -1;
    playing = false;
  }
  else if (focus < value) min = focus + 1;
  else max = focus - 1;
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