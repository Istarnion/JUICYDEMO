/***************************************************/
/*                                                 */
/*    File: enemy.js                               */
/* Created: 2023-03-05                             */
/*  Author: Istarnion                              */
/*                                                 */
/***************************************************/

const ENEMY_STATE_WALK = 0;
const ENEMY_STATE_LOOK = 1;
const ENEMY_STATE_ATTACK = 2;

function Enemy(x, y, dstX, dstY) {
    this.x = x;
    this.y = y;
    this.dstX = dstX;
    this.dstY = dstY;

    this.dx = 0;
    this.dy = 0;
    this.direction = Math.atan2(dstY - y, dstX - x);

    this.stateStartTime = performance.now();
    this.state = ENEMY_STATE_WALK;

    this.active = true;
}

Enemy.prototype.update = function(dt) {
    const toDstX = this.dstX - this.x;
    const toDstY = this.dstY - this.y;
    const toGo = Math.sqrt(toDstX*toDstX + toDstY*toDstY);
    if(toGo < ENEMY_RADIUS) {
        this.active = false;
        return;
    }

    switch(this.state) {
        case ENEMY_STATE_WALK:
            this.dx = toDstX / toGo * ENEMY_SPEED;
            this.dy = toDstY / toGo * ENEMY_SPEED;
            this.direction = Math.atan2(this.dy, this.dx);
            break;
        case ENEMY_STATE_LOOK:
            break;
        case ENEMY_STATE_ATTACK:
            break;
        default:
            console.err("Enemy in invalid state", this);
            break;
    }

    this.x += this.dx * dt;
    this.y += this.dy * dt;
}

Enemy.prototype.hit = function() {
    this.active = false;
}

Enemy.prototype.draw = function() {
    gfx.fillStyle = "white";
    gfx.fillCircle(this.x, this.y, ENEMY_RADIUS);

    const forwardX = Math.cos(this.direction);
    const forwardY = Math.sin(this.direction);
    const eyeRadius = ENEMY_RADIUS * 0.25;
    gfx.fillStyle = 'black';
    gfx.fillCircle(this.x + forwardX * (PLAYER_RADIUS-eyeRadius),
                   this.y + forwardY * (PLAYER_RADIUS-eyeRadius),
                   eyeRadius);
}

