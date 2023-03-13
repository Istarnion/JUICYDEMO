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

        this.cooldown = PLAYER_SHOOT_COOLDOWN;
    }

    const collision = move(this.x, this.y, PLAYER_RADIUS, this.dx, this.dy);
    this.x = collision.x;
    this.y = collision.y;

    const forwardX = Math.cos(this.direction);
    const forwardY = Math.sin(this.direction);
    this.orbs[0] = this.x + -forwardY * ORB_SPACING;
    this.orbs[1] = this.y + forwardX * ORB_SPACING;
    this.orbs[2] = this.x + forwardY * ORB_SPACING;
    this.orbs[3] = this.y + -forwardX * ORB_SPACING;

    if(this.cooldown > 0) {
        this.cooldown -= dt;
    }
}

Player.prototype.hit = function() {
    this.health -= ENEMY_BULLET_DAMAGE;
    if(HIT_PARTICLES) {
        particleBurst(5, this.x, this.y, ENEMY_RADIUS, 0, Math.TAU, 100, COLOR_PLAYER_BLOOD);
    }

    trauma += 0.5;
    this.lastHitTime = performance.now();

    if(this.health <= 0) {
        if(DEATH_ANIMS) {
            effects.push(new DeathEffect(this.x, this.y));
        }

        playSfx(PLAYER_DEATH_SFX);
        this.deathTimestamp = performance.now();
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

