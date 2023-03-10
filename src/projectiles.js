/***************************************************/
/*                                                 */
/*    File: projectiles.js                         */
/* Created: 2023-03-05                             */
/*  Author: Istarnion                              */
/*                                                 */
/***************************************************/

const PROJECTILE_MASK_PLAYER = 1;
const PROJECTILE_MASK_ENEMY = 2;

function Projectile(x, y, dir, speed, radius, mask) {
    this.x = x;
    this.y = y;
    this.dx = Math.cos(dir) * speed;
    this.dy = Math.sin(dir) * speed;
    this.radius = radius;
    this.mask = mask;
    this.active = true;
    this.spawnTime = performance.now();
    this.lastTrailParticle = 0;

    projectiles.push(this);
}

Projectile.prototype.update = function(dt) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;


    if(collidesAt(this.x, this.y, this.radius)) {
        if(HIT_PARTICLES) {
            particleBurst(3, this.x, this.y, 1, 0, Math.TAU, 100, COLOR_PROJECTILE_WALL_SPARKS);
        }

        trauma += 0.05;
        playSfx(PROJECTILE_HIT_WALL_SFX);
        this.active = false;
    }

    if(this.x < -this.radius || this.x > WIDTH + this.radius ||
       this.y < -this.radius || this.y > HEIGHT + this.radius) {
        this.active = false;
    }
}

Projectile.prototype.draw = function() {
    const now = performance.now();

    if(this.mask === PROJECTILE_MASK_PLAYER) {
        var color = COLOR_PROJECTILE_PLAYER;
    }
    else {
        var color = COLOR_PROJECTILE_ENEMY;
    }

    if(BULLET_ANIMS) {
        if(now - this.spawnTime < MUZZLE_FLASH_TIME) {
            gfx.fillStyle = COLOR_PROJECTILE_FLASH;
            gfx.fillCircle(this.x, this.y, this.radius * 2);
        }
        else {
            gfx.fillStyle = color;
            const dir = Math.atan2(this.dy, this.dx);
            gfx.beginPath();
            gfx.ellipse(this.x, this.y, this.radius*2.5, this.radius, dir, 0, Math.TAU);
            gfx.fill();
        }
    }
    else {
        gfx.fillStyle = color;
        gfx.fillCircle(this.x, this.y, this.radius);
    }

    if(EXTRA_PARTICLES) {
        if(now - this.lastTrailParticle >= PROJECTILE_TRAIL_COOLDOWN) {
            const dir = Math.atan2(this.dy, this.dx) + Math.PI;
            particleBurst(1, this.x, this.y, this.radius, 0, Math.TAU, 10, color);
            this.lastTrailParticle = now +
                randomRange(PROJECTILE_TRAIL_COOLDOWN/-2, PROJECTILE_TRAIL_COOLDOWN/2);
        }
    }
}

Projectile.prototype.drawShadow = function() {
    gfx.fillStyle = "rgba(255, 255, 255, 0.2)"
    if(BULLET_ANIMS) {
        if(performance.now() - this.spawnTime < MUZZLE_FLASH_TIME) {
            gfx.fillCircle(this.x, this.y, this.radius * 2 + SHADOW);
        }
        else {
            const dir = Math.atan2(this.dy, this.dx);
            gfx.beginPath();
            gfx.ellipse(this.x, this.y+SHADOW, this.radius*2.5, this.radius, dir, 0, Math.TAU);
            gfx.fill();
        }
    }
    else {
        gfx.fillCircle(this.x, this.y+SHADOW, this.radius);
    }
}
