/***************************************************/
/*                                                 */
/*    File: utils.js                               */
/* Created: 2023-03-05                             */
/*  Author: Istarnion                              */
/*                                                 */
/***************************************************/

function len(x, y) {
    return Math.sqrt(x*x + y*y);
}

function lenSqr(x, y) {
    return x*x + y*y;
}

function dist(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx*dx + dy*dy);
}

function distSqr(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return dx*dx + dy*dy;
}

function dot(x1, y1, x2, y2) {
    return x1*x2 + y1*y2;
}

function randomRange(min, max) {
    return min + Math.random() * (max - min);
}

function randomInsideUnitCircle() {
    const theta = randomRange(0, Math.TAU);
    const r = Math.random();
    return [
        Math.cos(theta) * r,
        Math.sin(theta) * r,
    ];
}


function lerp(a, b, t) {
    return a*(1-t) + b*t;
}

/* expects col in the format "#RRGGBB" */
function colorLerpToWhite(col, t) {
    const invT = 1 - t;
    const r = (parseInt(col.substring(1, 3), 16) * invT + 255*t) & 0xFF;
    const g = (parseInt(col.substring(3, 5), 16) * invT + 255*t) & 0xFF;
    const b = (parseInt(col.substring(5, 7), 16) * invT + 255*t) & 0xFF;

    return "#" + r.toString(16) + g.toString(16) + b.toString(16);
}

/* Nice simple s-curve */
function tween(t) {
    return 3*t*t - 2*t*t*t;
}

