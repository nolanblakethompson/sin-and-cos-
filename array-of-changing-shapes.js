let cols = 10;
let rows = 10;
let diameter = 50;
let spacing = 60;
let currentShape = 'circle'; // Initially set to draw circles
let strokeWidthSlider;
let slider;
let shapeChangeInterval = 200; // Interval for shape change in milliseconds
let lastShapeChangeTime = 0;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);

  slider = createSlider(2, 12, 5);
  slider.position(10, height + 10); // Adjusted position based on canvas height
  slider.style('width', '380px');

  // Create a slider for adjusting the stroke width
  strokeWidthSlider = createSlider(1, 15, 10); // Adjust the min, max, and starting value as needed
  strokeWidthSlider.position(10, height + 30);
  strokeWidthSlider.style('width', '380px');

  // Set an interval for changing shapes
  setInterval(changeShape, shapeChangeInterval);
}

function draw() {
  background(0);
  fill(0);
  stroke(255);
  strokeWeight(strokeWidthSlider.value()); // Adjust the stroke weight based on the slider value
  cols = slider.value();
  rows = slider.value();

  // Calculate the new spacing based on the fixed canvas size and the updated rows and cols
  let newSpacing = min(width / cols, height / rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * newSpacing + newSpacing / 2;
      let y = j * newSpacing + newSpacing / 2;

      // Choose drawing function based on currentShape
      if (currentShape === 'circle') {
        drawCircle(x, y);
      } else if (currentShape === 'square') {
        drawRect(x, y);
      } else {
        drawTriangle(x, y);
      }
    }
  }
}

function drawCircle(x, y) {
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
