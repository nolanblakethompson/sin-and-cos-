let xspacing = 30; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 200.0; // Height of wave
let period = 500.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave
let cols = 10;
let rows = 10;
let diameter = 10;
let spacing = 20;
let currentShape = 'circle'; // Initially set to draw circles
let slider;
let letters = "01";
let textSizeSlider;




let amplitudeSlider, xspacingSlider, ellipseSizeSlider;

function setup() {
  bgColor = color(0);
  fillColor = color(255);
  createCanvas(400, 400);
  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
  rectMode(CENTER);
  frameRate(10);
  
  // Create sliders for adjusting amplitude, xspacing, and ellipse size
  amplitudeSlider = createSlider(0, 200, 100);
  amplitudeSlider.position(10, height + 10);
  amplitudeSlider.style('width', '380px');
  
  xspacingSlider = createSlider(5, 100, 30);
  xspacingSlider.position(10, height + 30);
  xspacingSlider.style('width', '380px');
  
  textSizeSlider = createSlider(5, 120, 50);
  textSizeSlider.position(10, height + 50);
  textSizeSlider.style('width', '380px');
  textSizeSlider.input(changeTextSize);
  
  
  slider = createSlider(2, 12, 5);
  slider.position(10, height + 70); // Adjusted position based on canvas height
  slider.style('width', '380px');
  
let button = createButton('Change Colors pg');
button.position(10, height + 90); // Adjust position based on canvas height
button.mousePressed(changeColorspg);

let colorButton = createButton('Change Colors');
colorButton.position(10, height + 120); // Adjust position based on canvas height
colorButton.mousePressed(changeColors);
  
let colortwoButton = createButton('Change Colors bg');
colortwoButton.position(10, height + 150); // Adjust position based on canvas height
colortwoButton.mousePressed(changeColorsbg);



}

  






function draw() {
  background(bgColor);
  fill(fillColor);
  const ellipseColor = color(fillColor);
  ellipseColor.setAlpha(50);
  cols = slider.value();
  rows = slider.value();
  amplitude = amplitudeSlider.value();
  xspacing = xspacingSlider.value();
  
  // Recalculate parameters
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
    let newSpacing = min(width / cols, height / rows);
  push();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      
        calcWave();
        renderWave();
      }
   }
  pop();
  
    push();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      
        calctwoWave();
        renderWave();
      }
   }
  pop();
function calcWave() {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += 0.02;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
}

function renderWave() {
  noStroke();
  fill(ellipseColor);
  
   for (let x = 0; x < yvalues.length; x++) {
    let letterIndex = floor(map(yvalues[x], -amplitude, amplitude, 0, letters.length));
    let letter = letters.charAt(letterIndex);
    text(letter, x * xspacing, height / 2 + yvalues[x]);
  }
}

function calctwoWave() {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += 0.02;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = tan(x) * amplitude;
    x += dx;
  }
}
function drawCircle(x, y) {
  fill(fillColor);
  noStroke();
  ellipse(x, y, 0);
}

function drawRect(x, y) {
  rect(x, y, diameter, diameter, 5);
}

function drawTriangle(x, y) {
  triangle(x - diameter / 2, y + diameter / 2, x + diameter / 2, y + diameter / 2, x, y - diameter / 2);
}

function changeShape() {
  // Generate a random number between 0 and 2
  let randomNumber = floor(random(3));
  // Set currentShape based on the random number
  if (randomNumber === 0) {
    currentShape = 'circle';
  } else if (randomNumber === 1) {
    currentShape = 'square';
  } else {
    currentShape = 'triangle';
  }
  }
}

function changeTextSize() {
  textSize(textSizeSlider.value()); // Set the text size based on the slider value
}

function changeColors() {
  if (red(bgColor) != 255) {
    bgColor = color(255);
    fillColor = color(0);
  } else {
    bgColor = color(0);
    fillColor = color(255);
  }
}

function changeColorspg() {
  if (green(bgColor) != 118) {
    bgColor = color(232, 118, 32);
    fillColor = color(255, 195, 244);
  } else {
    bgColor = color(255, 195, 244);
    fillColor = color(232, 118, 32);
  }
  
  }

function changeColorsbg() {
  if (green(bgColor) != 174) {
    bgColor = color(16, 174, 32);
    fillColor = color(255, 255, 0);
  } else {
    bgColor = color(255, 255, 0);
    fillColor = color(16, 174, 32);
  }

}
