/***************************************************/
/*                                                 */
/*    File: physics.js                             */
/* Created: 2023-03-07                             */
/*  Author: Istarnion                              */
/*                                                 */
/***************************************************/

function circleVsRect(cx, cy, r, x, y, w, h) {
    var px = cx;
    var py = cy;
    if(px < x) px = x;
    else if(px >= x+w) px = x+w-1;
    if(py < y) py = y;
    else if(py >= y+h) py = y+h-1;

    return distSqr(px, py, cx, cy) <= r*r;
}

function lineVsLine(x1, y1, x2, y2, x3, y3, x4, y4) {
    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if(denominator === 0) return false;

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    if(t < 0 || t >= 1) return false;

    const u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / denominator;
    if(u < 0 || u >= 1) return false;

    return true;
}

function lineIntersectsWalls(x1, y1, x2, y2) {
    for(var i=0; i<walls.length; ++i) {
        const w = walls[i];
        if(lineVsLine(x1, y1, x2, y2, w[0], w[1], w[0]+w[2], w[1]) ||
           lineVsLine(x1, y1, x2, y2, w[0], w[1], w[0], w[1]+w[3]) ||
           lineVsLine(x1, y1, x2, y2, w[0], w[1]+w[3], w[0]+w[2], w[1]+w[3]) ||
           lineVsLine(x1, y1, x2, y2, w[0]+w[2], w[1], w[0]+w[2], w[1]+w[3])) {
            return true;
        }
    }

    return false;
}

/* Checks if a circle x, y, r would overlap any walls */
function collidesAt(x, y, r) {
    for(var i=0; i<walls.length; ++i) {
        const w = walls[i];
        if(circleVsRect(x, y, r, w[0], w[1], w[2], w[3])) {
            return true;
        }
    }

    return false;
}

function move(x, y, r, dx, dy) {
    const px = x + dx * DELTA_TIME_SECONDS;
    const py = y + dy * DELTA_TIME_SECONDS;

    for(var i=0; i<walls.length; ++i) {
        const w = walls[i];
        if(circleVsRect(px, py, r, w[0], w[1], w[2], w[3])) {
            return { x: x, y: y, collide: true };
        }
    }

    return { x: px, y: py, collide: false };
}

