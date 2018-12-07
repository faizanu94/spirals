"use strict";
let width;
let height;
let context;
let configuration;
let mouseClicked;
let initialBuffer = [];
let finalBuffer = [];

window.onresize = function (e) {
	initializeSpirals();
};

function addEventListeners() {
	document.addEventListener("mouseup", onMouseUp, false);
	document.addEventListener("mousedown", onMouseDown, false);
	document.addEventListener("mousemove", onMouseMove, false);
	document.addEventListener("touchstart", onTouchStart, false);
	document.addEventListener("touchend", onTouchEnd, false);
	document.addEventListener("touchmove", onTouchMove, false);
	document.addEventListener("keyup", onKeyUp, false);
}

function constructBuffer(size) {
	let buffer = [];
	for (let i = 0; i < size; i++) {
		buffer[i] = 1;
	}
	return buffer;
}

function getWindowInnerWidth() {
	return window.innerWidth - 19;
}

function getWindowInnerHeight() {
	return window.innerHeight - 19;
}

function getWidth() {
	return Math.floor(reduce(getWindowInnerWidth()));
}

function getHeight() {
	return Math.floor(reduce(getWindowInnerHeight()));
}

function getBufferSize() {
	return getWidth() * getHeight();
}

function reduce(value) {
	return value / 2;
}

function getNormalizedCode(code) {
	return (code + 1) % 255;
}

document.oncontextmenu = function () {
	return false;
}
