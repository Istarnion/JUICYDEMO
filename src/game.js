/***************************************************/
/*                                                 */
/*    File: game.js                                */
/* Created: 2023-03-05                             */
/*  Author: Istarnion                              */
/*                                                 */
/***************************************************/

function gameInit() {
    gfxInit(WIDTH, HEIGHT);

    mouseX = WIDTH / 2;
    mouseY = HEIGHT / 2;

    player = new Player(WIDTH / 2, HEIGHT / 2);

    accumulatedTime = 0;
    lastFrameTimestamp = performance.now();
    gameUpdateAndRender();
}

function gameUpdateAndRender() {
    gfx.clear('black');
    const now = performance.now();
    const delta = now - lastFrameTimestamp;
    accumulatedTime += delta;

    while(accumulatedTime > DELTA_TIME_MILLIS) {
        player.update(DELTA_TIME_SECONDS);

        accumulatedTime -= DELTA_TIME_MILLIS;
    }

    player.draw();

    window.requestAnimationFrame(gameUpdateAndRender);
}

gameInit();

