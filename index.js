const addEventListeners = (callbacks) => {
  const events = [
    { type: 'mouseup', handler: callbacks.onMouseUp },
    { type: 'mousedown', handler: callbacks.onMouseDown },
    { type: 'mousemove', handler: callbacks.onMouseMove },
    { type: 'touchstart', handler: callbacks.onTouchStart },
    { type: 'touchend', handler: callbacks.onTouchEnd },
    { type: 'touchmove', handler: callbacks.onTouchMove },
    { type: 'keyup', handler: callbacks.onKeyUp },
  ];

  events.forEach(event => document.addEventListener(event.type, event.handler, false));
};

const constructBuffer = (size) => new Array(size).fill(1);

const getWindowInnerWidth = () => window.innerWidth - 19;

const getWindowInnerHeight = () => window.innerHeight - 19;

const getWidth = () => Math.floor(reduce(getWindowInnerWidth()));

const getHeight = () => Math.floor(reduce(getWindowInnerHeight()));

const getBufferSize = () => getWidth() * getHeight();

const reduce = (value) => value / 2;

const getNormalizedCode = (code) => (code + 1) % 255;

document.oncontextmenu = () => false;

const initializeSpirals = () => {
  const width = getWidth();
  const height = getHeight();
  const initialBuffer = constructBuffer(getBufferSize());
  const finalBuffer = constructBuffer(getBufferSize());

  const canvas = document.getElementById('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = `${getWindowInnerWidth()}px`;
  canvas.style.height = `${getWindowInnerHeight()}px`;

  const context = canvas.getContext('2d');
  context.fillStyle = 'white';
  context.fillRect(0, 0, getWindowInnerWidth(), getWindowInnerHeight());

  return { width, height, context, initialBuffer, finalBuffer };
};

const loadSpirals = (layerX, layerY, initialBuffer, width) => {
  initialBuffer[Math.floor(layerX) + Math.floor(layerY) * width] = 255;
  return initialBuffer;
};

const drawSpirals = (state) => {
  const { context, width, height, configuration, mouseClicked, initialBuffer, finalBuffer } = state;

  if (mouseClicked) {
    state.initialBuffer = loadSpirals(configuration.layerX, configuration.layerY, initialBuffer, width);
  }

  const pixelData = context.getImageData(0, 0, width, height);

  for (let i = width; i < width * height - 1; i++) {
    const code = ((initialBuffer[i - 1] + initialBuffer[i + 1] + initialBuffer[i - width] + initialBuffer[i + width]) >> 1) - finalBuffer[i];
    finalBuffer[i] = code - (code >> 8);
    pixelData.data[i * 4] = 255 - getNormalizedCode(finalBuffer[i]);
  }

  state.initialBuffer = finalBuffer;
  state.finalBuffer = initialBuffer;

  context.putImageData(pixelData, 0, 0);
  return state;
};

const onKeyUp = (state) => {
  state.initialBuffer = loadSpirals(Math.random() * state.width, Math.random() * state.height, state.initialBuffer, state.width);
  return state;
};

const onMouseUp = (state) => {
  state.mouseClicked = false;
  return state;
};

const onMouseDown = (mouseEvent, state) => {
  state.mouseClicked = true;
  state.configuration = {
    layerX: reduce(mouseEvent.layerX),
    layerY: reduce(mouseEvent.layerY),
  };
  return state;
};

const onMouseMove = (mouseEvent, state) => {
  if (state.mouseClicked) {
    state.configuration = {
      layerX: reduce(mouseEvent.layerX),
      layerY: reduce(mouseEvent.layerY),
    };
  }
  return state;
};

const onTouchEnd = (state) => {
  state.mouseClicked = false;
  return state;
};

const onTouchStart = (touchEvent, state) => {
  state.mouseClicked = true;
  state.configuration = {
    layerX: reduce(touchEvent.touches[0].clientX),
    layerY: reduce(touchEvent.touches[0].clientY),
  };
  return state;
};

const onTouchMove = (touchEvent, state) => {
  if (state.mouseClicked) {
    state.configuration = {
      layerX: reduce(touchEvent.touches[0].clientX),
      layerY: reduce(touchEvent.touches[0].clientY),
    };
  }
  return state;
};

let state = initializeSpirals();

addEventListeners({
  onMouseUp: () => state = onMouseUp(state),
  onMouseDown: (e) => state = onMouseDown(e, state),
  onMouseMove: (e) => state = onMouseMove(e, state),
  onTouchStart: (e) => state = onTouchStart(e, state),
  onTouchEnd: () => state = onTouchEnd(state),
  onTouchMove: (e) => state = onTouchMove(e, state),
  onKeyUp: () => state = onKeyUp(state)
});

setInterval(() => state = drawSpirals(state), 30);
