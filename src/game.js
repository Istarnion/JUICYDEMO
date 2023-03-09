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
    walls = [ // x, y, width, height
        [ 200, 150, 50, 100 ],
        [ 200, 150, 100, 50 ],
        [ 500, 150, 100, 50 ],
        [ 550, 150, 50, 100 ],
        [ 200, 400, 100, 50 ],
        [ 200, 350, 50, 100 ],
        [ 500, 400, 100, 50 ],
        [ 550, 350, 50, 100 ]
    ];
    score = 0;

    updateJuicyness();

    accumulatedTime = 0;
    lastFrameTimestamp = performance.now();
}

function gameUpdateAndRender() {
    const now = performance.now();
    const delta = now - lastFrameTimestamp;
    lastFrameTimestamp = now;
    accumulatedTime += delta;
    if(delta > 1000) {
        // This probably means we were paused in some way.
        // In any case, to avoid hanging by trying to do too
        // many update steps, we truncate accumulatedTime.
        accumulatedTime = DELTA_TIME_MILLIS;
    }

    if(keyJustPressed(KEY_RESET)) {
        resetGame();
    }
    else if(keyJustPressed(KEY_LESS_JUICE)) {
        lessJuice();
    }
    else if(keyJustPressed(KEY_MORE_JUICE)) {
        moreJuice();
    }
    else if(keyJustPressed(KEY_NO_JUICE)) {
        noJuice();
    }
    else if(keyJustPressed(KEY_ALL_JUICE)) {
        maxJuice();
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

    gfx.clear('black');

    gfx.fillStyle = "white";
    for(var i=0; i<walls.length; ++i) {
        const w = walls[i];
        gfx.fillRect(w[0], w[1], w[2], w[3]);
    }

    player.draw();

    for(var i=0; i<enemies.length; ++i) {
        enemies[i].draw();
    }

    for(var i=0; i<projectiles.length; ++i) {
        projectiles[i].draw();
    }

    if(VISUALIZE_HP) {
        gfx.fillStyle = "black";
        gfx.fillRect(WIDTH/2-75, HEIGHT-30, 150, 15);

        gfx.strokeStyle = "white";
        gfx.fillStyle = "white";
        gfx.strokeRect(WIDTH/2-75, HEIGHT-30, 150, 15);

        const hp = player.health / PLAYER_HEALTH;
        gfx.fillRect(WIDTH/2-73, HEIGHT-28, 146 * hp, 11);
    }

    gfx.fillStyle = "white";
    gfx.fillText("x "+score, 10, HEIGHT - 15);

    if(player.health <= 0) {
        const deathTime = (performance.now() - player.deathTimestamp) / 1000;
        const alpha = Math.max(0, deathTime - 1);
        gfx.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
        gfx.fillRect(0, 0, WIDTH, HEIGHT);

        if(deathTime > 3) {
            resetGame();
        }
    }

    endInputFrame();
    window.requestAnimationFrame(gameUpdateAndRender);
}

gameInit();

