/***************************************************/
/*                                                 */
/*    File: game.js                                */
/* Created: 2023-03-05                             */
/*  Author: Istarnion                              */
/*                                                 */
/***************************************************/

function gameInit() {
    gfxInit(WIDTH, HEIGHT);

    bgm = new Howl({
        src: [
            "res/DOOM/Doom(mp3^320).mp3",
            "res/DOOM/Doom(wave).wav"
        ],
        loop: true
    });

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

    effects = [];
    trauma = 0;
    score = 0;
    scoreAnim = 1;
    healthAnim = 0;
    lastDeath = 0;

    if(MUSIC) {
        bgm.volume(MUSIC_VOLUME);
        bgm.play();
    }

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
        trauma -= TRAUMA_RESTORE_SPEED * DELTA_TIME_SECONDS;
        if(trauma < 0) {
            trauma = 0;
        }

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
        particlesUpdate(DELTA_TIME_SECONDS);

        accumulatedTime -= DELTA_TIME_MILLIS;
    }

    if(CRAZY) {
        if(performance.now() - lastDeath < 33) {
            gfx.clear("white");
        }
        else {
            gfx.clear(COLOR_BACKGROUND);
        }
    }
    else {
        gfx.clear(COLOR_BACKGROUND);
    }


    if(SCREENSHAKE) {
        gfx.save();
        const offset = randomInsideUnitCircle();
        const hardness = trauma * SCREENSHAKE_HARDNESS;
        gfx.translate(offset[0] * hardness, offset[1] * hardness);
    }

    if(SHADOWS) {
        player.drawShadow();

        for(var i=0; i<enemies.length; ++i) {
            enemies[i].drawShadow();
        }

        gfx.fillStyle = "rgba(0, 0, 0, 0.2)";
        for(var i=0; i<walls.length; ++i) {
            const w = walls[i];
            gfx.fillRect(w[0], w[1]+SHADOW, w[2], w[3]);
        }
    }

    gfx.fillStyle = COLOR_WALLS;
    for(var i=0; i<walls.length; ++i) {
        const w = walls[i];
        gfx.fillRect(w[0], w[1], w[2], w[3]);
    }

    particlesDraw();

    player.draw();

    for(var i=0; i<enemies.length; ++i) {
        enemies[i].draw();
    }

    for(var i=0; i<projectiles.length; ++i) {
        projectiles[i].draw();
    }

    if(VISUALIZE_HP) {

        gfx.fillStyle = COLOR_HP_BACKGROUND;
        gfx.fillRect(WIDTH/2-75, HEIGHT-30, 150, 15);

        gfx.strokeStyle = COLOR_HP_BORDER;
        gfx.strokeRect(WIDTH/2-75, HEIGHT-30, 150, 15);

        if(TWEENING) {
            const color = colorLerpToWhite(COLOR_HP_FILL, healthAnim);
            gfx.fillStyle = color;
        }
        else {
            gfx.fillStyle = COLOR_HP_FILL;
        }

        const hp = player.health / PLAYER_HEALTH;
        gfx.fillRect(WIDTH/2-73, HEIGHT-28, 146 * hp, 11);

        healthAnim -= (delta / 1000) * 2;
        if(healthAnim < 0) healthAnim = 0;
    }

    if(TWEENING) {
        const color = colorLerpToWhite(COLOR_SCORE, 1-scoreAnim);
        gfx.fillStyle = color;

        const size = (lerp(72, 12, tween(scoreAnim))) | 0;
        gfx.font = size + "px monospace";

        scoreAnim += (delta / 1000) * 2;
        if(scoreAnim > 1) scoreAnim = 1;
    }
    else {
        gfx.fillStyle = COLOR_SCORE;
        gfx.font = "12px monospace";
    }

    gfx.fillText("x "+score, 10, HEIGHT - 15);

    for(var i=effects.length; i-->0;) {
        effects[i].draw();
        if(effects[i].done) {
            effects.splice(i, 1);
        }
    }

    if(player.health <= 0) {
        const deathTime = (performance.now() - player.deathTimestamp) / 1000;
        const alpha = Math.max(0, deathTime - 1);
        gfx.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
        gfx.fillRect(0, 0, WIDTH, HEIGHT);

        if(deathTime > 3) {
            resetGame();
        }
    }

    if(SCREENSHAKE) {
        gfx.restore();
    }

    endInputFrame();
    window.requestAnimationFrame(gameUpdateAndRender);
}

function scorePoint() {
    score++;
    scoreAnim = 0;
}

gameInit();

