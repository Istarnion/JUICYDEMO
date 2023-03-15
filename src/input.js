/***************************************************/
/*                                                 */
/*    File: input.js                               */
/* Created: 2023-03-05                             */
/*  Author: Istarnion                              */
/*                                                 */
/***************************************************/

var mouseX = WIDTH / 2;
var mouseY = HEIGHT / 2;
var mouseDown = false;

const KEY_UP = 0;
const KEY_RIGHT = 1;
const KEY_DOWN = 2;
const KEY_LEFT = 3;
const KEY_RESET = 4;
const KEY_MORE_JUICE = 5;
const KEY_LESS_JUICE = 6;
const KEY_NO_JUICE = 7;
const KEY_ALL_JUICE = 8;
const KEY_PAUSE = 9;
const KEY_FULLSCREEN = 10;

const keys = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
];

const prev_keys = [];
for(var i=0; i<keys.length; ++i) prev_keys.push(false);

function endInputFrame() {
    for(var i=0; i<keys.length; ++i) {
        prev_keys[i] = keys[i];
    }
}

function keyJustPressed(key) {
    return keys[key] && !prev_keys[key];
}

function keyCodeToKey(code) {
    if(code === 87 || code === 38) { // W / UP
        return KEY_UP;
    }
    else if(code === 68 || code === 39) { // D / RIGHT
        return KEY_RIGHT;
    }
    else if(code === 83 || code === 40) { // S / DOWN
        return KEY_DOWN;
    }
    else if(code === 65 || code === 37) { // A / LEFT
        return KEY_LEFT;
    }
    else if(code === 82) { // R
        return KEY_RESET;
    }
    else if(code === 77) { // M
        return KEY_MORE_JUICE;
    }
    else if(code === 76) { // L
        return KEY_LESS_JUICE;
    }
    else if(code === 48) { // 0
        return KEY_NO_JUICE;
    }
    else if(code === 74) { // J
        return KEY_ALL_JUICE;
    }
    else if(code === 80) { // P
        return KEY_PAUSE;
    }
    else if(code === 70) { // P
        return KEY_FULLSCREEN;
    }
    else return -1;
}

window.addEventListener("keydown", function(e) {
    e.preventDefault();
    const key = keyCodeToKey(e.keyCode);
    if(key >= 0) {
        keys[key] = true;
    }
    return false;
});

window.addEventListener("keyup", function(e) {
    e.preventDefault();
    const key = keyCodeToKey(e.keyCode);
    if(key >= 0) {
        keys[key] = false;
    }

    return false;
});

canvas.addEventListener("mousemove", function(e) {
    e.preventDefault();
    const scale = gfx.width / canvas.clientWidth;
    const clientRect = canvas.getClientRects()[0];
    mouseX = (e.clientX - clientRect.x) * scale;
    mouseY = (e.clientY - clientRect.y) * scale;
    return false;
});

canvas.addEventListener("mousedown", function(e) {
    e.preventDefault();
    mouseDown = true;
    return false;
});

window.addEventListener("mouseup", function(e) {
    e.preventDefault();
    mouseDown = false;
    return false;
});

