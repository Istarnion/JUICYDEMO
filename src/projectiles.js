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

    projectiles.push(this);
}

Projectile.prototype.update = function(dt) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;

    if(collidesAt(this.x, this.y, this.radius)) {
        if(HIT_PARTICLES) {
            particleBurst(3, this.x, this.y, 1, 0, Math.TAU, 100, "white");
        }

        playSfx(PROJECTILE_HIT_WALL_SFX);
        this.active = false;
    }
    if(this.x < -this.radius || this.x > WIDTH + this.radius ||
       this.y < -this.radius || this.y > HEIGHT + this.radius) {
        this.active = false;
    }
}

Projectile.prototype.draw = function() {
    if(BULLET_ANIMS) {
        gfx.fillStyle = "white";
        if(performance.now() - this.spawnTime < MUZZLE_FLASH_TIME) {
            gfx.fillCircle(this.x, this.y, this.radius * 2);
        }
        else {
            const dir = Math.atan2(this.dy, this.dx);
            gfx.beginPath();
            gfx.ellipse(this.x, this.y, this.radius*2.5, this.radius, dir, 0, Math.TAU);
            gfx.fill();
        }
    }
    else {
        gfx.fillStyle = "white";
        gfx.fillCircle(this.x, this.y, this.radius);
    }
}

