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
