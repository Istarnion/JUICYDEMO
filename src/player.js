/***************************************************/
/*                                                 */
/*    File: player.js                              */
/* Created: 2023-03-05                             */
/*  Author: Istarnion                              */
/*                                                 */
/***************************************************/

function Player(x, y) {
    this.x = x;
    this.y = y;

    this.dx = 0;
    this.dy = 0;

    this.health = PLAYER_HEALTH;
    this.deathTimestamp = 0;
    this.direction = 0;
    this.cooldown = 0;
    this.lastHitTime = 0;
    this.lastTrailParticle = 0;
    this.recoil = 0;

    this.orbs = [ 0, 0, 0, 0 ];
}

function playerShoot(x, y, speed) {
    const direction = Math.atan2(mouseY - y, mouseX - x) + randomRange(-BULLET_SPREAD, BULLET_SPREAD);
    new Projectile(x, y, direction, speed + PLAYER_BULLET_SPEED, 4, PROJECTILE_MASK_PLAYER);
}

Player.prototype.update = function(dt) {
    this.direction = Math.atan2(mouseY - this.y, mouseX - this.x);

    this.dx = keys[KEY_RIGHT] - keys[KEY_LEFT];
    this.dy = keys[KEY_DOWN] - keys[KEY_UP];

    if(lenSqr(this.dx, this.dy) > 1) {
        this.dx /= 1.41421;
        this.dy /= 1.41421;
    }

    this.dx *= PLAYER_SPEED;
    this.dy *= PLAYER_SPEED;

    const speed = len(this.dx, this.dy);

    if(mouseDown && this.cooldown <= 0) {
        if(PLAYER_COOL_GUN) {
            const orbCount = this.orbs.length / 2;
            for(var i=0; i<orbCount; ++i) {
                playerShoot(this.orbs[2*i], this.orbs[2*i+1], speed);
            }
        }
        else {
            playerShoot(this.x, this.y, speed);
        }

        // Call here to only play once no matter how many projectiles we fire
        playSfx(PLAYER_SHOOT_SFX);
        trauma += 0.075;
        this.recoil = 1;

        this.cooldown = PLAYER_SHOOT_COOLDOWN;
    }

    const collision = move(this.x, this.y, PLAYER_RADIUS, this.dx, this.dy);
    this.x = collision.x;
    this.y = collision.y;

    // Constrain player to game bounds
    if(this.x < 0) this.x = 0;
    if(this.x >= WIDTH) this.x = WIDTH-1;
    if(this.y < 0) this.y = 0;
    if(this.y >= HEIGHT) this.y = HEIGHT-1;

    const forwardX = Math.cos(this.direction);
    const forwardY = Math.sin(this.direction);
    this.orbs[0] = this.x + -forwardY * ORB_SPACING;
    this.orbs[1] = this.y + forwardX * ORB_SPACING;
    this.orbs[2] = this.x + forwardY * ORB_SPACING;
    this.orbs[3] = this.y + -forwardX * ORB_SPACING;
    const orbCount = this.orbs.length / 2;

    // Recoil
    if(RECOIL) {
        for(var i=0; i<orbCount; ++i) {
            const r = lerp(0, 15, tween(this.recoil));
            this.orbs[2*i+0] -= forwardX * r;
            this.orbs[2*i+1] -= forwardY * r;
        }

        this.recoil -= dt * 5;
        if(this.recoil < 0) this.recoil = 0;
    }

    if(this.cooldown > 0) {
        this.cooldown -= dt;
    }

    if(EXTRA_PARTICLES) {
        const now = performance.now();
        if(speed > 0 && now - this.lastTrailParticle >= WALK_TRAIL_COOLDOWN) {
            particleBurst(1, this.x, this.y, PLAYER_RADIUS,
                          -this.direction, -this.direction, 10, COLOR_PLAYER);

            if(PLAYER_COOL_GUN) {
                const orbRadius = PLAYER_RADIUS * 0.3;
                for(var i=0; i<orbCount; ++i) {
                    particleBurst(1, this.orbs[2*i], this.orbs[2*i+1], orbRadius,
                                  -this.direction, -this.direction, 10, COLOR_PLAYER);
                }
            }

            this.lastTrailParticle = now +
                randomRange(WALK_TRAIL_COOLDOWN/-2, WALK_TRAIL_COOLDOWN/2);
        }
    }
}

Player.prototype.hit = function() {
    this.health -= ENEMY_BULLET_DAMAGE;
    if(HIT_PARTICLES) {
        particleBurst(5, this.x, this.y, ENEMY_RADIUS, 0, Math.TAU, 100, COLOR_PLAYER_BLOOD);
    }

    trauma += 0.5;
    this.lastHitTime = performance.now();
    healthAnim = 1;

    if(this.health <= 0) {
        if(DEATH_ANIMS) {
            effects.push(new DeathEffect(this.x, this.y));
        }

        if(EXTRA_PARTICLES) {
            particleBurst(100, this.x, this.y, PLAYER_RADIUS, 0, Math.TAU, 100, COLOR_PLAYER_BLOOD);
        }

        playSfx(PLAYER_DEATH_SFX);
        this.deathTimestamp = performance.now();
        lastDeath = performance.now();

        // NOTE: Move this!
        // Having this here is ugly, but it is the only place we have
        // code run just as the player dies, and I couldn't be bothered
        // to set something up elsewhere.
        if(MUSIC) {
            bgm.fade(MUSIC_VOLUME, 0, 1.5);
        }
    }
}

Player.prototype.draw = function(dt) {
    if(performance.now() - this.lastHitTime > 33)
    {
        gfx.fillStyle = COLOR_PLAYER;
    }
    else
    {
        gfx.fillStyle = "white";
    }

    gfx.fillCircle(this.x, this.y, PLAYER_RADIUS);

    if(PLAYER_COOL_GUN) {
        gfx.fillStyle = COLOR_PLAYER_ORB;
        const orbRadius = PLAYER_RADIUS * 0.3;
        const orbCount = this.orbs.length / 2;
        for(var i=0; i<orbCount; ++i) {
            gfx.fillCircle(this.orbs[2*i], this.orbs[2*i+1], orbRadius);
        }
    }

    const forwardX = Math.cos(this.direction);
    const forwardY = Math.sin(this.direction);
    const eyeRadius = PLAYER_RADIUS * 0.25;
    gfx.fillStyle = COLOR_PLAYER_EYE;
    gfx.fillCircle(this.x + forwardX * (PLAYER_RADIUS-eyeRadius),
                   this.y + forwardY * (PLAYER_RADIUS-eyeRadius),
                   eyeRadius);
}

Player.prototype.drawShadow = function() {
    gfx.fillStyle = "rgba(0, 0, 0, 0.2)";
    gfx.fillCircle(this.x, this.y+SHADOW, PLAYER_RADIUS);

    if(PLAYER_COOL_GUN) {
        const orbRadius = PLAYER_RADIUS * 0.3;
        const orbCount = this.orbs.length / 2;
        for(var i=0; i<orbCount; ++i) {
            gfx.fillCircle(this.orbs[2*i], this.orbs[2*i+1]+SHADOW, orbRadius);
        }
    }
}

