/***************************************************/
/*                                                 */
/*    File: game.js                                */
/* Created: 2023-03-05                             */
/*  Author: Istarnion                              */
/*                                                 */
/***************************************************/

function gameInit() {
    gfxInit(WIDTH, HEIGHT);

    resetGame();
    gameUpdateAndRender();
}

function resetGame() {
    player = new Player(WIDTH / 2, HEIGHT / 2);
    projectiles = [];
    enemies = [];

    accumulatedTime = 0;
    lastFrameTimestamp = performance.now();
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

    if(keys[KEY_RESET]) {
        resetGame();
    }

    while(accumulatedTime >= DELTA_TIME_MILLIS && player.health > 0) {
        player.update(DELTA_TIME_SECONDS);

        for(var i=0; i<enemies.length; ++i) {
            enemies[i].update(DELTA_TIME_SECONDS);
        }

        // Remove non-active enemies
        for(var i=enemies.length; i-->0;) {
            if(!enemies[i].active) {
                enemies.splice(i, 1);
            }
        }

        for(var i=0; i<projectiles.length; ++i) {
            projectiles[i].update(DELTA_TIME_SECONDS);
        }

        // Look for projectile collisions
        for(var i=0; i<projectiles.length; ++i) {
            const px = projectiles[i].x;
            const py = projectiles[i].y;
            const pr = projectiles[i].radius;

            if(projectiles[i].mask === PROJECTILE_MASK_PLAYER) {
                for(var j=0; j<enemies.length; ++j) {
                    const dx = px - enemies[j].x;
                    const dy = py - enemies[j].y;
                    const r = ENEMY_RADIUS + pr;

                    if(dx*dx + dy*dy < r*r) {
                        enemies[j].hit();
                        projectiles[i].active = false;
                        break;
                    }
                }
            }
            else {
                const dx = px - player.x;
                const dy = py - player.y;
                const r = PLAYER_RADIUS + pr;

                if(dx*dx + dy*dy < r*r) {
                    player.hit();
                    projectiles[i].active = false;
                }
            }
        }

        // Remove non-active projectiles
        for(var i=projectiles.length; i-->0;) {
            if(!projectiles[i].active) {
                projectiles.splice(i, 1);
            }
        }

        enemySpawnUpdate(DELTA_TIME_SECONDS);

        accumulatedTime -= DELTA_TIME_MILLIS;
    }

    player.draw();

    for(var i=0; i<enemies.length; ++i) {
        enemies[i].draw();
    }

    for(var i=0; i<projectiles.length; ++i) {
        projectiles[i].draw();
    }

    if(player.health <= 0 && (performance.now() - player.deathTimestamp) / 1000 > 2) {
        resetGame();
    }

    window.requestAnimationFrame(gameUpdateAndRender);
}

gameInit();

