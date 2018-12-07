function initializeSpirals() {
	console.log('initializeSpirals()');

	initialBuffer = constructBuffer(getBufferSize());
	finalBuffer = constructBuffer(getBufferSize());

	console.log('buffers initialized');

	width = getWidth();
	height = getHeight();

	console.log('width: ' + width + ', height: ' + height);
	console.log('width * height: ' + width * height);

	let canvas = document.getElementById("canvas");
	canvas.width = width;
	canvas.height = height;

	canvas.style.width = getWindowInnerWidth() + "px";
	canvas.style.height = getWindowInnerHeight() + "px";

	context = canvas.getContext("2d");
	context.fillStyle = "white";
	context.fillRect(0, 0, getWindowInnerWidth(), getWindowInnerHeight());
}

function loadSpirals(layerX, layerY) {
	console.log('layerX: ' + layerX + ', layerY: ' + layerY);
	console.log('initialBuffer[' + Math.floor(layerX) + Math.floor(layerY) * width + '] = 255');
	initialBuffer[Math.floor(layerX) + Math.floor(layerY) * width] = 255;
}

function drawSpirals() {
	if (mouseClicked)
		loadSpirals(configuration.layerX, configuration.layerY);

	let pixelData = context.getImageData(0, 0, width, height);

	for (let i = width; i < width * height - 1; i++) {
		let code = (initialBuffer[i - 1] + initialBuffer[i + 1] + initialBuffer[i - width] + initialBuffer[i + width] >> 1) - finalBuffer[i];
		finalBuffer[i] = code - (code >> 8);
		pixelData.data[i * 4] = 255 - getNormalizedCode(finalBuffer[i]);
	}

	let tempBuffer = initialBuffer;
	initialBuffer = finalBuffer;
	finalBuffer = tempBuffer;

	context.putImageData(pixelData, 0, 0);
}

function onKeyUp() {
	loadSpirals(Math.random() * width, Math.random() * height);
}

function onMouseUp() {
	mouseClicked = false;
}

function onMouseDown(mouseEvent) {
	mouseClicked = true;
	configuration = { "layerX": reduce(mouseEvent.layerX), "layerY": reduce(mouseEvent.layerY) };
}

function onMouseMove(mouseEvent) {
	if (mouseClicked)
		configuration = { "layerX": reduce(mouseEvent.layerX), "layerY": reduce(mouseEvent.layerY) };
}

initializeSpirals();
addEventListeners();
setInterval(drawSpirals, 30);