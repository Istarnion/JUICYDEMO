/***************************************************/
/*                                                 */
/*    File: game.js                                */
/* Created: 2023-03-05                             */
/*  Author: Istarnion                              */
/*                                                 */
/***************************************************/

function gameInit() {
    gfxInit(800, 600);

    gameUpdateAndRender();
}

function gameUpdateAndRender() {
    gfx.clear('black');
    window.requestAnimationFrame(gameUpdateAndRender);
}

gameInit();

