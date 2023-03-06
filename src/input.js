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

const keys = [
    false,
    false,
    false,
    false,
    false
];

function keyCodeToKey(code) {
    if(code === 87 || code === 38) {
        return KEY_UP;
    }
    else if(code === 68 || code === 39) {
        return KEY_RIGHT;
    }
    else if(code === 83 || code === 40) {
        return KEY_DOWN;
    }
    else if(code === 65 || code === 37) {
        return KEY_LEFT;
    }
    else if(code === 82) {
        return KEY_RESET;
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

