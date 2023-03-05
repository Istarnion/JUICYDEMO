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

    this.direction = 0;
    this.cooldown = 0;

    this.orbs = [ 0, 0, 0, 0 ];
}

function playerShoot(x, y, speed) {
    const direction = Math.atan2(mouseY - y, mouseX - x);
    new Projectile(x, y, direction, speed + PLAYER_BULLET_SPEED, 4, PROJECTILE_MASK_PLAYER);
}

Player.prototype.update = function(dt) {
    this.direction = Math.atan2(mouseY - this.y, mouseX - this.x);

    const speed = Math.sqrt(this.dx*this.dx + this.dy*this.dy);

    if(mouseDown && this.cooldown <= 0) {
        const orbCount = this.orbs.length / 2;
        for(var i=0; i<orbCount; ++i) {
            playerShoot(this.orbs[2*i], this.orbs[2*i+1], speed);
        }


        this.cooldown = PLAYER_SHOOT_COOLDOWN;
    }

    this.x += this.dx * dt;
    this.y += this.dy * dt;

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
}

Player.prototype.draw = function(dt) {
    gfx.fillStyle = 'white';
    gfx.fillCircle(this.x, this.y, PLAYER_RADIUS);

    const orbRadius = PLAYER_RADIUS * 0.3;
    const orbCount = this.orbs.length / 2;
    for(var i=0; i<orbCount; ++i) {
        gfx.fillCircle(this.orbs[2*i], this.orbs[2*i+1], orbRadius);
    }

    const forwardX = Math.cos(this.direction);
    const forwardY = Math.sin(this.direction);
    const eyeRadius = PLAYER_RADIUS * 0.25;
    gfx.fillStyle = 'black';
    gfx.fillCircle(this.x + forwardX * (PLAYER_RADIUS-eyeRadius),
                   this.y + forwardY * (PLAYER_RADIUS-eyeRadius),
                   eyeRadius);
}

