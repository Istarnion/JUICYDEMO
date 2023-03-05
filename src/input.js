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

