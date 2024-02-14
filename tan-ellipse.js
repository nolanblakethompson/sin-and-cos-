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


let amplitudeSlider, xspacingSlider, ellipseSizeSlider;

function setup() {
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
  
  xspacingSlider = createSlider(5, 50, 30);
  xspacingSlider.position(10, height + 30);
  xspacingSlider.style('width', '380px');
  
  ellipseSizeSlider = createSlider(5, 50, 16);
  ellipseSizeSlider.position(10, height + 50);
  ellipseSizeSlider.style('width', '380px');
  
  
  slider = createSlider(2, 12, 5);
  slider.position(10, height + 70); // Adjusted position based on canvas height
  slider.style('width', '380px');
}



function draw() {
  background(0);
  cols = slider.value();
  rows = slider.value();
  amplitude = amplitudeSlider.value();
  xspacing = xspacingSlider.value();
  
  // Recalculate parameters
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
    let newSpacing = min(width / cols, height / rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * newSpacing + newSpacing / 2;
      let y = j * newSpacing + newSpacing / 2;


        calcWave();
        renderWave();
      }
   }

function calcWave() {
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

function renderWave() {
  noStroke();
  fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing, height / 2 + yvalues[x], ellipseSizeSlider.value(), ellipseSizeSlider.value());
  }
}

function drawCircle(x, y) {
  fill(10,10);
  stroke(255);
  ellipse(x, y, diameter);
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
