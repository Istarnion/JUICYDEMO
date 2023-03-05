/***************************************************/
/*                                                 */
/*    File: graphics.js                            */
/* Created: 2023-03-05                             */
/*  Author: Istarnion                              */
/*                                                 */
/***************************************************/

const canvas = document.getElementById("game-canvas");
const gfx = canvas.getContext("2d");

const pixelRatio = !!window.devicePixelRatio ? window.devicePixelRatio : 1;

gfx.width = canvas.width;
gfx.height = canvas.height;

var gfxLastResize = 0;
function gfxResize() {
    const now = performance.now();
    if(now - gfxLastResize < 10) return;
    gfxLastResize = now;

    const w = window.innerWidth;
    const h = window.innerHeight;

    const wanteAspect = gfx.width / gfx.height;
    const currAspect = w / h;

    var scale = 1;

    if(currAspect >= wanteAspect) {
        scale = h / gfx.height;
    }
    else {
        scale = w / gfx.width;
    }

    canvas.width = (gfx.width * scale) * pixelRatio;
    canvas.height = (gfx.height * scale) * pixelRatio;
    canvas.style.width = (gfx.width * scale) + "px";
    canvas.style.height = (gfx.height * scale) + "px";

    gfx.restore();
    gfx.save();
    gfx.scale(scale * pixelRatio, scale * pixelRatio);
}

function gfxInit(width, height) {
    gfx.scale(pixelRatio, pixelRatio);
    gfx.save();

    gfx.width = width;
    gfx.height = height;
    gfxResize();

    window.addEventListener("resize", gfxResize);
}

// Clear the canvas
gfx.clear = function(color) {
    this.fillStyle = color;
    this.clearRect(0, 0, gfx.width, gfx.height);
    this.fillRect(0, 0, gfx.width, gfx.height);
}

gfx.drawLine = function(fromX, fromY, toX, toY) {
    this.beginPath();
    this.moveTo(fromX, fromY);
    this.lineTo(toX, toY);
    this.closePath();
    this.stroke();
};

gfx.circle = function(x, y, radius) {
    this.beginPath();
    this.arc(x, y, radius, 0, Math.TAU, false);
    this.stroke();
};

gfx.fillCircle = function(x, y, radius) {
    this.beginPath();
    this.arc(x, y, radius, 0, Math.TAU, false);
    this.fill();
};

