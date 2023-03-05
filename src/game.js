/***************************************************/
/*                                                 */
/*    File: game.js                                */
/* Created: 2023-03-05                             */
/*  Author: Istarnion                              */
/*                                                 */
/***************************************************/

function gameInit() {
    gfxInit(WIDTH, HEIGHT);

    player = new Player(WIDTH / 2, HEIGHT / 2);
    projectiles = [];

    accumulatedTime = 0;
    lastFrameTimestamp = performance.now();
    gameUpdateAndRender();
}

function gameUpdateAndRender() {
    gfx.clear('black');

    const now = performance.now();
    const delta = now - lastFrameTimestamp;
    accumulatedTime += delta;
    if(accumulatedTime > 3 * DELTA_TIME_MILLIS) {
        // This probably means we were paused in some way.
        // In any case, to avoid hanging by trying to do too
        // many update steps, we truncate accumulatedTime.
        accumulatedTime = DELTA_TIME_MILLIS;
    }

    while(accumulatedTime >= DELTA_TIME_MILLIS) {
        player.update(DELTA_TIME_SECONDS);

        for(var i=0; i<projectiles.length; ++i) {
            projectiles[i].update(DELTA_TIME_SECONDS);
        }

        // Remove non-active projectiles
        for(var i=projectiles.length; i-->0;) {
            if(!projectiles[i].active) {
                projectiles.splice(i, 1);
            }
        }

        accumulatedTime -= DELTA_TIME_MILLIS;
    }

    player.draw();

    for(var i=0; i<projectiles.length; ++i) {
        projectiles[i].draw();
    }

    window.requestAnimationFrame(gameUpdateAndRender);
}

gameInit();

