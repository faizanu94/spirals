# Spirals

Spirals simulation using pure JavaScript and HTML5 Canvas

## [Live Demo](https://faizanu94.github.io/spirals/)

## Usage

1. Clone the repo:

   ```
   git clone https://github.com/faizanu94/spirals.git
   ```
2. Open `index.html` in your browser

## How It Works

The simulation creates and evolves spiral patterns based on user interactions using a simple convolution algorithm. Here's a brief overview of the algorithm:

* Initialization: Sets up the canvas and buffer arrays
* Interaction: Listens for mouse and touch events to modify the initial buffer
* Drawing: Continuously updates the canvas by averaging the values of neighboring pixels to create the spiral effect
