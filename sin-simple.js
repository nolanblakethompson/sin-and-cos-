class WaveSketch {
  constructor() {
    this.xspacing = 30;
    this.w; // Width of entire wave
    this.theta = 0.0; // Start angle at 0
    this.amplitude = 200.0; // Height of wave
    this.period = 300.0; // How many pixels before the wave repeats
    this.dx; // Value for incrementing x
    this.yvalues; // Using an array to store height values for the wave

    this.amplitudeSlider;
    this.xspacingSlider;
    this.ellipseSizeSlider;
  }

  setup() {
    this.canvas = createCanvas(400, 400);
    this.w = width + 16;
    this.dx = (TWO_PI / this.period) * this.xspacing;
    this.yvalues = new Array(floor(this.w / this.xspacing));

    // Create sliders for adjusting amplitude, xspacing, and ellipse size
    this.amplitudeSlider = createSlider(0, 200, 100);
    this.amplitudeSlider.position(10, height + 10);
    this.amplitudeSlider.style('width', '380px');

    this.xspacingSlider = createSlider(5, 50, 30);
    this.xspacingSlider.position(10, height + 30);
    this.xspacingSlider.style('width', '380px');

    this.ellipseSizeSlider = createSlider(5, 50, 16);
    this.ellipseSizeSlider.position(10, height + 50);
    this.ellipseSizeSlider.style('width', '380px');
  }

  draw() {
    background(0);

    // Update amplitude, xspacing, and ellipse size based on slider values
    this.amplitude = this.amplitudeSlider.value();
    this.xspacing = this.xspacingSlider.value();

    // Recalculate parameters
    this.dx = (TWO_PI / this.period) * this.xspacing;
    this.yvalues = new Array(floor(this.w / this.xspacing));

    this.calcWave();
    this.renderWave();
  }

  calcWave() {
    // Increment theta (try different values for
    // 'angular velocity' here)
    this.theta += 0.02;

    // For every x value, calculate a y value with sine function
    let x = this.theta;
    for (let i = 0; i < this.yvalues.length; i++) {
      this.yvalues[i] = sin(x) * this.amplitude;
      x += this.dx;
    }
  }

  renderWave() {
    noStroke();
    fill(255);
    // A simple way to draw the wave with an ellipse at each location
    for (let x = 0; x < this.yvalues.length; x++) {
      ellipse(x * this.xspacing, height / 2 + this.yvalues[x], this.ellipseSizeSlider.value(), this.ellipseSizeSlider.value());
    }
  }
}

// Create an instance of the WaveSketch class
let waveSketch = new WaveSketch();

// Use the p5 constructor to run the sketch
new p5(waveSketch.setup.bind(waveSketch), 'container');
