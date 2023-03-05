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

gfx.drawLine = (fromX, fromY, toX, toY) => {
    this.gfx.beginPath();
    this.gfx.moveTo(fromX, fromY);
    this.gfx.lineTo(toX, toY);
    this.gfx.closePath();
    this.gfx.stroke();
}

// Clear the canvas
gfx.clear = (color) => {
    gfx.fillStyle = color;
    gfx.clearRect(0, 0, gfx.width, gfx.height);
    gfx.fillRect(0, 0, gfx.width, gfx.height);
};

